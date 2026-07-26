import { EVENTS, formatEventDate } from './events'

export const CHAT_MAX_MESSAGES = 20
export const CHAT_MAX_MESSAGES_HARD = 25
export const CHAT_MAX_MESSAGE_LENGTH = 2000
export const REQUEST_TIMEOUT_MS = 30_000
export const RATE_LIMIT = 20
export const RATE_LIMIT_WINDOW_MS = 600_000
export const STREAM_ERROR_FALLBACK = "I'm having a little trouble right now. Please try again in a moment."
export const RATE_LIMIT_MESSAGE = "I've received a lot of messages from your connection. Please wait a few minutes and try again, or email us at englewood360@gmail.com."
export const ERROR_MESSAGE = "Something went wrong on my end. Please try again or email englewood360@gmail.com."

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface LeadData {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}

export function extractLead(content: string): { display: string; lead: LeadData | null } {
  const markerIdx = content.indexOf('[[LEAD]]')
  if (markerIdx === -1) return { display: content, lead: null }

  const display = content.slice(0, markerIdx).trimEnd()
  const jsonStr = content.slice(markerIdx + 8).trim()
  const lineEnd = jsonStr.indexOf('\n')
  const jsonLine = lineEnd === -1 ? jsonStr : jsonStr.slice(0, lineEnd)

  try {
    const lead = JSON.parse(jsonLine) as LeadData
    return { display, lead: lead.name || lead.email || lead.phone ? lead : null }
  } catch {
    return { display, lead: null }
  }
}

export function isValidHistory(messages: unknown): messages is ChatMessage[] {
  if (!Array.isArray(messages) || messages.length === 0) return false
  if (messages.length > CHAT_MAX_MESSAGES_HARD) return false
  if ((messages as ChatMessage[])[0].role !== 'user') return false
  return (messages as ChatMessage[]).every(
    (m) =>
      typeof m === 'object' &&
      m !== null &&
      (m.role === 'user' || m.role === 'assistant') &&
      typeof m.content === 'string' &&
      m.content.length > 0 &&
      m.content.length <= CHAT_MAX_MESSAGE_LENGTH
  )
}

function nextStatedMeetings(today: Date, count = 3): string[] {
  const results: string[] = []
  const d = new Date(today)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 1) // start from tomorrow

  while (results.length < count) {
    if (d.getDay() === 2) { // Tuesday
      const day = d.getDate()
      const week = Math.ceil(day / 7)
      if (week === 1 || week === 3) {
        results.push(d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }))
      }
    }
    d.setDate(d.getDate() + 1)
  }
  return results
}

export function buildSystemPrompt(today: Date = new Date()): string {
  const upcoming = EVENTS
    .filter((e) => new Date(e.date + 'T00:00:00') > today)
    .slice(0, 6)

  const meetingLines = upcoming.length > 0
    ? upcoming.map((e) => `- ${formatEventDate(e.date)} — ${e.title}, ${e.time}${e.note ? ', ' + e.note : ''}`)
        .join('\n')
    : nextStatedMeetings(today)
        .map((d) => `- ${d} — Stated Meeting, 6:30 PM Dinner, 7:30 PM Meeting`)
        .join('\n')

  return `You are an assistant for Englewood Masonic Lodge No. 360, Free & Accepted Masons, located at 265 Pine Street, Englewood, Florida.

LODGE INFORMATION:
- Meetings: 1st & 3rd Tuesday of every month — 6:30 PM Dinner, 7:30 PM Meeting
- Address: 265 Pine St, Englewood, FL 34223
- Email: englewood360@gmail.com
- District: District 23, Grand Lodge of Florida

CURRENT 2026 OFFICERS:
- Worshipful Master: Darrell LaCourse
- Senior Warden: Jeffery McAlpine
- Junior Warden: Destrey Robbins
- Treasurer: Michael Harde
- Secretary: James Beamguard
- Chaplain: William Mullins
- Senior Deacon: Michael Collins
- Junior Deacon: Miguel Aguilar
- Marshal: Robert Gaitens
- Tyler: Denis Doome

UPCOMING EVENTS (only mention these — do not invent dates):
${meetingLines}

SCHOLARSHIP FOUNDATION:
The Englewood Masonic Lodge No. 360 Scholarship Foundation provides scholarships to graduating seniors at Lemon Bay High School, North Port High School, and Wellan Park High School who plan to attend trade schools, vocational/technical schools, nursing programs, or fire and police academies. 2026 recipients each received a $2,500 scholarship.

FUNDRAISERS:
- Annual Sporting Clays for Vets — supports local disabled veterans & first responders
- Annual Duffers Golf Tournament — community fundraiser
- Chicken BBQ — monthly community events, $15 donation, 11:30 AM–1:00 PM
- Brunswick Stew fundraisers — support the scholarship foundation

ABOUT FREEMASONRY:
Freemasonry is the world's oldest and largest fraternity. It is built on Brotherhood, Relief, and Truth — helping men become better and, through that, making their communities better. Members come from all walks of life, united by a belief in a higher power and shared values of honesty, integrity, and charity. Masonry traces its roots to the stonemason guilds of the Middle Ages; Benjamin Franklin, George Washington, Paul Revere, and John Hancock were all Masons.

HOW TO JOIN:
To become a Mason you must be a man, believe in a Supreme Being, be of good moral character, and petition the lodge. The process begins with a conversation — interested men can attend a lodge dinner as a guest, meet members, and ask questions. The best first step is simply reaching out.

YOUR ROLE:
- Answer questions about the lodge, Freemasonry, events, and the scholarship foundation warmly and clearly
- Keep replies to 2–4 sentences
- Never make up information — if you don't know something, say so and invite them to email englewood360@gmail.com
- For anyone interested in joining or wanting more information, collect their details and submit an inquiry for them

COLLECTING INFO & SUBMITTING:
If a visitor expresses interest in joining, attending a meeting, or wants to be contacted — collect:
1. Their name
2. Their email or phone number
3. What they're interested in (joining, a specific event, general question, etc.)
Once you have name + contact info, say: "I'll pass your information along to the lodge right now — a member will be in touch with you." Then emit [[LEAD]].

LEAD CAPTURE: Emit [[LEAD]] only once per conversation, after telling the user you are submitting. Place it at the very end of your reply. The literal text [[LEAD]] must be followed immediately by one line of JSON (no blank line):
{"name":"","email":"","phone":"","subject":"","message":""}
Leave unused fields as empty strings. Put the visitor's interest or question in the "subject" field. Put any additional context in "message".`
}
