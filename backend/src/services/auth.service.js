import bcrypt from 'bcryptjs';
import prisma from '../config/prisma.js';

export const registrarUsuario = async ({ nombre, email, password }) => {
    const existe = await prisma.user.findUnique({ where: { email }});

    if (existe) {
        throw new Error('El email ya esta registrado');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await prisma.user.create({
        data: {
            nombre,
            email,
            password: passwordHash,
        },
        select: {
            id: true,
            nombre: true,
            email: true,
            role: true,
            createdAt:true,
        },
    });
    return usuario;
};