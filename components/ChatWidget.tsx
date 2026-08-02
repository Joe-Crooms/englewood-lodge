'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import {
  type ChatMessage,
  type LeadData,
  extractLead,
  CHAT_MAX_MESSAGES,
  CHAT_MAX_MESSAGES_HARD,
  CHAT_MAX_MESSAGE_LENGTH,
  RATE_LIMIT_MESSAGE,
  ERROR_MESSAGE,
  REQUEST_TIMEOUT_MS,
} from '@/lib/chat'

const INACTIVITY_MS = 5 * 60 * 1000

function Bubble({ role, content }: ChatMessage) {
  const isUser = role === 'user'
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: 8 }}>
      <div style={{
        maxWidth: '84%',
        padding: '9px 13px',
        borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
        background: isUser ? '#c8a84b' : 'rgba(255,255,255,0.09)',
        color: isUser ? '#111b30' : 'rgba(255,255,255,0.9)',
        fontSize: 13,
        lineHeight: 1.65,
        whiteSpace: 'pre-wrap',
        fontFamily: 'Georgia, serif',
      }}>
        {content}
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 8 }}>
      <div style={{
        padding: '10px 16px',
        borderRadius: '14px 14px 14px 4px',
        background: 'rgba(255,255,255,0.09)',
      }}>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18, letterSpacing: 3 }}>···</span>
      </div>
    </div>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const [lead, setLead] = useState<LeadData | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const transcriptSent = useRef(false)
  const formSubmittedRef = useRef(false)
  const formSubmitSucceededRef = useRef(false)
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const messagesRef = useRef<ChatMessage[]>([])
  const leadRef = useRef<LeadData | null>(null)

  useEffect(() => { messagesRef.current = messages }, [messages])
  useEffect(() => { leadRef.current = lead }, [lead])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 480)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const sendTranscript = useCallback((useBeacon = false) => {
    const msgs = messagesRef.current
    if (msgs.length < 2 || transcriptSent.current) return
    transcriptSent.current = true

    const payload = JSON.stringify({
      messages: msgs,
      lead: leadRef.current,
      formSubmitted: formSubmitSucceededRef.current,
      page: typeof window !== 'undefined' ? window.location.pathname : undefined,
    })

    if (useBeacon && typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon('/api/chat/transcript', payload)
    } else {
      fetch('/api/chat/transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      }).catch(() => {})
    }
  }, [])

  useEffect(() => {
    const handler = () => sendTranscript(true)
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [sendTranscript])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, pending])

  const submitContactForm = useCallback(async (capturedLead: LeadData, transcript: ChatMessage[]) => {
    if (formSubmittedRef.current) return
    formSubmittedRef.current = true

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: capturedLead.name,
          email: capturedLead.email,
          phone: capturedLead.phone,
          subject: capturedLead.subject || 'Chat inquiry',
          message: capturedLead.message || 'Submitted via chat widget',
          transcript,
        }),
      })

      if (res.ok) {
        formSubmitSucceededRef.current = true
        setFormSubmitted(true)
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'I had trouble submitting your details. Please email us directly at englewood360@gmail.com.' },
        ])
      }
    } catch {
      // transcript still goes via email — silent fail here
    }
  }, [])

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current)
    inactivityTimer.current = setTimeout(() => sendTranscript(false), INACTIVITY_MS)
  }, [sendTranscript])

  useEffect(() => {
    return () => { if (inactivityTimer.current) clearTimeout(inactivityTimer.current) }
  }, [])

  useEffect(() => {
    if (sessionStorage.getItem('chat-greeted')) return
    const timer = setTimeout(() => {
      setOpen((wasOpen) => {
        if (wasOpen) return wasOpen
        setMessages([{
          role: 'assistant',
          content: 'Welcome to Englewood Lodge No. 360! Can I help answer any questions about the lodge, our upcoming events, or Freemasonry?',
        }])
        sessionStorage.setItem('chat-greeted', '1')
        return true
      })
    }, 10000)
    return () => clearTimeout(timer)
  }, [])

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || pending) return

    const userMsg: ChatMessage = { role: 'user', content: text }
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    // Drop any leading assistant-only messages (e.g. the auto-greeting) — the
    // API requires history to start with a user message.
    const apiMessages = nextMessages.slice(nextMessages.findIndex((m) => m.role === 'user'))
    setInput('')
    setPending(true)
    resetInactivityTimer()

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
        signal: controller.signal,
      })

      if (res.status === 429) {
        setMessages((prev) => [...prev.slice(0, -1), { role: 'assistant', content: RATE_LIMIT_MESSAGE }])
        return
      }
      if (!res.ok || !res.body) {
        setMessages((prev) => [...prev.slice(0, -1), { role: 'assistant', content: ERROR_MESSAGE }])
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''
      let capturedLead: LeadData | null = null
      let finalDisplay = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })

        const { display, lead: parsedLead } = extractLead(accumulated)
        finalDisplay = display
        setMessages((prev) => [...prev.slice(0, -1), { role: 'assistant', content: display }])

        if (parsedLead && !capturedLead) {
          capturedLead = parsedLead
          setLead(parsedLead)
          leadRef.current = parsedLead
        }
      }

      resetInactivityTimer()
      if (capturedLead) {
        submitContactForm(capturedLead, [...apiMessages, { role: 'assistant', content: finalDisplay }])
      }
    } catch {
      setMessages((prev) => {
        const last = prev[prev.length - 1]
        if (last?.role === 'assistant' && last.content === '') {
          return [...prev.slice(0, -1), { role: 'assistant', content: ERROR_MESSAGE }]
        }
        return prev
      })
    } finally {
      clearTimeout(timeout)
      setPending(false)
    }
  }

  function handleClose() {
    setOpen(false)
    sendTranscript(false)
  }

  const hardLimit = CHAT_MAX_MESSAGES_HARD
  const atLimit = messages.length >= hardLimit || (!!lead && messages.length >= CHAT_MAX_MESSAGES)
  const showTyping = pending && messages[messages.length - 1]?.role === 'assistant' && messages[messages.length - 1]?.content === ''

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Chat with us'}
        style={{
          position: 'fixed', bottom: isMobile ? 16 : 20, right: isMobile ? 12 : 20, zIndex: 1000,
          width: 52, height: 52, borderRadius: 6,
          background: '#1a2744', border: '2px solid #c8a84b', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(26,39,68,0.5)',
          fontSize: 22, transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)'
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(200,168,75,0.4)'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 24px rgba(26,39,68,0.5)'
        }}
      >
        {open ? (
          <span style={{ color: '#c8a84b', fontSize: 20, fontWeight: 700, lineHeight: 1 }}>✕</span>
        ) : (
          <img src="/emblem.png" alt="Square and compass" width={34} height={34} style={{ display: 'block' }} />
        )}
      </button>

      {open && (
        <div style={{
          position: 'fixed', zIndex: 999,
          ...(isMobile
            ? { bottom: 80, left: 8, right: 8, height: 'calc(100dvh - 100px)' }
            : { bottom: 84, right: 20, width: 360, height: 480 }),
          display: 'flex', flexDirection: 'column',
          background: '#111b30',
          borderRadius: 16, border: '1px solid rgba(200,168,75,0.25)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.55)',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            padding: '13px 16px', background: '#1a2744',
            borderBottom: '1px solid rgba(200,168,75,0.2)',
            display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0,
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'rgba(200,168,75,0.12)', border: '1px solid rgba(200,168,75,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img src="/emblem.png" alt="" width={22} height={22} style={{ display: 'block' }} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1.2, fontFamily: 'Georgia, serif' }}>Lodge Assistant</div>
              <div style={{ fontSize: 11, color: '#c8a84b', marginTop: 1 }}>● Englewood Lodge No. 360</div>
            </div>
            <button
              onClick={handleClose}
              style={{
                marginLeft: 'auto', background: 'none', border: 'none',
                color: 'rgba(255,255,255,0.35)', cursor: 'pointer',
                fontSize: 18, lineHeight: 1, padding: '0 4px',
              }}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 6px' }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', marginTop: 36, padding: '0 12px' }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>🤝</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, fontFamily: 'Georgia, serif' }}>
                  Welcome, brother. Ask me anything about{' '}
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}>the lodge</span>,{' '}
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}>upcoming events</span>, or{' '}
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}>joining Freemasonry</span>.
                </div>
              </div>
            )}
            {messages.map((m, i) =>
              m.role === 'assistant' && m.content === '' ? null : (
                <Bubble key={i} {...m} />
              )
            )}
            {showTyping && <TypingDots />}
          </div>

          {/* Lead confirmation */}
          {lead && (
            <div style={{
              padding: '8px 12px',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(200,168,75,0.05)', flexShrink: 0,
            }}>
              {formSubmitted ? (
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  padding: '8px', borderRadius: 6,
                  background: 'rgba(200,168,75,0.12)', border: '1px solid rgba(200,168,75,0.3)',
                  fontSize: 13, fontWeight: 600, color: '#c8a84b', fontFamily: 'Georgia, serif',
                }}>
                  ✓ Message sent — a member will be in touch
                </div>
              ) : (
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '8px', borderRadius: 6,
                  background: 'rgba(255,255,255,0.04)',
                  fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'Georgia, serif',
                }}>
                  Sending your message…
                </div>
              )}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} style={{
            display: 'flex', gap: 8, padding: '10px 12px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            background: '#1a2744', flexShrink: 0,
          }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e as unknown as React.SyntheticEvent)
                }
              }}
              placeholder={atLimit ? 'Chat limit reached' : 'Ask a question…'}
              disabled={atLimit || pending}
              maxLength={CHAT_MAX_MESSAGE_LENGTH}
              rows={1}
              style={{
                flex: 1, background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8, color: '#fff', fontSize: 13,
                padding: '8px 12px', resize: 'none',
                fontFamily: 'Georgia, serif', outline: 'none',
                opacity: atLimit ? 0.4 : 1,
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || pending || atLimit}
              style={{
                background: '#c8a84b', border: 'none', borderRadius: 8,
                padding: '8px 14px', color: '#1a2744',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12,
                cursor: 'pointer', letterSpacing: '0.06em',
                opacity: !input.trim() || pending || atLimit ? 0.45 : 1,
                whiteSpace: 'nowrap',
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  )
}
