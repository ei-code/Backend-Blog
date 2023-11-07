const nodemailer = require('nodemailer');
const Usuario = require("../model/usuario");
const crypto = require('crypto');

const passwordRecovery = async (req, res) => {
  const { correo } = req.body;
  try {
    const user = await Usuario.findOne({ correo });

    if (user) {
      res.status(200).json({ message: 'Usuario encontrado. Consulta la consola para ver los detalles.' });
    } else {
      res.status(404).json({ message: 'El usuario no existe.' });
    }
    const token = crypto.randomBytes(20).toString('hex');

    const resetToken = {
      token: token,
      expires: Date.now() + 3600000, // 3600000 milisegundos en una hora
    };
    
    user.resetPasswordTokens.push(resetToken); // Agregar el nuevo objeto al arreglo
    await user.save(); // Guardar el usuario con el nuevo token y fecha en la base de datos

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      }
    });
    const emailPort = process.env.EMAIL_PORT || 3000;

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: `${user.correo}`,
      subject: "Blog-Proyecto",
      text: `http://localhost:${emailPort}/newPassword/${token}`
    };
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error("Ha ocurrido un error:", err);
      } else {
        console.log("Respuesta:", response);
        res.status(200).json("El mail ha sido enviado")
      }
    })
  } catch (error) {
    console.error('Error al buscar el usuario:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

module.exports = passwordRecovery;
