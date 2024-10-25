export const serviceType = [
  { id: "in-person", name: "Presencial" },
  { id: "online", name: "Online" },
  { id: "both", name: "Presencial e Online" },
];

export const spokenLanguages = [
  { id: "portuguese", name: "Português" },
  { id: "english", name: "Inglês" },
  { id: "spanish", name: "Espanhol" },
];

export const usersType = [
  { id: "client", name: "Cliente" },
  { id: "professional", name: "Profissional" },
];

export const gendersType = [
  { id: "masculine", name: "Masculino" },
  { id: "feminine", name: "Feminino" },
  { id: "transgender", name: "Transgênero" },
  { id: "other", name: "Outro" },
];

export const menus = [
  {
    id: "dashboard",
    name: "Dashboard",
    href: "/dashboard",
    access: ["client", "professional"],
  },
  {
    id: "professionals",
    name: "Profissionais",
    href: "/professionals",
    access: ["client", "professional"],
  },
];
