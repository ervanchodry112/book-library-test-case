import jwt from "jsonwebtoken";
import db from '../models/index.js';

const checkAuth = (req, res, next) => {
   const token = req.header("Authorization");

   if (!token) return res.status(401).send('Unauthenticated 1');

   const tokenHeader = token.split(" ");

   if (tokenHeader[0] !== 'Bearer') {
      res.status(401).send('Unauthenticated 2')
   }

   try {
      const verified = jwt.verify(tokenHeader[1], process.env.jwtSecret);

      db.models.User.findOne({
         where: {
            id: verified.data
         }
      }).then(result => {
         req.user = result;
         next();
      })
   } catch (err) {
      res.status(401).send('Unauthenticated 3' + err.message);
   }
}

export default checkAuth;