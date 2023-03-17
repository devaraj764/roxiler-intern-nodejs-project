const sequelize = require('../config/db');
const insertSeedDataToDB = require('../helpers/insertSeedData')
const Transaction = require('../models/Transaction');

const intializeDatabase = async (req, res) => {
    try {
        const data = await insertSeedDataToDB();
        res.send({ success: true, message: "Inserted seed data to database", data })
    } catch (err) {
        res.status(400).send({ success: false, message: err.message })
    }
}

const statisticsData = async (req, res) => {
    try {
        const { month } = req.query;
        if (!month || month === '') return res.send({ status: false, message: 'Provide month in query url' });
        if (parseInt(month) < 1 || parseInt(month) > 12) return res.send({ status: false, message: 'Invalid month choose between 1 (Jan) to 12 (Dec)' });
        const result1 = await Transaction.findAll({
            where: { dateOfMonth: parseInt(month), sold: true },
            attributes: [[sequelize.fn('SUM', sequelize.col('price')), 'totalSaleAmount'], [sequelize.fn('COUNT', sequelize.col('id')), 'soldItemsCount']],
            raw: true
        });
        const result2 = await Transaction.findAll({
            where: { dateOfMonth: parseInt(month), sold: false },
            attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'notSoldItemsCount']],
            raw: true
        });
        const data = { totalSaleAmount: result1[0].totalSaleAmount, soldItemsCount: result1[0].soldItemsCount, notSoldItemsCount: result2[0].notSoldItemsCount }
        return data;
    } catch (err) {
        res.status(400).send({ success: false, message: err.message })
    }
}

const graphData = async (req, res) => {
    try {
        const { month } = req.query;
        if (!month || month === '') return res.send({ status: false, message: 'Provide month in query url' });
        if (parseInt(month) < 1 || parseInt(month) > 12) return res.send({ status: false, message: 'Invalid month choose between 1 (Jan) to 12 (Dec)' });
        const result = await Transaction.findAll({
            where: { dateOfMonth: parseInt(month) },
            attributes: ['price'],
            raw: true
        });
        var data = {
            "0-100": 0,
            "101-200": 0,
            "201-300": 0,
            "301-400": 0,
            "401-500": 0,
            "501-600": 0,
            "601-700": 0,
            "701-800": 0,
            "801-900": 0,
            "901-above": 0
        };
        result.map(item => {
            if (item.price >= 0 && item.price <= 100) {
                data["0-100"]++;
            }
            else if (item.price > 100 && item.price <= 200) {
                data["101-200"]++;
            }
            else if (item.price > 200 && item.price <= 300) {
                data["201-300"]++;
            }
            else if (item.price > 300 && item.price <= 400) {
                data["301-400"]++;
            }
            else if (item.price > 400 && item.price <= 500) {
                data["401-500"]++;
            }
            else if (item.price > 500 && item.price <= 600) {
                data["501-600"]++;
            }
            else if (item.price > 600 && item.price <= 700) {
                data["601-700"]++;
            }
            else if (item.price > 700 && item.price <= 800) {
                data["701-800"]++;
            }
            else if (item.price > 800 && item.price <= 900) {
                data["801-900"]++;
            }
            else if (item.price > 900) {
                data["901-above"]++;
            }
        });
        return data;
    } catch (err) {
        res.status(400).send({ success: false, message: err.message })
    }
}

const piechartData = async (req, res) => {
    try {
        const { month } = req.query;
        if (!month || month === '') return res.send({ status: false, message: 'Provide month in query url' });
        if (parseInt(month) < 1 || parseInt(month) > 12) return res.send({ status: false, message: 'Invalid month choose between 1 (Jan) to 12 (Dec)' });
        const result = await Transaction.findAll({
            where: { dateOfMonth: parseInt(month) },
            attributes: ['category'],
            raw: true
        });
        var data = {};
        result.map(item => {
            if (!data[item.category]) {
                data[item.category] = 0;
            }
            data[item.category]++;
        });
        return data
    } catch (err) {
        res.status(400).send({ success: false, message: err.message })
    }
}

const combinedData = async (req, res) => {
    try {
        const data = {};
        data.statisticsData = await statisticsData(req, res);
        data.graphData = await graphData(req, res);
        data.piechartData = await piechartData(req, res);
        return data;
    } catch (err) {
        console.log(err)
        res.status(400).send({ success: false, message: err.message })
    }

}


module.exports = { intializeDatabase, statisticsData, graphData, piechartData, combinedData }