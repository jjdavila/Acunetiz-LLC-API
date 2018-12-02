/**fichero encargado de manejar las variables configurables. 
 * Necesarios para las pruebas unitarias.
 */
module.exports = {
    port: process.env.PORT || 3000,
    dataBase: 'mongodb://localhost:27017/AcunetizApiTEST',
    SECRET_TOKEN: 'miSecrectTocken'
}
