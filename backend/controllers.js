const bcrypt = require('bcryptjs');
const pool = require('./db');

const registerUser = async (req, res) => {
  try {
    const { email, password, rol, lenguage } = req.body;

    if (!email || !password || !rol || !lenguage) {
      return res.status(400).send({ message: 'Todos los campos son obligatorios' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4)';
    await pool.query(query, [email, hashedPassword, rol, lenguage]);

    res.status(201).send({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).send({ message: 'Error en el servidor', error });
  }
};

const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: 'Email y contraseña son obligatorios' });
    }

    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const { rows: [user] } = await pool.query(query, [email]);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: 'Error en el servidor', error });
  }
};

const getUser = async (req, res) => {
    try {
      const email = req.user.email;
      const query = 'SELECT email, rol, lenguage FROM usuarios WHERE email = $1';
      const { rows: [user] } = await pool.query(query, [email]);
  
      if (!user) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
  
      res.send(user);
    } catch (error) {
      res.status(500).send({ message: 'Error en el servidor', error });
    }
  };

  module.exports = {
    registerUser,
    loginUser,
    getUser,
  };
