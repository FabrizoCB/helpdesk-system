import bcrypt from 'bcryptjs';
import prisma from '../config/prisma.js';
import jwt from 'jsonwebtoken';

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

export const loginUsuario = async ({ email, password }) => {
    const usuario = await prisma.user.findUnique({ where: { email } });

    if (!usuario || !usuario.activo) {
        throw new Error('Credenciales inválidas');
    }

    const passwordValida = await bcrypt.compare (password, usuario.password);

    if (!passwordValida) {
        throw new Error('Credenciales inválidas');
    }

    const token = jwt.sign(
        { sub: usuario.id, role: usuario.role },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );

    return {
        token,
        usuario: {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            role: usuario.role,
        },
    };
};