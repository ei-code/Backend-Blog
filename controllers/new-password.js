const bcrypt = require("bcrypt");
const Usuario = require("../model/usuario");
const jwt = require("jsonwebtoken");

const newpassword = (req, res) => {
  const { token, contraseña } = req.body; // Accede al token desde los parámetros de la URL

  Usuario.find() // Encuentra todos los usuarios
    .then((usuarios) => {
      let tokenEncontrado = null;

      usuarios.forEach((usuario) => {
        const tokensUsuario = usuario.resetPasswordTokens;

        tokensUsuario.forEach((tokenInfo) => {
          if (tokenInfo.token === token) {
            tokenEncontrado = tokenInfo;

            const fechaActual = new Date();
            if (tokenEncontrado.expires > fechaActual) {

              return bcrypt.hash(contraseña, 10)
                .then((contraseñaHasheada) => {
                  if (contraseñaHasheada) {
                    usuario.contraseña = contraseñaHasheada;
                    usuario.resetPasswordTokens = []; // Elimina los tokens

                    // Guarda los cambios en la base de datos
                    return usuario.save()
                      .then(() => {
                        return res.status(200).json({ message: "Contraseña restablecida con éxito." });
                      });
                  }
                })
                .catch((error) => {
                  return res.status(500).json({ message: "Error al procesar la solicitud." });
                });
            } else {
              return res.status(400).json({ message: "El token ha expirado. Debes volver a solicitar la restauración de la contraseña." });
            }
          }
        });
      });

      if (!tokenEncontrado) {
        return res.status(400).json({ message: "Token no válido." });
      }
    })
    .catch((error) => {
      return res.status(500).json({ message: "Error al procesar la solicitud." });
    });
};
module.exports = newpassword;