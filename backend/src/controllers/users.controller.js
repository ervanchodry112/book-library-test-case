import db from '../models/index.js';
import bcrypt from 'bcrypt';
import CodeGenerator from 'node-code-generator';
import { Op, Sequelize, QueryTypes } from 'sequelize';
import BorrowedBook from '../models/borrowed_books.js';

const getAllUsers = (req, res) => {

   db.query(
      "SELECT users.*, COUNT(borrowed_book.id) AS borrowed_book FROM users LEFT JOIN borrowed_book ON users.id = borrowed_book.user_id GROUP BY users.id",
      {
         type: QueryTypes.SELECT,

      }
   ).then(async (result) => {

      res.status(200).send({
         status: 'success',
         message: 'Users Data',
         data: result
      });
   }).catch((err) => {
      res.status(500).send({
         status: 'fail',
         message: err.message,
         data: []
      });
   });
}

const getUserById = (req, res) => {
   const id = req.params.id;

   db.models.User.findOne({
      where: {
         id: id
      }
   })
      .then(result => {
         if (!result) {
            res.status(404).send({
               status: 'fail',
               message: 'User not found',
               data: []
            })
            return;
         }
         res.status(200).send({
            status: 'success',
            message: 'User Data',
            data: result
         })
      })
      .catch(err => {
         res.status(500).send({
            status: 'fail',
            message: err.message,
            data: []
         })
      });
}

const saveUser = async (req, res) => {
   const generator = new CodeGenerator();
   const { username, password, name, role } = req.body;

   const result = db.models.User.findOne({
      where: {
         username: username
      }
   });

   if (result) {
      res.status(404).send({
         status: 'fail',
         message: 'User not found',
         data: []
      });
      return;
   }

   const hashed = await bcrypt.hash(password, Number(process.env.PASSWORD_SALT));

   const code = generator.generateCodes('***###', 1)[0];

   db.models.User.create({
      name: name,
      username: username,
      password: hashed,
      code: code,
      role: (!role ? 'member' : role)
   })
      .then(result => {
         res.status(201).send({
            status: 'success',
            message: 'Success to create user',
            data: result
         });
      })
      .catch(err => {
         res.status(500).send({
            status: 'fail',
            message: err.message,
            data: []
         })
      });
}

const updateUser = (req, res) => {
   const id = req.params.id;

   const result = db.models.User.findOne({
      where: {
         id: id
      }
   });

   if (!result) {
      res.status(404).send({
         status: 'fail',
         message: 'User not found',
         data: []
      });
      return;
   }

   const { name } = req.body;

   db.models.User.update(
      {
         name: name
      },
      {
         where: {
            id: id
         }
      }
   ).then(result => {
      res.status(200).send({
         status: 'success',
         message: 'Success to update user data',
         data: result,
      });
   }).catch(err => {
      res.status(500).send({
         status: 'fail',
         message: err.message,
         data: []
      });
   })
}

const deleteUserByID = (req, res) => {
   const id = req.params.id;

   const result = db.models.User.findOne({
      where: {
         id: id
      }
   });

   if (!result) {
      res.status(404).send({
         status: 'fail',
         message: 'User not found',
         data: []
      });
      return;
   }

   db.models.User.destroy({
      where: {
         id: id
      }
   }).then(result => {
      res.status(204).send({
         status: 'success',
         message: 'Succes delete user data',
         data: result
      })
   }).catch(err => {
      res.status(500).send({
         status: 'fail',
         message: err.message,
         data: []
      });
   })
}

export default { getAllUsers, getUserById, saveUser, updateUser, deleteUserByID };