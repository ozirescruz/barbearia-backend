import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpateUserAvatarService';

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
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatarService = new UpdateUserAvatarService();
      const user = await updateUserAvatarService.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
      });
      return response.json({ user });
    } catch (error) {
      return response.json({ error });
    }
  },
);

export default usersRouter;
