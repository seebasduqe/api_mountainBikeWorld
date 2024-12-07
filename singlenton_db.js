const mysql = require('mysql2/promise');
class Database {

    //La variable estática privada #instance se utiliza para almacenar la única instancia de la clase
    static #instance;

    /* 
    El constructor verifica si ya existe una instancia de Database. 
    Si es así, devuelve esa instancia en lugar de crear una nueva
    */
    constructor() {
        if (Database.#instance) {
            return Database.#instance;
        }

        //se crea un pool de conexiones a la base de datos usando mysql.createPool()
        this.pool = mysql.createPool({
            host: '154.56.48.52',//process.env.DB_HOST, //'0elgy.h.filess.io',
            port:3306,
            user: 'u337037783_estudiante',//process.env.DB_USER, //'storeBikeDB_nearbypet',
            password: 'Estudiante20*_',//process.env.DB_PASSWORD, //'74be17f9d2e8a04de279b09b66d1535bc2814a32',
            database: 'u337037783_tiendaBikeDB',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
        Database.#instance = this; // Guardamos la instancia
    }

    //Este método permite ejecutar consultas en la base de datos
    async fetchData(query, params) {
        const connection = await this.pool.getConnection();
        try {
            const [rows] = await connection.execute(query, params);
            return rows;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        } finally {
            //liberaramo la conexión una vez que se completa el proceso
            connection.release();
        }
    }

    //verificamos si podemos hacer conexion a la db
    async checkConnection() {
        const connection = await this.pool.getConnection();
        try {
            await connection.query('SELECT 1');
            console.log('Conexión a la base de datos exitosa.');
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
        } finally {
            connection.release();
        }
    }

    //Este es el método que proporciona acceso a la instancia de la db
    static get instance() {
        //Si no existe ninguna instancia, se crea una nueva
        if (!this.#instance) {
            this.#instance = new Database();
        }
        return this.#instance;
    }
    /* Este método es el punto de acceso global a la clase Singleton */
}
module.exports =  Database;
