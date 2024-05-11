import express from 'express';
import booksController from '../controllers/books.controller.js';
import isAdmin from '../middlewares/admin.middleware.js';

const router = express.Router();


/**
 * @openapi
 * tags:
 *    name: Books
 * 
 * /api/books:
 *    get:
 *       summary: Get list of Books
 *       tags: [Books]
 *       responses:
 *          200:
 *             description: List of Books
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/GetBooksResponse'
 *          401:
 *             description: Unauthorized
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         status:
 *                            type: string
 *                            default: 'fail'
 *                         message:
 *                            type: string
 *                            default: 'Unauthorized'
 *          500:
 *             description: Internal Server Error
 */
router.get('/', booksController.getAllBook);


/**
 * @openapi
 * /api/books/{id}:
 *   get:
 *    summary: Get book by id
 *    tags: [Books]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: integer
 *    responses:
 *      200:
 *       description: Book Data
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/GetBookByIdResponse'
 *      404:
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
 */
router.get('/:id', booksController.getBookById);


/**
 * @openapi
 * /api/books:
 *    post:
 *       summary: Create new book data
 *       tags: [Books]
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema: 
 *                  $ref: '#/components/schemas/CreateBookInput'
 *       responses:
 *          201:
 *             description: Book Created
 *             content: 
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/CreateBookResponse'
 *          401:
 *             description: Unauthorized
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         status:
 *                            type: string
 *                            default: 'fail'
 *                         message:
 *                            type: string
 *                         data:
 *                            type: object
 *                            
 */
router.post('/', isAdmin, booksController.createBook);


/**
 * @openapi
 * /api/books/{id}:
 *   put:
 *     summary: Update book data
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 default: "Test"
 *               stock:
 *                 type: string
 *                 default: 1
 *               author:
 *                 type: string
 *                 default: "test"
 *     responses:
 *       200:
 *         description: Success update book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/GetBookByIdResponse'
 *       404:
 *         description: book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   default: 'fail'
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.put('/:id', isAdmin, booksController.updateBook);


/**
 * @openapi
 * /api/books/{id}:
 *   delete:
 *     summary: Delete book by id
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       204:
 *         description: Success to delete book data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   default: 'success'
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   default: 'fail'
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.delete('/:id', isAdmin, booksController.deleteBookById);

export default router;