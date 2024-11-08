export const spokenLanguages = [
  { id: 'portuguese', name: 'Português' },
  { id: 'english', name: 'Inglês' },
  { id: 'spanish', name: 'Espanhol' },
]

export const gendersType = [
  { id: 'masculine', name: 'Masculino' },
  { id: 'feminine', name: 'Feminino' },
  { id: 'transgender', name: 'Transgênero' },
  { id: 'other', name: 'Outro' },
]

export const menus = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    href: '/dashboard',
    access: ['personal', 'professional'],
  },
  {
    id: 'professionals',
    name: 'Profissionais',
    href: '/professionals',
    access: ['personal', 'professional'],
  },
  {
    id: 'scheduling',
    name: 'Agendamentos',
    href: '/scheduling',
    access: ['personal', 'professional'],
  },
  {
    id: 'schedule',
    name: 'Programação',
    href: '/schedule',
    access: ['professional'],
  },
]
