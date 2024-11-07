import { PrismaClient } from "@prisma/client";
import { LoremIpsum } from "lorem-ipsum";

const prisma = new PrismaClient();

async function main() {
  // User type/role
  const userTypes = [
    {
      name: "Pessoal",
      slug: "personal",
    },
    {
      name: "Profissional",
      slug: "professional",
    },
  ];
  for (const type of userTypes) {
    try {
      const response = await prisma.userType.create({
        data: {
          name: type.name,
          slug: type.slug,
        },
      });
    } catch (err) {
      console.log("Erro: ", err);
    }
  }

  // Categories and occupations seed
  const categoriesOccupations = [
    {
      name: "Saúde e Bem-estar",
      slug: "health_wellness",
      occupations: [
        { name: "Médico Generalista", slug: "general_practitioner" },
        { name: "Dermatologista", slug: "dermatologist" },
        { name: "Cardiologista", slug: "cardiologist" },
        { name: "Ortopedista", slug: "orthopedist" },
        { name: "Pediatra", slug: "pediatrician" },
        { name: "Ginecologista", slug: "gynecologist" },
        { name: "Neurologista", slug: "neurologist" },
        { name: "Endocrinologista", slug: "endocrinologist" },
        { name: "Oftalmologista", slug: "ophthalmologist" },
        { name: "Otorrinolaringologista", slug: "otolaryngologist" },
        { name: "Urologista", slug: "urologist" },
        { name: "Psiquiatra", slug: "psychiatrist" },
        { name: "Psicólogo", slug: "psychologist" },
        { name: "Fisioterapeuta", slug: "physiotherapist" },
        { name: "Nutricionista", slug: "nutritionist" },
        { name: "Dentista", slug: "dentist" },
        { name: "Fonoaudiólogo", slug: "speech_therapist" },
        { name: "Terapeuta Ocupacional", slug: "occupational_therapist" },
        { name: "Acupunturista", slug: "acupuncturist" },
        { name: "Quiropraxista", slug: "chiropractor" },
        { name: "Podólogo", slug: "podiatrist" },
        { name: "Massoterapeuta", slug: "massage_therapist" },
        { name: "Esteticista", slug: "esthetician" },
        { name: "Terapeuta Holístico", slug: "holistic_therapist" },
      ],
    },
    {
      name: "Beleza e Estética",
      slug: "beauty_aesthetics",
      occupations: [
        { name: "Cabeleireiro", slug: "hairdresser" },
        { name: "Manicure/Pedicure", slug: "manicurist_pedicurist" },
        { name: "Barbeiro", slug: "barber" },
        { name: "Maquiador", slug: "makeup_artist" },
        { name: "Esteticista Facial", slug: "facial_esthetician" },
        { name: "Designer de Sobrancelhas", slug: "eyebrow_designer" },
        { name: "Depilador", slug: "waxing_specialist" },
        { name: "Massoterapeuta", slug: "massage_therapist" },
        { name: "Dermatologista Estético", slug: "esthetic_dermatologist" },
        { name: "Micropigmentador", slug: "micropigmentation_artist" },
      ],
    },
    {
      name: "Educação e Treinamento",
      slug: "education_training",
      occupations: [
        { name: "Professor Particular", slug: "private_teacher" },
        { name: "Instrutor de Idiomas", slug: "language_instructor" },
        {
          name: "Tutor de Matemática/Ciências/Outras Disciplinas",
          slug: "math_science_tutor",
        },
        { name: "Coach de Carreira", slug: "career_coach" },
        { name: "Preparador Físico", slug: "fitness_coach" },
        { name: "Professor de Música", slug: "music_teacher" },
        { name: "Professor de Yoga", slug: "yoga_teacher" },
        { name: "Instrutor de Pilates", slug: "pilates_instructor" },
        { name: "Personal Trainer", slug: "personal_trainer" },
        { name: "Mentor de Tecnologia", slug: "tech_mentor" },
        { name: "Consultor Educacional", slug: "educational_consultant" },
      ],
    },
    {
      name: "Serviços Automotivos",
      slug: "automotive_services",
      occupations: [
        { name: "Mecânico", slug: "mechanic" },
        {
          name: "Técnico em Eletricidade Automotiva",
          slug: "auto_electrician",
        },
        { name: "Funileiro e Pintor", slug: "panel_beater_painter" },
        { name: "Lavador de Carros", slug: "car_washer" },
        {
          name: "Técnico de Ar Condicionado Automotivo",
          slug: "auto_ac_technician",
        },
        { name: "Vistoriador Veicular", slug: "vehicle_inspector" },
        {
          name: "Especialista em Troca de Óleo",
          slug: "oil_change_specialist",
        },
        { name: "Alinhador e Balanceador", slug: "wheel_aligner_balancer" },
      ],
    },
    {
      name: "Consultoria e Desenvolvimento Profissional",
      slug: "consulting_professional_development",
      occupations: [
        { name: "Advogado", slug: "lawyer" },
        { name: "Contador", slug: "accountant" },
        { name: "Consultor Financeiro", slug: "financial_consultant" },
        { name: "Corretor de Imóveis", slug: "real_estate_agent" },
        { name: "Corretor de Seguros", slug: "insurance_broker" },
        { name: "Coach de Carreira", slug: "career_coach" },
        {
          name: "Consultor de Marketing Digital",
          slug: "digital_marketing_consultant",
        },
        { name: "Consultor de TI", slug: "it_consultant" },
        { name: "Analista de Investimentos", slug: "investment_analyst" },
      ],
    },
    {
      name: "Tecnologia e Informática",
      slug: "technology_it",
      occupations: [
        { name: "Suporte Técnico", slug: "technical_support" },
        { name: "Desenvolvedor de Software", slug: "software_developer" },
        { name: "Analista de Dados", slug: "data_analyst" },
        {
          name: "Especialista em Marketing Digital",
          slug: "digital_marketing_specialist",
        },
        {
          name: "Consultor de Segurança da Informação",
          slug: "information_security_consultant",
        },
        { name: "Especialista em Redes", slug: "network_specialist" },
        { name: "Designer Gráfico", slug: "graphic_designer" },
        { name: "Designer UX/UI", slug: "ux_ui_designer" },
        {
          name: "Técnico de Manutenção de Computadores",
          slug: "computer_technician",
        },
      ],
    },
    {
      name: "Fitness e Esportes",
      slug: "fitness_sports",
      occupations: [
        { name: "Personal Trainer", slug: "personal_trainer" },
        { name: "Treinador de Corrida", slug: "running_coach" },
        { name: "Instrutor de Yoga", slug: "yoga_instructor" },
        { name: "Instrutor de Pilates", slug: "pilates_instructor" },
        { name: "Instrutor de Natação", slug: "swimming_instructor" },
        { name: "Preparador Físico", slug: "fitness_coach" },
        { name: "Nutricionista Esportivo", slug: "sports_nutritionist" },
        { name: "Fisioterapeuta Esportivo", slug: "sports_physiotherapist" },
      ],
    },
    {
      name: "Eventos e Entretenimento",
      slug: "events_entertainment",
      occupations: [
        { name: "Fotógrafo", slug: "photographer" },
        { name: "Videomaker", slug: "videographer" },
        { name: "DJ", slug: "dj" },
        { name: "Organizador de Eventos", slug: "event_organizer" },
        { name: "Decorador de Eventos", slug: "event_decorator" },
        { name: "Mestre de Cerimônias", slug: "mc" },
        { name: "Bartender", slug: "bartender" },
        { name: "Chef de Cozinha para Eventos", slug: "event_chef" },
        { name: "Garçom/Garçonete para Eventos", slug: "event_waiter" },
      ],
    },
    {
      name: "Serviços Domésticos",
      slug: "domestic_services",
      occupations: [
        { name: "Diarista", slug: "housekeeper" },
        { name: "Jardineiro", slug: "gardener" },
        { name: "Piscineiro", slug: "pool_maintenance" },
        { name: "Cuidador de Animais", slug: "pet_sitter" },
        { name: "Babá", slug: "nanny" },
        { name: "Encanador", slug: "plumber" },
        { name: "Eletricista", slug: "electrician" },
        { name: "Pintor de Residências", slug: "house_painter" },
        {
          name: "Técnico de Manutenção de Eletrodomésticos",
          slug: "appliance_technician",
        },
      ],
    },
    {
      name: "Consultoria Pessoal e Bem-estar",
      slug: "personal_wellness_consulting",
      occupations: [
        { name: "Coach de Vida", slug: "life_coach" },
        { name: "Coach de Relacionamento", slug: "relationship_coach" },
        { name: "Terapeuta Holístico", slug: "holistic_therapist" },
        { name: "Consultor de Estilo", slug: "style_consultant" },
        {
          name: "Consultor de Imagem Pessoal",
          slug: "personal_image_consultant",
        },
        { name: "Astrólogo", slug: "astrologer" },
        { name: "Consultor de Feng Shui", slug: "feng_shui_consultant" },
        { name: "Especialista em Meditação", slug: "meditation_specialist" },
      ],
    },
  ];
  for (const categoryData of categoriesOccupations) {
    try {
      const category = await prisma.category.create({
        data: {
          name: categoryData.name,
          slug: categoryData.slug,
          occupations: {
            create: categoryData.occupations.map((profession) => ({
              name: profession.name,
              slug: profession.slug,
            })),
          },
        },
      });
    } catch (err) {
      console.log("Erro: ", err);
    }
  }

  // Type of services seed
  const serviceTypes = [
    {
      name: "Presencial",
      slug: "in_person",
    },
    {
      name: "Online",
      slug: "online",
    },
    {
      name: "Presencial e Online",
      slug: "in_person_and_online",
    },
  ];
  for (const type of serviceTypes) {
    try {
      const response = await prisma.serviceType.create({
        data: {
          name: type.name,
          slug: type.slug,
        },
      });
    } catch (err) {
      console.log("Erro: ", err);
    }
  }

  // Professionals seed
  const users = [
    {
      name: "Alice Santos",
      email: "alice.santos@example.com",
      phone: "(11) 91234-5678",
      image: "https://randomuser.me/api/portraits/women/9.jpg",
      birth: "1985-06-15",
      gender: "feminine",
      address: "São Paulo, Vila Mariana",
      role: "professional",
    },
    {
      name: "Bruno Costa",
      email: "bruno.costa@example.com",
      phone: "(21) 98765-4321",
      image: "https://randomuser.me/api/portraits/men/9.jpg",
      birth: "1990-03-22",
      gender: "masculine",
      address: "Rio de Janeiro, Lapa",
      role: "professional",
    },
    {
      name: "Clara Oliveira",
      email: "clara.oliveira@example.com",
      phone: "(31) 91234-6789",
      image: "https://randomuser.me/api/portraits/women/10.jpg",
      birth: "1995-12-01",
      gender: "feminine",
      address: "Belo Horizonte, Santa Efigênia",
      role: "professional",
    },
    {
      name: "Daniel Almeida",
      email: "daniel.almeida@example.com",
      phone: "(41) 98765-1234",
      image: "https://randomuser.me/api/portraits/men/10.jpg",
      birth: "1982-07-10",
      gender: "masculine",
      address: "Curitiba, Alto da XV",
      role: "professional",
    },
    {
      name: "Eva Lima",
      email: "eva.lima@example.com",
      phone: "(51) 91234-5678",
      image: "https://randomuser.me/api/portraits/women/11.jpg",
      birth: "1993-04-20",
      gender: "feminine",
      address: "Porto Alegre, Jardim Botânico",
      role: "professional",
    },
    {
      name: "Felipe Martins",
      email: "felipe.martins@example.com",
      phone: "(61) 98765-4321",
      image: "https://randomuser.me/api/portraits/men/11.jpg",
      birth: "1988-11-15",
      gender: "masculine",
      address: "Brasília, Asa Norte",
      role: "professional",
    },
    {
      name: "Gabriela Souza",
      email: "gabriela.souza@example.com",
      phone: "(11) 91234-5678",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
      birth: "1990-09-30",
      gender: "feminine",
      address: "São Paulo, Consolação",
      role: "professional",
    },
    {
      name: "Henrique Dias",
      email: "henrique.dias@example.com",
      phone: "(21) 98765-1234",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
      birth: "1994-06-18",
      gender: "masculine",
      address: "Rio de Janeiro, Flamengo",
      role: "professional",
    },
    {
      name: "Isabela Rocha",
      email: "isabela.rocha@example.com",
      phone: "(31) 91234-6789",
      image: "https://randomuser.me/api/portraits/women/13.jpg",
      birth: "1989-02-24",
      gender: "feminine",
      address: "Belo Horizonte, Praça da Liberdade",
      role: "professional",
    },
    {
      name: "Joaquim Ferreira",
      email: "joaquim.ferreira@example.com",
      phone: "(41) 98765-4321",
      image: "https://randomuser.me/api/portraits/men/13.jpg",
      birth: "1992-08-03",
      gender: "masculine",
      address: "Curitiba, Jardim das Américas",
      role: "professional",
    },
  ];
  for (const user of users) {
    try {
      // Get userTypeId for role professional
      const { id: userTypeId } = await prisma.userType.findFirst({
        where: {
          slug: "professional",
        },
      });

      // Generate a random bio to the new professional
      const lorem = new LoremIpsum({
        sentencesPerParagraph: {
          min: 1,
          max: 3,
        },
      });
      const randomBio = lorem.generateParagraphs(2).slice(0, 255);

      // Get a random occupation and category for the new professional
      const occupationCount = await prisma.occupation.count();
      const randomOccupationIndex = Math.floor(Math.random() * occupationCount);
      const randomOccupation = await prisma.occupation.findMany({
        skip: randomOccupationIndex,
        take: 1,
      });
      const randomOccupationId = randomOccupation[0]?.id;
      const categoryId = randomOccupation[0]?.categoryId;

      // Generate a random service value for the new professional
      let value = (Math.random() * (1000 - 100) + 100).toFixed(2);
      let formattedValue = `R$${value.replace(".", ",")}`;

      // Get a random service type for the new professional
      const serviceTypeCount = await prisma.serviceType.count();
      const randomServiceTypeIndex = Math.floor(
        Math.random() * serviceTypeCount,
      );
      const randomServiceType = await prisma.serviceType.findMany({
        skip: randomServiceTypeIndex,
        take: 1,
      });
      const randomServiceTypeId = randomServiceType[0]?.id;

      //
      const weekDayArray = [0, 1, 2, 3, 4, 5, 6];
      const timeStartInMinutesArray = [480, 540, 600, 660, 720, 780];
      const timeEndInMinutesArray = [840, 900, 960, 1020, 1080];

      // Now create the user and the professional in one go
      const createdUser = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          image: user.image,
          birth: user.birth,
          gender: user.gender,
          address: user.address,
          userTypeId,
          professional: {
            create: {
              bio: randomBio,
              occupationId: randomOccupationId,
              categoryId: categoryId,
              serviceValue: formattedValue,
              serviceTypeId: randomServiceTypeId,
              schedule: {
                create: weekDayArray.map((weekDay) => {
                  const randomStartIndex = Math.floor(
                    Math.random() * timeStartInMinutesArray.length,
                  );
                  const randomEndIndex = Math.floor(
                    Math.random() * timeEndInMinutesArray.length,
                  );
                  return {
                    weekDay: weekDay,
                    timeStartInMinutes:
                      timeStartInMinutesArray[randomStartIndex],
                    timeEndInMinutes: timeEndInMinutesArray[randomEndIndex],
                    enabled: Math.random() < 0.5,
                  };
                }),
              },
            },
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
