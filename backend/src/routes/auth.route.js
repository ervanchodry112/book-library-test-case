import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();


/**
 * @openapi
 * tags:
 *   name: Authentication
 * 
 * 
 * /api/auth:
 *   post:
 *     summary: Get JWT Token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentication success!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     name:
 *                       type: string
 *                     code:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                     updated_at:
 *                       type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Authentication failed!
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  default: 'fail'
 *                message:
 *                  type: string
 *                data:
 *                  type: object
 *                
 */
router.post('/', authController.login);

export default router;