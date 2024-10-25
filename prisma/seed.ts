import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categoriesWithProfessions = [
    {
      name: "Saúde e Bem-estar",
      professions: [
        "Médico Generalista",
        "Médico Especialista - Dermatologista",
        "Médico Especialista - Cardiologista",
        "Médico Especialista - Ortopedista",
        "Médico Especialista - Pediatra",
        "Médico Especialista - Ginecologista",
        "Médico Especialista - Neurologista",
        "Médico Especialista - Endocrinologista",
        "Médico Especialista - Oftalmologista",
        "Médico Especialista - Otorrinolaringologista",
        "Médico Especialista - Urologista",
        "Médico Especialista - Psiquiatra",
        "Psicólogo",
        "Fisioterapeuta",
        "Nutricionista",
        "Dentista",
        "Fonoaudiólogo",
        "Terapeuta Ocupacional",
        "Acupunturista",
        "Quiropraxista",
        "Podólogo",
        "Massoterapeuta",
        "Esteticista",
        "Terapeuta Holístico",
      ],
    },
    {
      name: "Beleza e Estética",
      professions: [
        "Cabeleireiro",
        "Manicure/Pedicure",
        "Barbeiro",
        "Maquiador",
        "Esteticista Facial",
        "Designer de Sobrancelhas",
        "Depilador",
        "Massoterapeuta",
        "Dermatologista Estético",
        "Micropigmentador",
      ],
    },
    {
      name: "Educação e Treinamento",
      professions: [
        "Professor Particular",
        "Instrutor de Idiomas",
        "Tutor de Matemática/Ciências/Outras Disciplinas",
        "Coach de Carreira",
        "Preparador Físico",
        "Professor de Música",
        "Professor de Yoga",
        "Instrutor de Pilates",
        "Personal Trainer",
        "Mentor de Tecnologia",
        "Consultor Educacional",
      ],
    },
    {
      name: "Serviços Automotivos",
      professions: [
        "Mecânico",
        "Técnico em Eletricidade Automotiva",
        "Funileiro e Pintor",
        "Lavador de Carros",
        "Técnico de Ar Condicionado Automotivo",
        "Vistoriador Veicular",
        "Especialista em Troca de Óleo",
        "Alinhador e Balanceador",
      ],
    },
    {
      name: "Consultoria e Desenvolvimento Profissional",
      professions: [
        "Advogado",
        "Contador",
        "Consultor Financeiro",
        "Corretor de Imóveis",
        "Corretor de Seguros",
        "Coach de Carreira",
        "Consultor de Marketing Digital",
        "Consultor de TI",
        "Analista de Investimentos",
      ],
    },
    {
      name: "Tecnologia e Informática",
      professions: [
        "Suporte Técnico",
        "Desenvolvedor de Software",
        "Analista de Dados",
        "Especialista em Marketing Digital",
        "Consultor de Segurança da Informação",
        "Especialista em Redes",
        "Designer Gráfico",
        "Designer UX/UI",
        "Técnico de Manutenção de Computadores",
      ],
    },
    {
      name: "Fitness e Esportes",
      professions: [
        "Personal Trainer",
        "Treinador de Corrida",
        "Instrutor de Yoga",
        "Instrutor de Pilates",
        "Instrutor de Natação",
        "Preparador Físico",
        "Nutricionista Esportivo",
        "Fisioterapeuta Esportivo",
      ],
    },
    {
      name: "Eventos e Entretenimento",
      professions: [
        "Fotógrafo",
        "Videomaker",
        "DJ",
        "Organizador de Eventos",
        "Decorador de Eventos",
        "Mestre de Cerimônias",
        "Bartender",
        "Chef de Cozinha para Eventos",
        "Garçom/Garçonete para Eventos",
      ],
    },
    {
      name: "Serviços Domésticos",
      professions: [
        "Diarista",
        "Jardineiro",
        "Piscineiro",
        "Cuidador de Animais",
        "Babá",
        "Encanador",
        "Eletricista",
        "Pintor de Residências",
        "Técnico de Manutenção de Eletrodomésticos",
      ],
    },
    {
      name: "Consultoria Pessoal e Bem-estar",
      professions: [
        "Coach de Vida",
        "Coach de Relacionamento",
        "Terapeuta Holístico",
        "Consultor de Estilo",
        "Consultor de Imagem Pessoal",
        "Astrólogo",
        "Consultor de Feng Shui",
        "Especialista em Meditação",
      ],
    },
  ];

  for (const categoryData of categoriesWithProfessions) {
    try {
      const category = await prisma.category.create({
        data: {
          name: categoryData.name,
          professions: {
            create: categoryData.professions.map((profession) => ({
              name: profession,
            })),
          },
        },
      });
    } catch (err) {
      console.log("Erro: ", err);
    }
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
