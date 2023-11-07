const Usuario = require("../model/usuario");

const getUserById = async (req, res) => {
  const { _id } = req.user;

  if (_id) {
    Usuario.findById(_id).then((usuario) => {
      if (!usuario) {
        return res.json({
          mensaje: "No se encontro ningun usuario con esa ID",
        });
      } else {
        const { _id, contraseña, __v, ...resto } = usuario._doc;
        const userId = _id; // Guarda el _id del usuario en la variable userId

        res.json({
          userId: userId, // Envía el userId en la respuesta
          ...resto // Otras propiedades 
        });
     }
    });
  } else {
    res.json({ mensaje: "Estas enviando una contraseña incorrecta" });
  }
};

module.exports = getUserById;