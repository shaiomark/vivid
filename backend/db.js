// const { Sequelize } = require('sequelize');
// require('dotenv').config(); // Load environment variables from .env

// class PostgresDB {
//     constructor() {
//         this.username = process.env.DB_USERNAME;
//         this.password = process.env.DB_PASSWORD;
//         this.port = process.env.DB_PORT;
//         this.dbName = process.env.DB_NAME;
//     }

//     initialiseConnection() {
//         const sequelize = new Sequelize(this.dbName, this.username, this.password, {
//             host: 'localhost',
//             dialect: 'postgres'
//         });

//         sequelize.authenticate().then(() => {
//             console.log('Connection has been established successfully.')
//             return sequelize
//         }).catch((error) => {
//             console.error('Unable to connect to the database:', error)
//             return false
//         })
//     }
// }

// module.exports = PostgresDB



