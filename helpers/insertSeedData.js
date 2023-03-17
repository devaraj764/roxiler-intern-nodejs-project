const Transaction = require('../models/Transaction');
const fetch = require('node-fetch');

const insertSeedDataToDB = async () => {
    try {
        const res = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = await res.json();
        await Transaction.sync({ force: true })
        await Transaction.bulkCreate(data.map(item => {
            const date = new Date(item.dateOfSale)
            return { ...item, dateOfMonth: date.getMonth() + 1 }
        }));
        return data;
    } catch (err) {
        console.error('Issue uploading seed data:', err);
        throw new Error(err.message);
    }
}

module.exports = insertSeedDataToDB;