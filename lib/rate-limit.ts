const SWEEP_INTERVAL_MS = 600_000

const store = new Map<string, { count: number; resetAt: number }>()
let lastSweep = Date.now()

function sweep() {
  const now = Date.now()
  if (now - lastSweep < SWEEP_INTERVAL_MS) return
  lastSweep = now
  for (const [key, bucket] of store) {
    if (now > bucket.resetAt) store.delete(key)
  }
}

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  sweep()
  const now = Date.now()
  const bucket = store.get(key)
  if (!bucket || now > bucket.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return false
  }
  bucket.count += 1
  return bucket.count > limit
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}
