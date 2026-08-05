import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.js';
import { registroSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post('/registro', validate(registroSchema), authController.registrar);

export default router;