import { Router } from "express";
import {prisma } from "../../client/prisma.client.ts";

const router = Router();

/*
GET ALL
*/
router.get("/", async (req, res) => {
  try {
    const vendors = await prisma.vendor.findMany({
      include: {
        category: true,
      },
    });

    return res.status(200).json(vendors);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch vendors",
    });
  }
});

/*
GET ONE
*/
router.get("/:id", async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        category: true,
      },
    });

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    return res.status(200).json(vendor);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch vendor",
    });
  }
});

/*
CREATE
*/
router.post("/", async (req, res) => {
  try {
    const {
      name,
      businessName,
      description,
      email,
      phone,
      website,
      address,
      city,
      country,
      latitude,
      longitude,
      imageUrl,
      galleryUrls,
      services,
      priceRange,
      categoryId,
    } = req.body;

    const vendor = await prisma.vendor.create({
      data: {
       name,
        businessName,
        description,
        email,
        phone,
        website,
        address,
        city,
        country,
        latitude,
        longitude,
        imageUrl,
        galleryUrls,
        services,
        priceRange,
        categoryId,
      },
    });

    return res.status(201).json(vendor);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to create vendor",
    });
  }
});

/*
UPDATE
*/
router.put("/:id", async (req, res) => {
  try {
    const {
      name,
      businessName,
      description,
      email,
      phone,
      website,
      address,
      city,
      country,
      imageUrl,
      galleryUrls,
      services,
      priceRange,
      latitude,
      longitude,
      categoryId,
    } = req.body;

    const vendor = await prisma.vendor.update({
      where: {
        id: req.params.id,
      },

      data: {
        name,
        businessName,
        description,
        email,
        phone,
        website,
        address,
        city,
        country,
        imageUrl,
        galleryUrls,
        services,
        priceRange,
        latitude,
        longitude,
        categoryId,
      },
    });

    res.status(200).json(vendor);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update vendor",
    });
  }
});

/*
DELETE
*/
router.delete("/:id", async (req, res) => {
  try {
    await prisma.vendor.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      message: "Vendor deleted",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete vendor",
    });
  }
});

router.get("/", async (req, res) => {
  const search = req.query.search as string;

  const vendors = await prisma.vendor.findMany({
    where: {
      businessName: {
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });

  res.json(vendors);
});




export default router;