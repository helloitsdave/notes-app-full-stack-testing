import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seed = [
  {
    "title": "Meeting Notes",
    "content": "Discussed project timelines and goals."
  },
  {
    "title": "Shopping List",
    "content": "Milk, eggs, bread, and fruits."
  },
  {
    "title": "Recipe",
    "content": "Ingredients: Chicken, tomatoes, onions, garlic."
  },
  {
    "title": "Ideas",
    "content": "Brainstorming ideas for the next feature release. 🚀"
  },
  {
    "title": "Personal Goals",
    "content": "Exercise for 30 minutes daily. Read a book every week."
  },
  {
    "title": "Fête d'anniversaire",
    "content": "Préparer une surprise pour la fête d'anniversaire."
  },
  {
    "title": "日本旅行",
    "content": "計画: 東京、京都、大阪を訪れる。"
  },
  {
    "title": "Семейный ужин",
    "content": "Приготовить вкусный ужин для всей семьи."
  },
  {
    "title": "Coding Project",
    "content": "Implement new features using React and Express."
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
