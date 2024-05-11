import express from 'express';
import usersController from '../controllers/users.controller.js';
import isAdmin from '../middlewares/admin.middleware.js';

const router = express.Router();


/**
 * @openapi
 * tags:
 *    name: Users
 * 
 * /api/users:
 *    get:
 *       summary: Get list of Users
 *       tags: [Users]
 *       responses:
 *          200:
 *             description: List of users
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/GetUserResponse'
 *                            
 *                               
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
router.get('/', isAdmin, usersController.getAllUsers);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *    summary: Get user by id
 *    tags: [Users]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: integer
 *    responses:
 *      200:
 *       description: User Data
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/GetUserByIdResponse'
 *      404:
 *       description: User not found
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
router.get('/:id', usersController.getUserById);

/**
 * @openapi
 * /api/users:
 *    post:
 *       summary: Create new user data
 *       tags: [Users]
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema: 
 *                  $ref: '#/components/schemas/CreateUserInput'
 *       responses:
 *          201:
 *             description: User Created
 *             content: 
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/CreateUserResponse'
 *          409:
 *             description: Conflicted
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
router.post('/', isAdmin, usersController.saveUser);

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     summary: Update data user
 *     tags: [Users]
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
 *               name:
 *                 type: string
 *                 default: "Test"
 *     responses:
 *       200:
 *         description: Success update user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/GetUserByIdResponse'
 *       404:
 *         description: User not found
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
router.put('/:id', usersController.updateUser);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user by id
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       204:
 *         description: Success to delete user data
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
 *         description: User not found
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
router.delete('/:id', isAdmin, usersController.deleteUserByID);

export default router;