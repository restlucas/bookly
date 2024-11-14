export const gendersType = [
  { id: 'masculine', name: 'Masculine' },
  { id: 'feminine', name: 'Feminine' },
  { id: 'transgender', name: 'Transgender' },
  { id: 'other', name: 'Other' },
]

export const menus = {
  main: [
    {
      id: 'dashboard',
      name: 'Dashboard',
      href: '/dashboard',
      access: ['personal', 'professional'],
    },
    {
      id: 'professionals',
      name: 'Professionals',
      href: '/professionals',
      access: ['personal', 'professional'],
    },
    {
      id: 'appointments',
      name: 'Appointments',
      href: '/appointments',
      access: ['personal', 'professional'],
    },
    {
      id: 'schedule',
      name: 'Schedule',
      href: '/schedule',
      access: ['professional'],
    },
  ],
  aside: [
    {
      id: 'my_account',
      name: 'My account',
      href: '/my-account',
      access: ['personal', 'professional'],
    },
    {
      id: 'professional_profile',
      name: 'Professional profile',
      href: '/professional-profile',
      access: ['professional'],
    },
    {
      id: 'favorites',
      name: 'Favorites',
      href: '/favorites',
      access: ['personal', 'professional'],
    },
  ],
}
