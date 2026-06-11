import { Router } from "express";
import {prisma } from "../../client/prisma.client.ts";

const router = Router();


//GET All categories
router.get("/", async (req, res) => {

  try {
  const categories = await prisma.category.findMany({
    include: {
        vendors: true,
      },
  });

  console.log("Business categories right here!")
  return res.status(200).json(categories)
  } catch (error){ 
    console.log(error)

    return res.status(500).json({
      message: "Failed to fetch categories",
    });
  }
});


//CREATE category

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    return res.status(201).json(category);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create category",
    });
  }
});


//GET Single category
router.get("/:id", async (req, res) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: req.params.id },
      include: {
        vendors: true,
      },
    })
    console.log("Single category right here!", category)

      if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch category",
    });
  }
});



/*
UPDATE category
*/
router.put("/:id", async (req, res) => {
     console.log("body:", req.body);
  try {
    const { name } = req.body;
   

    const category = await prisma.category.update({
      where: {
        id: req.params.id,
      },
      data: {
        name,
      },
    });

    return res.status(200).json(category);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update category",
    });
  }
});

/*
DELETE category
*/
router.delete("/:id", async (req, res) => {
  try {
    await prisma.category.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      message: "Category deleted",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete category",
    });
  }
});


export default router;