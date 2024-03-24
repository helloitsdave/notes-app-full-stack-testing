import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seed = [
  {
    "title": "Meeting Notes",
    "content": "Discussed project timelines and goals.",
    "createdAt": "2024-02-05T23:33:42.252Z",
    "updatedAt": "2024-02-05T23:33:42.252Z",
    "userID": "ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272"
  },
  {
    "title": "Different User - scoping check",
    "content": "Should not see this note with Test User",
    "createdAt": "2024-02-05T23:33:42.253Z",
    "updatedAt": "2024-02-05T23:33:42.253Z",
    "userID": "dcf89a7e-b941-4f17-bbe0-4e0c8b2cd272"
  },
  {
    "title": "Recipe",
    "content": "Ingredients: Chicken, tomatoes, onions, garlic.",
    "createdAt": "2024-02-05T23:33:42.254Z",
    "updatedAt": "2024-02-05T23:33:42.254Z",
    "userID": "ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272"
  },
  {
    "title": "Ideas",
    "content": "Brainstorming ideas for the next feature release. 🚀",
    "createdAt": "2024-02-05T23:33:42.255Z",
    "updatedAt": "2024-02-05T23:33:42.255Z",
    "userID": "ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272"
  },
  {
    "title": "Personal Goals",
    "content": "Exercise for 30 minutes daily. Read a book every week.",
    "createdAt": "2024-02-05T23:33:42.256Z",
    "updatedAt": "2024-02-05T23:33:42.256Z",
    "userID": "ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272"
  },
  {
    "title": "Fête d'anniversaire",
    "content": "Préparer une surprise pour la fête d'anniversaire.",
    "createdAt": "2024-02-05T23:33:42.257Z",
    "updatedAt": "2024-02-05T23:33:42.257Z",
    "userID": "ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272"
  },
  {
    "title": "日本旅行",
    "content": "計画: 東京、京都、大阪を訪れる。",
    "createdAt": "2024-02-05T23:33:42.258Z",
    "updatedAt": "2024-02-05T23:33:42.258Z",
    "userID": "ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272"
  },
  {
    "title": "Семейный ужин",
    "content": "Приготовить вкусный ужин для всей семьи.",
    "createdAt": "2024-02-05T23:33:42.259Z",
    "updatedAt": "2024-02-05T23:33:42.259Z",
    "userID": "ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272"
  },
  {
    "title": "Coding Project",
    "content": "Implement new features using React and Express.",
    "createdAt": "2024-02-05T23:33:42.260Z",
    "updatedAt": "2024-02-05T23:33:42.260Z",
    "userID": "ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272"
  }
];

async function main() {
    // Seed user data
    await prisma.user.createMany({
        data: [{
            id : 'ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272',
            email: 'helloitsdave@hotmail.com',
            password: 'n0te$App!23',
            username: 'Test User',
            createdAt: "2024-02-05T23:33:42.260Z",
            updatedAt: "2024-02-05T23:33:42.260Z",
        }, {
          id : 'dcf89a7e-b941-4f17-bbe0-4e0c8b2cd272',
          email: 'testing@anemailtest.com',
          password: 'test',
          username: 'dave',
          createdAt: "2024-02-05T23:34:42.260Z",
          updatedAt: "2024-02-05T23:34:42.260Z",
      }]
    });

    // Seed note data 
    await prisma.note.createMany({
        data: seed,
    });
    // Reset the auto-incrementing counter
   //  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('notes', 'id'), coalesce(max(id),0) + 1, false) FROM notes;`
}

main()
    .catch((e) => {
        console.error(e);
        // process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

