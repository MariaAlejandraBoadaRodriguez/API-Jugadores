const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el correo ya está registrado
    User.findByEmail(email, async (err, result) => {
      if (err) return res.status(500).json({ error: 'Error en el servidor' });
      if (result.length > 0) {
        return res.status(400).json({ error: 'El correo ya está registrado' });
      }

      // Encriptar la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Crear el usuario
      User.create(email, hashedPassword, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error en el servidor al crear usuario' });
        res.json({ message: 'Usuario registrado exitosamente' });
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    User.findByEmail(email, async (err, result) => {
      if (err) return res.status(500).json({ error: 'Error en el servidor' });
      if (result.length === 0) {
        return res.status(400).json({ error: 'Credenciales incorrectas' });
      }

      const user = result[0];
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Credenciales incorrectas' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Inicio de sesión exitoso', token });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
