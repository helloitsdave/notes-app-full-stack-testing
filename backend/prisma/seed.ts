import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seed = [
  {
    "title": "Meeting Notes",
    "content": "Discussed project timelines and goals.",
    "created_at": "2024-02-05T23:33:42.252Z",
    "updated_at": "2024-02-05T23:33:42.252Z",
  },
  {
    "title": "Shopping List",
    "content": "Milk, eggs, bread, and fruits.",
    "created_at": "2024-02-05T23:33:42.253Z",
    "updated_at": "2024-02-05T23:33:42.253Z",
  },
  {
    "title": "Recipe",
    "content": "Ingredients: Chicken, tomatoes, onions, garlic.",
    "created_at": "2024-02-05T23:33:42.254Z",
    "updated_at": "2024-02-05T23:33:42.254Z",
  },
  {
    "title": "Ideas",
    "content": "Brainstorming ideas for the next feature release. 🚀",
    "created_at": "2024-02-05T23:33:42.255Z",
    "updated_at": "2024-02-05T23:33:42.255Z",
  },
  {
    "title": "Personal Goals",
    "content": "Exercise for 30 minutes daily. Read a book every week.",
    "created_at": "2024-02-05T23:33:42.256Z",
    "updated_at": "2024-02-05T23:33:42.256Z",
  },
  {
    "title": "Fête d'anniversaire",
    "content": "Préparer une surprise pour la fête d'anniversaire.",
    "created_at": "2024-02-05T23:33:42.257Z",
    "updated_at": "2024-02-05T23:33:42.257Z",
  },
  {
    "title": "日本旅行",
    "content": "計画: 東京、京都、大阪を訪れる。",
    "created_at": "2024-02-05T23:33:42.258Z",
    "updated_at": "2024-02-05T23:33:42.258Z",
  },
  {
    "title": "Семейный ужин",
    "content": "Приготовить вкусный ужин для всей семьи.",
    "created_at": "2024-02-05T23:33:42.259Z",
    "updated_at": "2024-02-05T23:33:42.259Z",
  },
  {
    "title": "Coding Project",
    "content": "Implement new features using React and Express.",
    "created_at": "2024-02-05T23:33:42.260Z",
    "updated_at": "2024-02-05T23:33:42.260Z",
  }
];

async function main() {
    // Seed data here
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

