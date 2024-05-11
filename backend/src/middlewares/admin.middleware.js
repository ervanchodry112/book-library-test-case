import db from '../models/index.js';

const isAdmin = (req, res, next) => {
   if (!req.user) {
      res.status(401).send({
         status: 'fail',
         message: 'Unauthorized',
         data: [],
      });
   }
   if (req.user.role !== 'admin') {
      res.status(401).send({
         status: 'fail',
         message: 'Unauthorized',
         data: [],
      });
   }

   next();
}

export default isAdmin;