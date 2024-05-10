import { DataTypes } from "sequelize";
import sequelize from "../utils/database.js";
import User from "./users.js";
import Book from "./books.js";

const BorrowedBook = {
   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
   },
   book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   borrowed_at: {
      type: DataTypes.DATE,
      allowNull: false,
   },
   deadline: {
      type: DataTypes.DATEONLY,
      allowNull: false,
   },
   returned_at: {
      type: DataTypes.DATE
   }
};


export default BorrowedBook;