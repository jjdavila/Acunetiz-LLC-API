'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

/**se establece la consexion a la base de datos en mongodb
 * nombre de la base de datos: AcunetisAPI
 * para los efecto de esta prueba se dejo la configuracion
 * por defecto de mongo db
 */
mongoose.connect(config.dataBase, (err, res) => {
    if(err){
        console.log(`error al conectar a la base de datos ${err}`)
    }
    console.log('conexion a la base de datos establecida')
    /**se inicializa el servidor usando una arrow function de ES6 */
    app.listen(config.port, () => {
        console.log(`API REST ejecutandoce en http://localhost:${config.port}`)
    })
    
})
