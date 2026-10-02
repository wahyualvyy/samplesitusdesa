const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const image1 = '/uploads/placeholder1.jpg';
  const image2 = '/uploads/placeholder2.jpg';
  const image3 = '/uploads/placeholder3.jpg';

  const randomImage = () => {
    const images = [image1, image2, image3];
    return images[Math.floor(Math.random() * images.length)];
  };

  // Update News
  const news = await prisma.news.findMany();
  for (const item of news) {
    if (item.image && item.image.startsWith('http')) {
      await prisma.news.update({ where: { id: item.id }, data: { image: randomImage() } });
    }
  }

  // Update Gallery
  const galleries = await prisma.galleryImage.findMany();
  for (const item of galleries) {
    if (item.imageUrl && item.imageUrl.startsWith('http')) {
      await prisma.galleryImage.update({ where: { id: item.id }, data: { imageUrl: randomImage() } });
    }
  }

  // Update UMKM
  const umkms = await prisma.uMKM.findMany();
  for (const item of umkms) {
    if (item.image && item.image.startsWith('http')) {
      await prisma.uMKM.update({ where: { id: item.id }, data: { image: randomImage() } });
    }
  }

  // Update Tourism
  const tourism = await prisma.tourism.findMany();
  for (const item of tourism) {
    if (item.image && item.image.startsWith('http')) {
      await prisma.tourism.update({ where: { id: item.id }, data: { image: randomImage() } });
    }
  }

  // Update VillageProfile
  const profile = await prisma.villageProfile.findFirst();
  if (profile && profile.sejarahImage && profile.sejarahImage.startsWith('http')) {
    await prisma.villageProfile.update({ where: { id: profile.id }, data: { sejarahImage: randomImage() } });
  }

  // Update VillageOfficial
  const officials = await prisma.villageOfficial.findMany();
  for (const item of officials) {
    if (item.image && item.image.startsWith('http')) {
      await prisma.villageOfficial.update({ where: { id: item.id }, data: { image: randomImage() } });
    }
  }

  // Update DevelopmentProject
  const projects = await prisma.developmentProject.findMany();
  for (const item of projects) {
    if (item.image && item.image.startsWith('http')) {
      await prisma.developmentProject.update({ where: { id: item.id }, data: { image: randomImage() } });
    }
  }

  console.log('Database images successfully updated to local uploads!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
