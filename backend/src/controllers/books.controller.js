import db from '../models/index.js';
import CodeGenerator from 'node-code-generator';

const getAllBook = (req, res) => {
   db.models.Book.findAll({
      where: {
         stock: {
            [Op.not]: null
         }
      }
   })
      .then(result => {
         res.status(200).send({
            status: 'success',
            message: 'Books Data',
            data: result
         })
      }).catch(err => {
         res.status(500).send({
            status: 'fail',
            message: err.message,
            data: []
         })
      });
}

const getBookById = (req, res) => {
   const id = req.params.id;

   db.models.Book.findOne({
      where: {
         id: id
      }
   }).then(result => {
      if (!result) {
         res.status(404).send({
            status: 'fail',
            message: 'Book not found',
            data: []
         });
         return;
      }

      res.status(200).send({
         status: 'success',
         message: 'User Data',
         data: result,
      })
   }).catch(err => {
      res.status(500).send({
         status: 'fail',
         message: err.message,
         data: []
      })
   })
}

const createBook = (req, res) => {
   const validated = validate(req);

   if (!validated.status) {
      res.status(400).send({
         status: 'fail',
         message: validated.message,
         data: validated
      });
      return;
   }

   const generator = new CodeGenerator();

   const { author, title, stock } = validated.data;

   const code = generator.generateCodes('*****###', 1)[0];

   db.models.Book.create({
      title: title,
      author: author,
      stock: stock,
      code: code,
   }).then(result => {
      res.status(201).send({
         status: 'success',
         message: 'Success to save book',
         data: result,
      });
   }).catch(err => {
      res.status(500).send({
         status: 'success',
         message: err.message,
         data: []
      });
   });
}

const updateBook = (req, res) => {
   const id = req.params.id;

   if (!id) {
      res.status(400).send({
         status: 'fail',
         message: 'Validation failed!, id must provided',
         data: []
      })
      return;
   }

   const book = db.models.Book.findOne({
      where: {
         id: id,
      }
   })

   if (!book) {
      res.status(404).send({
         status: 'fail',
         message: 'Book not found',
         data: [],
      });
      return;
   }

   const { author, title, stock } = req.body;

   db.models.Book.update({
      author: author,
      title: title,
      stock: stock,
   }, {
      where: {
         id: id
      }
   }).then(result => {
      res.status(200).send({
         status: 'success',
         message: 'Success to update book',
         data: book,
      });
   }).catch(err => {
      res.status(500).send({
         status: 'fail',
         message: err.message,
         data: []
      })
   })
}

const deleteBookById = (req, res) => {
   const id = req.params.id;

   if (!id) {
      res.status(400).send({
         status: 'fail',
         message: 'Validation failed!, id must provided',
         data: []
      })
      return;
   }

   const book = db.models.Book.findOne({
      where: {
         id: id
      }
   });

   if (!book) {
      res.status(404).send({
         status: 'fail',
         message: 'Book not found',
         data: [],
      });
      return;
   }

   db.models.Book.destroy({
      where: {
         id: id
      }
   }).then(result => {
      res.status(204).send({
         status: 'success',
         message: 'Success to delete book!',
         data: result,
      });
   }).catch(err => {
      res.status(500).send({
         status: 'fail',
         message: err.message,
         data: []
      })
   })
}

const validate = (req) => {
   const body = req.body;

   if (!body.author) {
      return {
         status: false,
         message: 'Validation error!, author is required',
         data: body
      }
   }

   if (!body.title) {
      return {
         status: false,
         message: 'Validation error!, title is required',
         data: body
      }
   }

   if (!body.stock) {
      return {
         status: false,
         message: 'Validation error!, body is required',
         data: body,
      }
   }

   return {
      status: true,
      data: body
   }
}

export default { getAllBook, getBookById, createBook, updateBook, deleteBookById };