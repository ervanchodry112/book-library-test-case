import db from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
   const { username, password } = req.body;

   if (!username) {
      res.status(400).send({
         status: 'fail',
         message: 'Validation Failed!, Username must be provided',
         data: []
      })
      return;
   }

   if (!password) {
      res.status(400).send({
         status: 'fail',
         message: 'Validation Failed!, Password must be provided',
         data: []
      })
      return;
   }

   db.models.User.findOne({
      where: {
         username: username
      }
   }).then(result => {
      bcrypt.compare(password, result.password)
         .then(check => {
            if (!check) {
               res.status(400).send({
                  status: 'fail',
                  message: 'Password is invalid',
                  data: []
               });
               return;
            }
         })

      const token = jwt.sign(
         {
            data: result.id,
         },
         process.env.jwtSecret,
         {
            expiresIn: '3h'
         }
      );

      res.status(200).send({
         status: 'success',
         message: 'Authentication succes!',
         data: {
            user: result,
            token: token,
         }
      })
   }).catch(err => {
      res.status(404).send({
         status: 'fail',
         message: err.message,
         data: []
      });
   })
}

export default { login };