const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).send({ message: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Token inválido o expirado', error });
  }
};

const logRequest = (req, res, next) => {
    console.log(`Ruta: ${req.path}, Método: ${req.method}`);
    next();
  };
  module.exports = { logRequest, verifyToken };
