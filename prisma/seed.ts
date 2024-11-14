import { PrismaClient } from "@prisma/client";
import { LoremIpsum } from "lorem-ipsum";

const prisma = new PrismaClient();

async function main() {
  // User type/role
  const userTypes = [
    {
      name: "Personal",
      slug: "personal",
    },
    {
      name: "Professional",
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
      name: "Health and Wellness",
      slug: "health_wellness",
      occupations: [
        { name: "General Practitioner", slug: "general_practitioner" },
        { name: "Dermatologist", slug: "dermatologist" },
        { name: "Cardiologist", slug: "cardiologist" },
        { name: "Orthopedist", slug: "orthopedist" },
        { name: "Pediatrician", slug: "pediatrician" },
        { name: "Gynecologist", slug: "gynecologist" },
        { name: "Neurologist", slug: "neurologist" },
        { name: "Endocrinologist", slug: "endocrinologist" },
        { name: "Ophthalmologist", slug: "ophthalmologist" },
        { name: "Otolaryngologist", slug: "otolaryngologist" },
        { name: "Urologist", slug: "urologist" },
        { name: "Psychiatrist", slug: "psychiatrist" },
        { name: "Psychologist", slug: "psychologist" },
        { name: "Physiotherapist", slug: "physiotherapist" },
        { name: "Nutritionist", slug: "nutritionist" },
        { name: "Dentist", slug: "dentist" },
        { name: "Speech Therapist", slug: "speech_therapist" },
        { name: "Occupational Therapist", slug: "occupational_therapist" },
        { name: "Acupuncturist", slug: "acupuncturist" },
        { name: "Chiropractor", slug: "chiropractor" },
        { name: "Podiatrist", slug: "podiatrist" },
        { name: "Massage Therapist", slug: "massage_therapist" },
        { name: "Esthetician", slug: "esthetician" },
        { name: "Holistic Therapist", slug: "holistic_therapist" },
      ],
    },
    {
      name: "Beauty and Aesthetics",
      slug: "beauty_aesthetics",
      occupations: [
        { name: "Hairdresser", slug: "hairdresser" },
        { name: "Manicurist/Pedicurist", slug: "manicurist_pedicurist" },
        { name: "Barber", slug: "barber" },
        { name: "Makeup Artist", slug: "makeup_artist" },
        { name: "Facial Esthetician", slug: "facial_esthetician" },
        { name: "Eyebrow Designer", slug: "eyebrow_designer" },
        { name: "Waxing Specialist", slug: "waxing_specialist" },
        { name: "Massage Therapist", slug: "massage_therapist" },
        { name: "Aesthetic Dermatologist", slug: "esthetic_dermatologist" },
        { name: "Micropigmentation Artist", slug: "micropigmentation_artist" },
      ],
    },
    {
      name: "Education and Training",
      slug: "education_training",
      occupations: [
        { name: "Private Teacher", slug: "private_teacher" },
        { name: "Language Instructor", slug: "language_instructor" },
        {
          name: "Math/Science/Other Subjects Tutor",
          slug: "math_science_tutor",
        },
        { name: "Career Coach", slug: "career_coach" },
        { name: "Fitness Coach", slug: "fitness_coach" },
        { name: "Music Teacher", slug: "music_teacher" },
        { name: "Yoga Teacher", slug: "yoga_teacher" },
        { name: "Pilates Instructor", slug: "pilates_instructor" },
        { name: "Personal Trainer", slug: "personal_trainer" },
        { name: "Tech Mentor", slug: "tech_mentor" },
        { name: "Educational Consultant", slug: "educational_consultant" },
      ],
    },
    {
      name: "Automotive Services",
      slug: "automotive_services",
      occupations: [
        { name: "Mechanic", slug: "mechanic" },
        { name: "Auto Electrician", slug: "auto_electrician" },
        { name: "Panel Beater and Painter", slug: "panel_beater_painter" },
        { name: "Car Washer", slug: "car_washer" },
        { name: "Auto AC Technician", slug: "auto_ac_technician" },
        { name: "Vehicle Inspector", slug: "vehicle_inspector" },
        { name: "Oil Change Specialist", slug: "oil_change_specialist" },
        { name: "Wheel Aligner and Balancer", slug: "wheel_aligner_balancer" },
      ],
    },
    {
      name: "Consulting and Professional Development",
      slug: "consulting_professional_development",
      occupations: [
        { name: "Lawyer", slug: "lawyer" },
        { name: "Accountant", slug: "accountant" },
        { name: "Financial Consultant", slug: "financial_consultant" },
        { name: "Real Estate Agent", slug: "real_estate_agent" },
        { name: "Insurance Broker", slug: "insurance_broker" },
        { name: "Career Coach", slug: "career_coach" },
        {
          name: "Digital Marketing Consultant",
          slug: "digital_marketing_consultant",
        },
        { name: "IT Consultant", slug: "it_consultant" },
        { name: "Investment Analyst", slug: "investment_analyst" },
      ],
    },
    {
      name: "Technology and IT",
      slug: "technology_it",
      occupations: [
        { name: "Technical Support", slug: "technical_support" },
        { name: "Software Developer", slug: "software_developer" },
        { name: "Data Analyst", slug: "data_analyst" },
        {
          name: "Digital Marketing Specialist",
          slug: "digital_marketing_specialist",
        },
        {
          name: "Information Security Consultant",
          slug: "information_security_consultant",
        },
        { name: "Network Specialist", slug: "network_specialist" },
        { name: "Graphic Designer", slug: "graphic_designer" },
        { name: "UX/UI Designer", slug: "ux_ui_designer" },
        { name: "Computer Technician", slug: "computer_technician" },
      ],
    },
    {
      name: "Fitness and Sports",
      slug: "fitness_sports",
      occupations: [
        { name: "Personal Trainer", slug: "personal_trainer" },
        { name: "Running Coach", slug: "running_coach" },
        { name: "Yoga Instructor", slug: "yoga_instructor" },
        { name: "Pilates Instructor", slug: "pilates_instructor" },
        { name: "Swimming Instructor", slug: "swimming_instructor" },
        { name: "Fitness Coach", slug: "fitness_coach" },
        { name: "Sports Nutritionist", slug: "sports_nutritionist" },
        { name: "Sports Physiotherapist", slug: "sports_physiotherapist" },
      ],
    },
    {
      name: "Events and Entertainment",
      slug: "events_entertainment",
      occupations: [
        { name: "Photographer", slug: "photographer" },
        { name: "Videographer", slug: "videographer" },
        { name: "DJ", slug: "dj" },
        { name: "Event Organizer", slug: "event_organizer" },
        { name: "Event Decorator", slug: "event_decorator" },
        { name: "Master of Ceremonies", slug: "mc" },
        { name: "Bartender", slug: "bartender" },
        { name: "Event Chef", slug: "event_chef" },
        { name: "Event Waiter", slug: "event_waiter" },
      ],
    },
    {
      name: "Domestic Services",
      slug: "domestic_services",
      occupations: [
        { name: "Housekeeper", slug: "housekeeper" },
        { name: "Gardener", slug: "gardener" },
        { name: "Pool Maintenance", slug: "pool_maintenance" },
        { name: "Pet Sitter", slug: "pet_sitter" },
        { name: "Nanny", slug: "nanny" },
        { name: "Plumber", slug: "plumber" },
        { name: "Electrician", slug: "electrician" },
        { name: "House Painter", slug: "house_painter" },
        { name: "Appliance Technician", slug: "appliance_technician" },
      ],
    },
    {
      name: "Personal Wellness Consulting",
      slug: "personal_wellness_consulting",
      occupations: [
        { name: "Life Coach", slug: "life_coach" },
        { name: "Relationship Coach", slug: "relationship_coach" },
        { name: "Holistic Therapist", slug: "holistic_therapist" },
        { name: "Style Consultant", slug: "style_consultant" },
        {
          name: "Personal Image Consultant",
          slug: "personal_image_consultant",
        },
        { name: "Astrologer", slug: "astrologer" },
        { name: "Tarot Reader", slug: "tarot_reader" },
        { name: "Motivational Speaker", slug: "motivational_speaker" },
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
      name: "In Person",
      slug: "in_person",
    },
    {
      name: "Online",
      slug: "online",
    },
    {
      name: "In Person and Online",
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
      name: "Amelia Smith",
      email: "amelia.smith@example.com",
      phone: "(416) 123-4567",
      image: "https://randomuser.me/api/portraits/women/21.jpg",
      birth: "1985-05-20",
      gender: "feminine",
      address: "Toronto, Ontario",
      role: "professional",
    },
    {
      name: "Liam Brown",
      email: "liam.brown@example.com",
      phone: "(604) 234-5678",
      image: "https://randomuser.me/api/portraits/men/21.jpg",
      birth: "1991-10-14",
      gender: "masculine",
      address: "Vancouver, British Columbia",
      role: "professional",
    },
    {
      name: "Olivia Johnson",
      email: "olivia.johnson@example.com",
      phone: "(403) 345-6789",
      image: "https://randomuser.me/api/portraits/women/22.jpg",
      birth: "1988-02-11",
      gender: "feminine",
      address: "Calgary, Alberta",
      role: "professional",
    },
    {
      name: "Noah Wilson",
      email: "noah.wilson@example.com",
      phone: "(613) 456-7890",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      birth: "1983-12-25",
      gender: "masculine",
      address: "Ottawa, Ontario",
      role: "professional",
    },
    {
      name: "Sophia White",
      email: "sophia.white@example.com",
      phone: "(902) 567-8901",
      image: "https://randomuser.me/api/portraits/women/23.jpg",
      birth: "1995-07-30",
      gender: "feminine",
      address: "Halifax, Nova Scotia",
      role: "professional",
    },
    {
      name: "James Taylor",
      email: "james.taylor@example.com",
      phone: "(450) 678-9012",
      image: "https://randomuser.me/api/portraits/men/23.jpg",
      birth: "1990-09-05",
      gender: "masculine",
      address: "Montreal, Quebec",
      role: "professional",
    },
    {
      name: "Emma Anderson",
      email: "emma.anderson@example.com",
      phone: "(306) 789-0123",
      image: "https://randomuser.me/api/portraits/women/24.jpg",
      birth: "1992-11-19",
      gender: "feminine",
      address: "Saskatoon, Saskatchewan",
      role: "professional",
    },
    {
      name: "Ethan King",
      email: "ethan.king@example.com",
      phone: "(705) 890-1234",
      image: "https://randomuser.me/api/portraits/men/24.jpg",
      birth: "1989-06-17",
      gender: "masculine",
      address: "Sudbury, Ontario",
      role: "professional",
    },
    {
      name: "Charlotte Lee",
      email: "charlotte.lee@example.com",
      phone: "(514) 901-2345",
      image: "https://randomuser.me/api/portraits/women/25.jpg",
      birth: "1993-03-29",
      gender: "feminine",
      address: "Quebec City, Quebec",
      role: "professional",
    },
    {
      name: "Benjamin Harris",
      email: "benjamin.harris@example.com",
      phone: "(780) 012-3456",
      image: "https://randomuser.me/api/portraits/men/25.jpg",
      birth: "1986-04-08",
      gender: "masculine",
      address: "Edmonton, Alberta",
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
      let formattedValue = `$${value.replace(".", ",")}`;

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
    "Pending approval",
    "In progress",
    "Canceled",
    "No show",
    "Completed",
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
      name: "Vacation",
      description: "Scheduled and paid absence for rest and leisure.",
    },
    {
      id: 2,
      name: "Medical Leave",
      description:
        "Absence due to health issues, usually with a medical certificate.",
    },
    {
      id: 3,
      name: "Parental Leave",
      description: "Time off after the birth or adoption of a child.",
    },
    {
      id: 4,
      name: "Unpaid Leave",
      description:
        "Permission to be absent from work without receiving a salary.",
    },
    {
      id: 5,
      name: "Sick Leave",
      description:
        "Extended absences due to chronic illnesses or health treatment.",
    },
    {
      id: 6,
      name: "Health Treatment Leave",
      description:
        "Focused on specific treatments, such as physical therapy or rehabilitation.",
    },
    {
      id: 7,
      name: "Security Leave",
      description: "Absence due to personal security concerns.",
    },
    {
      id: 8,
      name: "Study Leave",
      description: "Absence for taking courses or training programs.",
    },
    {
      id: 9,
      name: "Wedding Leave",
      description: "Absence to attend or perform wedding ceremonies.",
    },
    {
      id: 10,
      name: "Family Leave",
      description: "To care for family members who need assistance.",
    },
    {
      id: 11,
      name: "Legal Leave",
      description:
        "When the professional needs to be absent due to legal obligations.",
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
