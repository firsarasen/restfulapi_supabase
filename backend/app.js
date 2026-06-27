import express from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";

import errorHandler from "./middleware/errorHandler.js";

const app = express();

/* ==========================
   Middlewares
========================== */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/* ==========================
   Home Route
========================== */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🥬 FoodStock RESTful API",
    version: "1.0.0",
  });
});

/* ==========================
   API Routes
========================== */

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/foods", foodRoutes);

/* ==========================
   Swagger
========================== */

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: `
      .swagger-ui .topbar {
        display: none !important;
      }
    `,
    customSiteTitle: "Food Inventory API"
  })
);

/* ==========================
   404 Handler
========================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

/* ==========================
   Error Handler
========================== */

app.use(errorHandler);

export default app;