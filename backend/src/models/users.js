import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';
import BorrowedBook from './borrowed_books.js';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - username
 *        - password
 *        - name
 *      properties:
 *        username:
 *          type: string
 *          default: test
 *        password:
 *          type: string
 *          default: 1234
 *        name:
 *          type: string
 *          default: Test User
 *    CreateUserResponse:
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
 *            username:
 *              type: string
 *            name:
 *              type: string
 *            code:
 *              type: string
 *            created_at:
 *              type: string
 *            updated_at:
 *              type: string
 *    GetUserResponse:
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
 *              username:
 *                type: string
 *              name:
 *                type: string
 *              code:
 *                type: string
 *              borrowedBook:
 *                type: array
 *                items: 
 *                   type: object
 *              created_at:
 *                type: string
 *              updated_at:
 *                type: string
 *    GetUserByIdResponse:
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
 *            username:
 *              type: string
 *            name:
 *              type: string
 *            code:
 *              type: string
 *            borrowedBook:
 *              type: array
 *              items: 
 *                 type: object
 *            created_at:
 *              type: string
 *            updated_at:
 *              type: string
 */

const User = {
   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
   },
   username: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   password: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
   },
   penalty: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
   },
   role: {
      type: DataTypes.ENUM,
      values: ['admin', 'member'],
      defaultValue: 'member'
   }
};

export default User;