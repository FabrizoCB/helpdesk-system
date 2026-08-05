import * as authService from '../services/auth.service.js';

export const registrar = async (req, res) => {
    try {
        const usuario = await authService.registrarUsuario(req.body);

        return res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            data: usuario,
        });
    } catch (error) {
        return res.status(400).json({
            mensaje: error.message,
        });
    }
};

export const login = async (req, res) => {
    try{
        const resultado = await authService.loginUsuario(req.body);

        return res.status(200).json({
            mensaje: 'Login exitoso',
            data: resultado,
        });
    } catch (error) {
        return res.status(401).json({
            mensaje: error.message,
        });
    }
};