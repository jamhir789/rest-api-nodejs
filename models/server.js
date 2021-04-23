const express = require('express')
const cors = require('cors')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/users';

        //Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
    }

    routes() { 
      this.app.use(this.usuariosPath,require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo');
        })
    }

    middlewares() {

        // Cors
        this.app.use(cors());

        ///Lectura y parseo del body
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));

    }


}



module.exports = Server;