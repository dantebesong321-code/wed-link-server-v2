import { PrismaClient } from "@prisma/client";
import "dotenv/config"

const prisma = new PrismaClient({});

async function main() {

  const photography = await prisma.category.create({
    data: {
      name: "Photography"
    }
  });

 
 await prisma.vendor.create({
  data: {
    name: "Sarah Lee",
    businessName:
      "Sarah Wedding Photography",
    description:
      "Luxury wedding photographer.",
    email:
      "sarah@example.com",
    phone:
      "+1 555 123 4567",
    website:
      "https://sarahweddingphoto.com",
    address:
      "123 Michigan Avenue",
    city:
      "Chicago",
    country:
      "USA",

    latitude:
      41.8781,

    longitude:
      -87.6298,

    imageUrl:
      "https://res.cloudinary.com/demo/image/upload/main.jpg",

    galleryUrls: [
      "https://res.cloudinary.com/demo/image/upload/1.jpg",
      "https://res.cloudinary.com/demo/image/upload/2.jpg"
    ],

    services: [
      "Wedding Photography",
      "Engagement Shoots"
    ],

    priceRange: "$$$",

    categoryId: photography.id
  }
});
}

main();