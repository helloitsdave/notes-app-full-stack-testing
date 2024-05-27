import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seed = [
  {
    title: 'Meeting Notes',
    content: 'Discussed project timelines and goals.',
    createdAt: '2024-02-05T23:33:42.252Z',
    updatedAt: '2024-02-05T23:33:42.252Z',
    userID: 'ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272',
    id: '328baf25-3cb5-46a8-a66e-d86ac9bd46d5',
  },
  {
    title: 'Different User - scoping check',
    content: 'Should not see this note with Test User',
    createdAt: '2024-02-05T23:33:42.253Z',
    updatedAt: '2024-02-05T23:33:42.253Z',
    userID: 'dcf89a7e-b941-4f17-bbe0-4e0c8b2cd272',
    id: '7b981062-92dc-40a5-b7e2-bda7fc9d5cd2',
  },
  {
    title: 'Recipe',
    content: 'Ingredients: Chicken, tomatoes, onions, garlic.',
    createdAt: '2024-02-05T23:33:42.254Z',
    updatedAt: '2024-02-05T23:33:42.254Z',
    userID: 'ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272',
    id: 'a37f39bc-9e4f-45f2-b1d6-fe668bba2b55',
  },
  {
    title: 'Ideas',
    content: 'Brainstorming ideas for the next feature release. 🚀',
    createdAt: '2024-02-05T23:33:42.255Z',
    updatedAt: '2024-02-05T23:33:42.255Z',
    userID: 'ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272',
    id: '1e69b2a9-15dd-4d59-872a-b6830d0a2f92',
  },
  {
    title: 'Personal Goals',
    content: 'Exercise for 30 minutes daily. Read a book every week.',
    createdAt: '2024-02-05T23:33:42.256Z',
    updatedAt: '2024-02-05T23:33:42.256Z',
    userID: 'ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272',
    id: 'dd05d471-3f71-4616-8372-a399f496cb39',
  },
  {
    title: "Fête d'anniversaire",
    content: "Préparer une surprise pour la fête d'anniversaire.",
    createdAt: '2024-02-05T23:33:42.257Z',
    updatedAt: '2024-02-05T23:33:42.257Z',
    userID: 'ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272',
    id: '13ee0bfc-5510-43d7-b58b-d714a1f26aea',
  },
  {
    title: '日本旅行',
    content: '計画: 東京、京都、大阪を訪れる。',
    createdAt: '2024-02-05T23:33:42.258Z',
    updatedAt: '2024-02-05T23:33:42.258Z',
    userID: 'ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272',
    id: '75e5e48d-4ea8-4609-8b57-732eea9b628e',
  },
  {
    title: 'Семейный ужин',
    content: 'Приготовить вкусный ужин для всей семьи.',
    createdAt: '2024-02-05T23:33:42.259Z',
    updatedAt: '2024-02-05T23:33:42.259Z',
    userID: 'ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272',
    id: 'a9392144-54c0-44a4-8f51-1dd06ebfe5d5',
  },
  {
    title: 'Coding Project',
    content: 'Implement new features using React and Express.',
    createdAt: '2024-02-05T23:33:42.260Z',
    updatedAt: '2024-02-05T23:33:42.260Z',
    userID: 'ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272',
    id: 'dcbdc92f-f04c-4a84-8631-57e1943acfc7',
  },
];

async function main() {
  // Seed user data
  await prisma.user.createMany({
    data: [
      {
        id: 'ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272',
        email: 'helloitsdave@hotmail.com',
        password:
          '$2y$10$12dKPJq7kynM4JnI.X.l6evnYqC7zFWHcAGNU4efLbtcS0ndHD23.', // n0te$App!23
        username: 'Test User',
        createdAt: '2024-02-05T23:33:42.260Z',
        updatedAt: '2024-02-05T23:33:42.260Z',
      },
      {
        id: 'dcf89a7e-b941-4f17-bbe0-4e0c8b2cd272',
        email: 'testing@anemailtest.com',
        password:
          '$2y$10$U1Py3XYLbDjYC5fmktUWG.JGIfaTwu0wxdFxNKg7vFrzCuywopFYq', // test
        username: 'dave',
        createdAt: '2024-02-05T23:34:42.260Z',
        updatedAt: '2024-02-05T23:34:42.260Z',
      },
    ],
  });

  // Seed note data
  await prisma.note.createMany({
    data: seed,
  });
}

main()
  .catch((e) => {
    console.error(e);
    // process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
