const { Sequelize, DataTypes, Op } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env


// const PostgresDB = require('../db')
// const postgresDB = new PostgresDB()
// const sequelize = postgresDB.initialiseConnection()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.')
}).catch((error) => {
    console.error('Unable to connect to the database:', error)
})


const Blog = sequelize.define('blog_data', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    published_at: {
        type: DataTypes.DATE
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    deleted_at: {
        type: DataTypes.DATE
    }
}, {
    timestamps: false, // Set to true if you want Sequelize to manage timestamps
    underscored: true // Set to true if you want Sequelize to use snake_case for column names
});


module.exports = Blog;
