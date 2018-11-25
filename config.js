
/**fichero encargado de manejar las variables configurables 
 * se usara para realizar configuraciones de la aplicacion
 */
module.exports = {
    port: process.env.PORT || 3000,
    dataBase: process.env.MONGO || 'mongodb://localhost:27017/AcunetisProducts'
}
