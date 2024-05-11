import express from 'express';
import borrowBookController from '../controllers/borrowBook.controller.js';

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Borrow Book
 * 
 * /api/borrow-book:
 *   post:
 *    summary: Borrow a book
 *    tags: [Borrow Book]
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             book_id:
 *               type: integer
 *    responses:
 *     201:
 *       description: Book Borrowed
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 default: 'success'
 *               message:
 *                 type: string
 *               data:
 *                 type: object
 *                 properties:
 *                   book_id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   borrowed_at:
 *                     type: string
 *                   deadline:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   returned_at:
 *                     type: string
 *     403:
 *       description: Failed to borrow book
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 default: 'fail'
 *               message:
 *                 type: string
 *               data:
 *                 type: object
 *     404:
 *       description: Book not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 default: 'fail'
 *               message:
 *                 type: string
 *               data:
 *                 type: object
 * 
 */
router.post('/', borrowBookController.borrowBook);

/**
 * @openapi
 * /api/borrow-book/return:
 *   post:
 *    summary: Return book that have been borrowed
 *    tags: [Borrow Book]
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         book_id:
 *          type: string
 *    responses:
 *     200:
 *       description: Success to return book
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *           status:
 *            type: string
 *            default: 'success'
 *           message:
 *            type: string
 *           data:
 *            type: object
 */
router.post('/return', borrowBookController.returnBook);

export default router;