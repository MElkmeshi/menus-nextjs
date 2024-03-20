import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start testing ...`);

  const resturants = await prisma.products.findMany({
    take: 6,
    where: {
      restaurant: "65e8a596487f447d5fc7e336",
    },
    skip: (1 - 1) * 6,
  });

  console.log(resturants);

  console.log(`testing finished.`);
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
