import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seed = [
  {
    id: 1,
    "title": "Meeting Notes",
    "content": "Discussed project timelines and goals."
  },
  {
    id: 2,
    "title": "Shopping List",
    "content": "Milk, eggs, bread, and fruits."
  },
  {
    id: 3,
    "title": "Recipe",
    "content": "Ingredients: Chicken, tomatoes, onions, garlic."
  },
  {
    id: 4,
    "title": "Ideas",
    "content": "Brainstorming ideas for the next feature release. 🚀"
  },
  {
    id: 5,
    "title": "Personal Goals",
    "content": "Exercise for 30 minutes daily. Read a book every week."
  },
  {
    id: 6,
    "title": "Fête d'anniversaire",
    "content": "Préparer une surprise pour la fête d'anniversaire."
  },
  {
    id: 7,
    "title": "日本旅行",
    "content": "計画: 東京、京都、大阪を訪れる。"
  },
  {
    id: 8,
    "title": "Семейный ужин",
    "content": "Приготовить вкусный ужин для всей семьи."
  },
  {
    id: 9,
    "title": "Coding Project",
    "content": "Implement new features using React and Express."
  }
];

async function main() {
    // Seed data here
    await prisma.note.createMany({
        data: seed,
    });

    // Add more data as needed...
}

main()
    .catch((e) => {
        console.error(e);
        // process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
