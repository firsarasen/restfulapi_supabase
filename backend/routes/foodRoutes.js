import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
} from "../controllers/foodController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Foods
 *   description: Food Inventory Management
 */

/**
 * @swagger
 * /api/foods:
 *   get:
 *     summary: Get All Foods
 *     tags: [Foods]
 */
router.get("/", authMiddleware, getFoods);

/**
 * @swagger
 * /api/foods/{id}:
 *   get:
 *     summary: Get Food By ID
 *     tags: [Foods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/:id", authMiddleware, getFoodById);

/**
 * @swagger
 * /api/foods:
 *   post:
 *     summary: Add New Food
 *     tags: [Foods]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category_id
 *               - stock
 *               - unit
 *             properties:
 *               name:
 *                 type: string
 *                 example: Beras
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               stock:
 *                 type: integer
 *                 example: 25
 *               unit:
 *                 type: string
 *                 example: Kg
 *               expired_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-12-31"
 *               description:
 *                 type: string
 *                 example: Beras Premium
 *     responses:
 *       201:
 *         description: Food created successfully
 */
router.post("/", authMiddleware, createFood);

/**
 * @swagger
 * /api/foods/{id}:
 *   put:
 *     summary: Update Food
 *     tags: [Foods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Beras
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               stock:
 *                 type: integer
 *                 example: 50
 *               unit:
 *                 type: string
 *                 example: Kg
 *               expired_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-12-31"
 *               description:
 *                 type: string
 *                 example: Beras Premium Super
 *     responses:
 *       200:
 *         description: Food updated successfully
 */
router.put("/:id", authMiddleware, updateFood);

/**
 * @swagger
 * /api/foods/{id}:
 *   delete:
 *     summary: Delete Food
 *     tags: [Foods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.delete("/:id", authMiddleware, deleteFood);

export default router;