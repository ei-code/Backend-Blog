const Usuario = require("../model/usuario");

const getBlogItem = async (req, res) => {
  try {
    const postId = req.params.id; //ID de la publicación como parámetro

    // Buscar la publicación por su ID 
    const usuario = await Usuario.findOne({ "publicaciones._id": postId });

    if (!usuario) {
      return res.status(404).json({ mensaje: "La publicación no se encontró" });
    }

    // Encontrar la publicación específica
    const publicacion = usuario.publicaciones.find((pub) => pub._id == postId);

    if (!publicacion) {
      return res.status(404).json({ mensaje: "La publicación no se encontró" });
    }

    // Obtén los detalles del usuario 
    const userId = usuario._id;
    const usuarioDueño = await Usuario.findById(userId, "nombre apellido");

    if (!usuarioDueño) {
      return res.status(404).json({ mensaje: "El usuario dueño de la publicación no se encontró" });
    }

    const blogItem = {
      titulo,
      subtitulo,
      contenido,
      fechaPublicacion,
      imagenURL,
      user: {
        nombre: usuarioDueño.nombre,
        apellido: usuarioDueño.apellido,
      },
    };

    return res.json(blogItem);
  } catch (error) {
    console.error("Error al obtener el detalle de la publicación", error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

module.exports = getBlogItem;