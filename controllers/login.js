const bcrypt = require("bcrypt");
const Usuario = require("../model/usuario");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const esCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);

    if (esCorrecta) {
      // Genera un token con los datos del usuario
      const { _id, nombre } = usuario; // Cambia "userId" a "_id"
      const data = {
        _id, // Cambia id a _id para que coincida con la propiedad _id de MongoDB
        nombre,
      };

      const token = jwt.sign(data, "secreto", {
        expiresIn: 86400, // 24 horas en segundos
      });

      res.json({
        mensaje: "Usuario logeado correctamente",
        usuario: {
          _id,
          nombre,
          token,
        },
      });
    } else {
      res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

module.exports = login;