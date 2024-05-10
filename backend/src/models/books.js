import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';
import BorrowedBook from './borrowed_books.js';


/**
 * @openapi
 * components:
 *  schemas:
 *    CreateBookInput:
 *      type: object
 *      required:
 *        - author
 *        - title
 *        - stock
 *      properties:
 *        author:
 *          type: string
 *          default: Test
 *        title:
 *          type: string
 *          default: Buku Test
 *        stock:
 *          type: integer
 *          default: 1
 *    CreateBookResponse:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        message:
 *          type: string
 *        data:
 *          type: object
 *          properties:
 *            _id:
 *              type: integer
 *            title:
 *              type: string
 *            author:
 *              type: string
 *            code:
 *              type: string
 *            stock:
 *              type: integer
 *            created_at:
 *              type: string
 *            updated_at:
 *              type: string
 *    GetBooksResponse:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *          default: 'success'
 *        message:
 *          type: string
 *        data:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              _id:
 *                type: integer
 *              title:
 *                type: string
 *              author:
 *                type: string
 *              code:
 *                type: string
 *              stock:
 *                type: integer
 *              created_at:
 *                type: string
 *              updated_at:
 *                type: string
 *    GetBookByIdResponse:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *          default: 'success'
 *        message:
 *          type: string
 *        data:
 *          type: object
 *          properties:
 *            _id:
 *              type: integer
 *            title:
 *              type: string
 *            author:
 *              type: string
 *            code:
 *              type: string
 *            stock:
 *              type: integer
 *            created_at:
 *              type: string
 *            updated_at:
 *              type: string
 */

const Book = {
   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
   },
   author: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
   },
   title: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
   }
};

export default Book;