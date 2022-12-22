import * as express from 'express';
import mongoose from 'mongoose';
import * as path from 'path';
import * as swaggerUi from 'swagger-ui-express'

import {
  create,
  getAll,
  getOne,
  remove,
  update,
  login,
  register,
} from '../controllers'
import { ROUTES } from '../constants';
import { registerValidationMiddleware, loginValidationMiddleware } from '../middlewares'
import checkAuth from '../utils/checkAuth';
import handleValidationErrors from '../utils/handleValidationErrors'
import { registerValidatorSchema, loginValidatorSchema } from '../validations'
import * as swaggerDocument from '../swagger/swagger.json'

const PORT: number | string = process.env.PORT || 3030;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.post(`${ROUTES.authRoute}/register`, registerValidationMiddleware(registerValidatorSchema), handleValidationErrors, register)
app.post(`${ROUTES.authRoute}/login`, loginValidationMiddleware(loginValidatorSchema), handleValidationErrors, login)

app.post(ROUTES.meetupRoute, checkAuth, create);
app.get(ROUTES.meetupRoute, getAll);
app.get(`${ROUTES.meetupRoute}/:id`, getOne);
app.delete(`${ROUTES.meetupRoute}/:id`, remove);
app.patch(`${ROUTES.meetupRoute}/:id`, update)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = async () => {
  try {
    await mongoose
      .connect(
        process.env.MONGO_DB_HOST
      )
      .then(() => console.log('MongoDB connected!'))
      .catch(() => console.log('Error connection'));

    app.listen(PORT, () => console.log(`Server listening at port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

server()
