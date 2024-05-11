import sequelize from "../utils/database.js";
import book from "./books.js";
import borrowedBook from "./borrowed_books.js";
import user from "./users.js";

const User = sequelize.define('User', user, {
   tableName: 'users',
   paranoid: true,
   timestamps: true,
});

const Book = sequelize.define('Book', book, {
   tableName: 'books',
   paranoid: true,
   timestamps: true,
});

const BorrowedBook = sequelize.define('BorrowedBook', borrowedBook, {
   tableName: 'borrowed_book',
   timestamps: true,
});

BorrowedBook.belongsTo(User, {
   as: 'user',
   foreignKey: 'user_id',
   onUpdate: 'CASCADE',
   onDelete: 'RESTRICT'
});

User.hasMany(BorrowedBook, {
   as: 'borrowedBook',
   foreignKey: 'user_id',
   onUpdate: 'CASCADE',
   onDelete: 'RESTRICT'
});

BorrowedBook.belongsTo(Book, {
   as: 'book',
   foreignKey: 'book_id',
   onUpdate: 'CASCADE',
   onDelete: 'RESTRICT'
});

Book.hasMany(BorrowedBook, {
   as: 'borrowedBook',
   foreignKey: 'book_id',
   onUpdate: 'CASCADE',
   onDelete: 'RESTRICT'
})

sequelize.sync({alter: true});

export default sequelize;