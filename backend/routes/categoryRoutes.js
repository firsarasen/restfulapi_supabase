import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category Management
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get All Categories
 *     tags: [Categories]
 */
router.get("/", authMiddleware, getCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get Category By ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/:id", authMiddleware, getCategoryById);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create Category
 *     tags: [Categories]
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Karbohidrat
 *     responses:
 *       201:
 *         description: Category created successfully
 */
router.post("/", authMiddleware, createCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update Category
 *     tags: [Categories]
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
 *                 example: Minuman
 *     responses:
 *       200:
 *         description: Category updated successfully
 */
router.put("/:id", authMiddleware, updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete Category
 *     tags: [Categories]
 */
router.delete("/:id", authMiddleware, deleteCategory);

export default router;