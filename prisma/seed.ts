import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Categories and profession seed
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

  // Status seed
  const statusList = [
    "Aguardando aprovação",
    "Em andamento",
    "Cancelado",
    "Não compareceu",
    "Concluído",
  ];
  for (const statusItem of statusList) {
    try {
      const response = await prisma.status.create({
        data: {
          name: statusItem,
        },
      });
    } catch (err) {
      console.log("Erro: ", err);
    }
  }

  // Absence list seed
  const absenceList = [
    {
      id: 1,
      name: "Férias",
      description: "Ausência programada e remunerada para descanso e lazer.",
    },
    {
      id: 2,
      name: "Licença Médica",
      description:
        "Afastamento por questões de saúde, geralmente com atestado médico.",
    },
    {
      id: 3,
      name: "Licença Paternidade/Maternidade",
      description: "Tempo de ausência após o nascimento ou adoção de um filho.",
    },
    {
      id: 4,
      name: "Licença sem Remuneração",
      description:
        "Permissão para se ausentar do trabalho sem receber salário.",
    },
    {
      id: 5,
      name: "Afastamento por Motivo de Doença",
      description:
        "Afastamentos prolongados devido a doenças crônicas ou tratamento de saúde.",
    },
    {
      id: 6,
      name: "Licença para Tratamento de Saúde",
      description:
        "Focada em tratamento específico, como fisioterapia ou reabilitação.",
    },
    {
      id: 7,
      name: "Afastamento por Motivos de Segurança",
      description: "Ausência devido a questões de segurança pessoal.",
    },
    {
      id: 8,
      name: "Licença para Estudo",
      description:
        "Afastamento para a realização de cursos ou programas de formação.",
    },
    {
      id: 9,
      name: "Licença para Casamento",
      description: "Ausência para realizar cerimônias de casamento.",
    },
    {
      id: 10,
      name: "Afastamento por Motivos Familiares",
      description: "Para cuidar de familiares que necessitam de assistência.",
    },
    {
      id: 11,
      name: "Afastamento por Motivos Legais",
      description:
        "Quando o profissional precisa se ausentar devido a obrigações legais.",
    },
  ];
  for (const absenceItem of absenceList) {
    try {
      const response = await prisma.absenceOptions.create({
        data: {
          name: absenceItem.name,
          description: absenceItem.description,
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
