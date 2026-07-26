import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'
import {
  buildSystemPrompt,
  isValidHistory,
  RATE_LIMIT,
  RATE_LIMIT_WINDOW_MS,
  STREAM_ERROR_FALLBACK,
} from '@/lib/chat'
import { isRateLimited, getClientIp } from '@/lib/rate-limit'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response('Chat service unavailable', { status: 503 })
  }

  const ip = getClientIp(request)
  if (isRateLimited(ip, RATE_LIMIT, RATE_LIMIT_WINDOW_MS)) {
    return new Response('Too many requests', {
      status: 429,
      headers: { 'Retry-After': '600' },
    })
  }

  let parsed: { messages: unknown }
  try {
    parsed = await request.json()
  } catch {
    return new Response('Bad request', { status: 400 })
  }

  if (!isValidHistory(parsed.messages)) {
    return new Response('Invalid message history', { status: 400 })
  }

  const anthropicStream = client.messages.stream({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 500,
    system: buildSystemPrompt(),
    messages: parsed.messages,
  })

  let sentBytes = false
  const readable = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()
      try {
        for await (const event of anthropicStream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text))
            sentBytes = true
          }
        }
      } catch {
        if (!sentBytes) {
          controller.enqueue(encoder.encode(STREAM_ERROR_FALLBACK))
        }
      } finally {
        controller.close()
      }
    },
    cancel() {
      anthropicStream.abort()
    },
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
