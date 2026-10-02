const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixImages() {
  // Fix UMKM
  const umkms = await prisma.uMKM.findMany();
  for (let i = 0; i < umkms.length; i++) {
    const umkm = umkms[i];
    if (umkm.image && umkm.image.includes('unsplash.com')) {
      await prisma.uMKM.update({
        where: { id: umkm.id },
        data: { image: `https://picsum.photos/seed/umkm${i}/400/400` }
      });
      console.log(`Updated UMKM ${umkm.name}`);
    }
  }

  // Fix Tourism
  const tourisms = await prisma.tourism.findMany();
  for (let i = 0; i < tourisms.length; i++) {
    const tourism = tourisms[i];
    if (tourism.image && tourism.image.includes('unsplash.com')) {
      await prisma.tourism.update({
        where: { id: tourism.id },
        data: { image: `https://picsum.photos/seed/wisata${i}/800/600` }
      });
      console.log(`Updated Tourism ${tourism.name}`);
    }
  }

  // Fix Village Official
  const officials = await prisma.villageOfficial.findMany();
  for (let i = 0; i < officials.length; i++) {
    const off = officials[i];
    if (off.image && off.image.includes('unsplash.com')) {
      await prisma.villageOfficial.update({
        where: { id: off.id },
        data: { image: `https://picsum.photos/seed/off${i}/256/256` }
      });
      console.log(`Updated Official ${off.name}`);
    }
  }

  // Fix Development Project
  const projects = await prisma.developmentProject.findMany();
  for (let i = 0; i < projects.length; i++) {
    const proj = projects[i];
    if (proj.image && proj.image.includes('unsplash.com')) {
      await prisma.developmentProject.update({
        where: { id: proj.id },
        data: { image: `https://picsum.photos/seed/proj${i}/800/600` }
      });
      console.log(`Updated Project ${proj.name}`);
    }
  }

  console.log("All broken unsplash images fixed!");
}

fixImages()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
