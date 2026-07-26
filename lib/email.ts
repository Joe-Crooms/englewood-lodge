import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM_ADDRESS =
  process.env.FROM_EMAIL_ADDRESS ?? 'Englewood Lodge No. 360 <noreply@englewoodlodge360.com>'

export const LODGE_EMAIL =
  process.env.LODGE_EMAIL ?? 'englewood360@gmail.com'

export const ADMIN_EMAIL = 'joecrooms@yahoo.com'
