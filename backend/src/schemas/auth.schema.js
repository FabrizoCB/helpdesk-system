import { z } from 'zod';

export const registroSchema = z.object({
    nombre: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(60, 'El nombre no puede superar los 60 caracteres')
    .trim(),

    email: z
    .email('El email no es valido')
    .toLowerCase()
    .trim(),

    password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(72, 'La contraseña no puede superar los 72 caracteres'),
});

export const loginSchema = z.object({
    email: z.email('El email no es valido').toLowerCase().trim(),
    password: z.string().min(1, 'La contraseña es obligatoria'),
});