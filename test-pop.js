const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const pop = await prisma.populationStatistic.findMany();
  console.log("PopulationStatistic:", pop);
  const res = await prisma.resident.count();
  console.log("Resident count:", res);
}

main().finally(() => prisma.$disconnect());
