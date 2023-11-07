const Usuario = require('../model/usuario'); // Asegúrate de importar tu modelo de usuario

async function eliminarTodosLosTokensYExpiraciones() {
  try {
    // Realiza una actualización masiva para establecer resetPasswordTokens a un array vacío y eliminar expires
    const result = await Usuario.updateMany({}, { $set: { resetPasswordTokens: [], expires: [] } });

    console.log('Tokens y expiraciones eliminados exitosamente.');
  } catch (error) {
    console.error('Error al eliminar tokens y expiraciones:', error);
  }
}

eliminarTodosLosTokensYExpiraciones();