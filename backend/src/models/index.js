import sequelize from "../utils/database.js";
import book from "./books.js";
import borrowedBook from "./borrowed_books.js";
import user from "./users.js";
import bcrypt from 'bcrypt';

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

User.afterSync('seeds', async () => {
   User.findOrCreate(
      {
         where: {
            username: 'admin'
         },
         defaults: {

            username: 'admin',
            password: await bcrypt.hash('1234', Number(process.env.PASSWORD_SALT)),
            name: 'Administrator',
            code: 'admin',
            role: 'admin',
            code_number: 0
         }
      }
   ).then(result => {
      console.log('Success seeds administrator account');
   }).catch(err => {
      console.log(err.message);
   })
})

sequelize.sync({ alter: true });

export default sequelize;