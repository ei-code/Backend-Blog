const Usuario = require("../model/usuario");

const publicaciones = (req, res) => {
    Usuario.find({}, 'publicaciones', (err, usuarios) => {
      if (err) {
        res.status(500).json({ error: 'Error al buscar usuarios' });
      } else {
        const todasLasPublicaciones = [];
  
        usuarios.forEach((usuario) => {
          todasLasPublicaciones.push(...usuario.publicaciones);
        });
    
        res.json(todasLasPublicaciones);
      }
    });
  };
module.exports = publicaciones;  
