const { model, Schema } = require("mongoose");

const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, default: "ValorPorDefecto" },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  resetPasswordTokens: [
    {
      token: { type: String, required: false},
      expires: Date,
    },
  ],

  publicaciones: [
    {
      titulo: { type: String, required: true },
      subtitulo: { type: String, required: true },
      contenido: { type: String, required: true },
      fechaPublicacion: { type: Date },
      imagenURL: { type: String, required: false },
    }
  ],
  userId: { type: Schema.Types.ObjectId },
});

module.exports = model("Usuario", UsuarioSchema);