import db from '../models/index.js';
import { Op } from 'sequelize';

const borrowBook = async (req, res) => {
   const { book_id } = req.body

   if (!book_id) {
      res.status(400).send({
         status: 'fail',
         message: 'Validation failed! book id must be provided',
         data: []
      });
      return
   }

   const user = req.user;

   if (user.penalty) {
      res.status(403).send({
         status: 'fail',
         message: 'User currently in penalty',
         data: []
      });
   }

   const borrowedBook = await db.models.BorrowedBook.count({
      where: {
         user_id: user.id,
         returned_at: {
            [Op.is]: null
         }
      }
   })

   if (borrowedBook > 2) {
      res.status(403).send({
         status: 'fail',
         message: 'User has borrowed 2 books!',
         data: []
      });
   }

   const book = await db.models.Book.findOne({
      where: {
         id: book_id
      },
      include: 'borrowedBook'
   })

   if (!book) {
      res.status(404).send({
         status: 'fail',
         message: 'Book not found',
         data: []
      })
      return;
   }

   if (book.stock <= 0) {
      res.status(403).send({
         status: 'fail',
         message: 'Book is not available',
         data: []
      })
      return;
   }

   const date = new Date()
   const deadline = new Date(new Date().setDate(new Date().getDate() + 7));


   db.models.BorrowedBook.create({
      book_id: book_id,
      user_id: user.id,
      borrowed_at: date.toISOString(),
      deadline: deadline,
   }).then(borrowResult => {
      db.models.Book.update(
         {
            stock: book.stock - 1
         },
         {
            where: {
               id: book_id
            }
         }
      ).then(stockResult => {
         res.status(201).send({
            status: 'success',
            message: 'Success borrowed book!',
            data: borrowResult
         });
      });
   }).catch(err => {
      res.status(500).send({
         status: 'fail',
         message: err.message,
         data: [],
      });
   })
}

const returnBook = async (req, res) => {
   const user = req.user;
   const { book_id } = req.body;
   const borrowedBook = await db.models.BorrowedBook.findOne({
      where: {
         user_id: user.id,
         book_id: book_id,
         returned_at: {
            [Op.is]: null
         }
      },
   });

   if (!borrowedBook) {
      res.status(404).send({
         status: 'fail',
         message: 'You are not borrowed this book',
         data: []
      });
   }

   const status = new Date(borrowedBook.deadline) < new Date();
   let penalty = false;
   let penalty_end = null;

   if (status) {
      penalty = true;
      penalty_end = new Date(new Date().setDate(new Date().getDate() + 3));
   }

   const book = await db.models.Book.findOne({
      where: {
         id: book_id
      }
   });

   db.models.BorrowedBook.update(
      {
         returned_at: new Date(),
         penalty: penalty,
         penalty_end: penalty_end,
      },
      {
         where: {
            id: borrowedBook.id
         }
      }
   ).then(result => {
      db.models.Book.update(
         {
            stock: book.stock + 1
         },
         {
            where: {
               id: book.id
            }
         }
      ).then(updateBookResult => {
         res.status(200).send({
            status: 'success',
            message: 'Book is returned!' + (status ? 'The return is past due, you cannot borrow books for the next three days' : ''),
            data: borrowedBook,
         });
      });
   }).catch(err => {
      res.status(500).send({
         status: 'fail',
         message: err.message,
         data: []
      })
   })


}

export default { borrowBook, returnBook };