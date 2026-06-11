import express from "express";
import cors from "cors";

import vendorRoutes from "./routes/vendorRoutes.ts";
import categoryRoutes from "./routes/categoryRoutes.ts";



const app = express();

app.use(cors());

app.use(express.json());


// ROUTES

// Vendors
app.use("/api/vendors", vendorRoutes);



// Categories
app.use("/api/categories", categoryRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});
export default app;