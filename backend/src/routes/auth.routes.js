import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.js';
import { registroSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post('/registro', validate(registroSchema), authController.registrar);
router.post('/login', validate(loginSchema), authController.login);

export default router;