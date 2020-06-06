import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.json({ user });
  } catch (err) {
    return response.json({ err });
  }
});

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  async (request, response) => {
    return response.json({ ok: true });
  },
);

export default usersRouter;
