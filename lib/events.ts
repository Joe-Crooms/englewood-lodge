export type EventType = 'meeting' | 'fundraiser' | 'community' | 'practice' | 'other'

export interface LodgeEvent {
  date: string
  title: string
  time: string
  note: string
  type: EventType
  link?: string
  linkText?: string
  accentColor?: string
}

export const EVENTS: LodgeEvent[] = [
  {
    date: '2026-03-17',
    title: 'Stated Meeting',
    time: '6:30 PM Dinner · 7:30 PM Meeting',
    note: '265 Pine St, Englewood, FL',
    type: 'meeting',
  },
  {
    date: '2026-03-21',
    title: 'Annual Sporting Clays for Vets',
    time: '8:00 AM Registration · 9:30 AM Shotgun Start',
    note: 'Sarasota Trap Skeet & Clays, Nokomis · $125/person',
    type: 'fundraiser',
    link: '/events/clays-for-vets',
    linkText: 'View Details & Register →',
    accentColor: '#6b2d6b',
  },
  {
    date: '2026-03-21',
    title: 'Spaghetti Dinner',
    time: '5:00 PM – 7:00 PM',
    note: '265 Pine St, Englewood, FL',
    type: 'community',
  },
  {
    date: '2026-03-22',
    title: 'Chicken BBQ',
    time: '11:30 AM – 1:00 PM',
    note: '$15.00 Donation · 265 Pine St, Englewood, FL',
    type: 'community',
    link: '/events/chicken-bbq',
    linkText: '🍗 Pre-Register →',
    accentColor: '#8b2020',
  },
  {
    date: '2026-03-24',
    title: 'Degree Practice',
    time: '6:30 PM – 7:30 PM',
    note: '265 Pine St, Englewood, FL',
    type: 'practice',
  },
  {
    date: '2026-04-07',
    title: 'Stated Meeting',
    time: '6:30 PM Dinner · 7:30 PM Meeting',
    note: '265 Pine St, Englewood, FL',
    type: 'meeting',
  },
  {
    date: '2026-04-12',
    title: 'Chicken BBQ',
    time: '11:30 AM – 1:00 PM',
    note: '$15.00 Donation · 265 Pine St, Englewood, FL',
    type: 'community',
    link: '/events/chicken-bbq',
    linkText: '🍗 Pre-Register →',
    accentColor: '#8b2020',
  },
  {
    date: '2026-04-14',
    title: 'Degree Practice',
    time: '6:30 PM – 7:30 PM',
    note: '265 Pine St, Englewood, FL',
    type: 'practice',
  },
  {
    date: '2026-04-18',
    title: 'Spaghetti Dinner',
    time: '5:00 PM – 7:00 PM',
    note: '265 Pine St, Englewood, FL',
    type: 'community',
  },
  {
    date: '2026-04-21',
    title: 'Stated Meeting',
    time: '6:30 PM Dinner · 7:30 PM Meeting',
    note: '265 Pine St, Englewood, FL',
    type: 'meeting',
  },
  {
    date: '2026-04-26',
    title: 'Chicken BBQ',
    time: '11:30 AM – 1:00 PM',
    note: '$15.00 Donation · 265 Pine St, Englewood, FL',
    type: 'community',
    link: '/events/chicken-bbq',
    linkText: '🍗 Pre-Register →',
    accentColor: '#8b2020',
  },
  {
    date: '2026-04-28',
    title: 'Degree Practice',
    time: '6:30 PM – 7:30 PM',
    note: '265 Pine St, Englewood, FL',
    type: 'practice',
  },
  {
    date: '2026-05-02',
    title: 'Stated Meeting',
    time: '6:30 PM Dinner · 7:30 PM Meeting',
    note: '265 Pine St, Englewood, FL',
    type: 'meeting',
  },
  {
    date: '2026-05-10',
    title: 'Chicken BBQ',
    time: '11:30 AM – 1:00 PM',
    note: '$15.00 Donation · 265 Pine St, Englewood, FL',
    type: 'community',
    link: '/events/chicken-bbq',
    linkText: '🍗 Pre-Register →',
    accentColor: '#8b2020',
  },
  {
    date: '2026-05-12',
    title: 'Degree Practice',
    time: '6:30 PM – 7:30 PM',
    note: '265 Pine St, Englewood, FL',
    type: 'practice',
  },
  {
    date: '2026-05-16',
    title: '6th Annual Duffers Golf Tournament',
    time: '7:00 AM Registration · 8:00 AM Shotgun Start',
    note: 'Long Marsh Golf Club, Rotonda West · $95/player',
    type: 'fundraiser',
    link: '/events/golf-tournament',
    linkText: 'View Details & Register →',
    accentColor: '#2d5a27',
  },
  {
    date: '2026-05-19',
    title: 'Stated Meeting',
    time: '7:30 PM Meeting',
    note: '265 Pine St, Englewood, FL',
    type: 'meeting',
  },
  {
    date: '2026-06-02',
    title: 'Stated Meeting',
    time: '7:30 PM Meeting',
    note: '265 Pine St, Englewood, FL',
    type: 'meeting',
  },
  {
    date: '2026-06-06',
    title: 'Chicken BBQ',
    time: '11:30 AM – 1:00 PM',
    note: '$15.00 Donation · 265 Pine St, Englewood, FL',
    type: 'community',
    link: '/events/chicken-bbq',
    linkText: '🍗 Pre-Register →',
    accentColor: '#8b2020',
  },
  {
    date: '2026-06-09',
    title: 'Degree Practice',
    time: '6:30 PM – 7:30 PM',
    note: '265 Pine St, Englewood, FL',
    type: 'practice',
  },
  {
    date: '2026-06-16',
    title: 'DDGM Visit',
    time: '7:30 PM Meeting',
    note: '265 Pine St, Englewood, FL',
    type: 'meeting',
  },
  {
    date: '2026-06-23',
    title: 'Officers Meeting',
    time: '6:30 PM',
    note: '265 Pine St, Englewood, FL',
    type: 'practice',
  },
  {
    date: '2026-06-30',
    title: 'Degree Practice',
    time: '6:30 PM – 7:30 PM',
    note: '265 Pine St, Englewood, FL',
    type: 'practice',
  },
  {
    date: '2026-07-07',
    title: 'Flag Retirement Ceremony & Stated Meeting',
    time: '6:00 PM Ceremony · 7:30 PM Meeting',
    note: '265 Pine St, Englewood, FL',
    type: 'meeting',
  },
  {
    date: '2026-07-14',
    title: 'Practice / Officer Meeting',
    time: '6:30 PM',
    note: '265 Pine St, Englewood, FL',
    type: 'practice',
  },
  {
    date: '2026-07-21',
    title: 'Stated Meeting',
    time: '7:30 PM Meeting',
    note: '265 Pine St, Englewood, FL',
    type: 'meeting',
  },
  {
    date: '2026-07-28',
    title: 'Practice / Officer Meeting',
    time: '6:30 PM',
    note: '265 Pine St, Englewood, FL',
    type: 'practice',
  },
]

export function getUpcomingEvents(today: Date): LodgeEvent[] {
  return EVENTS.filter((e) => {
    const [y, m, d] = e.date.split('-').map(Number)
    return new Date(y, m - 1, d) >= today
  })
}

export function getPastFundraisers(today: Date): LodgeEvent[] {
  return EVENTS.filter((e) => {
    if (e.type !== 'fundraiser') return false
    const [y, m, d] = e.date.split('-').map(Number)
    return new Date(y, m - 1, d) < today
  })
}

export function formatEventDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
