const Usuario = require("../model/usuario");

const createNewPost = async (req, res) => {
  // Utiliza el ID del usuario autenticado para asociar la publicación con ese usuario
  const userId = req.body.userId;
  console.log("UserID:", userId); // Agregado para depuración

  try {
    const usuario = await Usuario.findById(userId);

    if (!usuario) {
      console.log("Usuario no encontrado."); // Agregado para depuración
      return res.status(404).json({
        mensaje: "No se encontró ningún usuario con ese ID",
      });
    }

    // Crea una nueva publicación asociada al usuario
    const nuevaPublicacion = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      imagenURL: req.body.imagenURL,
      contenido: req.body.contenido,
      fechaPublicacion: new Date().toISOString(),
      userId
    };
    console.log("Nueva publicación:", nuevaPublicacion); // Agregado para depuración

    usuario.publicaciones.push(nuevaPublicacion);

    await usuario.save();

    console.log("Publicación guardada en el usuario."); // Agregado para depuración

    return res.status(201).json({
      mensaje: "Publicación creada con éxito",
      publicacion: nuevaPublicacion,
    });
  } catch (error) {
    console.error("Error interno del servidor:", error); // Agregado para depuración
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

module.exports = createNewPost;