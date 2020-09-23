import UserController from 'controllers/UserController';
import { Router } from 'express';
import ensureAuthenticated from 'middlewares/ensureAuthenticated';
import AuthController from './controllers/AuthController';

const routes = Router();

const authController = new AuthController();
const userController = new UserController();

routes.post('/signin', authController.create);
routes.post('/signup', userController.create);
routes.get('/users/:user_id', ensureAuthenticated, userController.index);

export default routes;
