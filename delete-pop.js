const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.populationStatistic.deleteMany();
  console.log("Deleted dummy data:", result.count);
}

main().finally(() => prisma.$disconnect());
