'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
    },
    title: {
        type: DataTypes.STRING(255),
    },
    price: {
        type: DataTypes.FLOAT
    },
    description: {
        type: DataTypes.TEXT,
    },
    category: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
    sold: {
        type: DataTypes.BOOLEAN
    },
    dateOfSale: {
        type: DataTypes.DATE
    },
    dateOfMonth: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'product_transactions'
});


module.exports = Transaction