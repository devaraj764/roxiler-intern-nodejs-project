const express = require('express');
const router = express.Router();
const { intializeDatabase, statisticsData, graphData, piechartData, combinedData } = require('../controllers/api.controllers')

router.get('/initialize-db', intializeDatabase)

router.get('/get-statistics-data', async (req, res) => {
    const data = await statisticsData(req, res);
    res.send({ success: true, message: "Successfully found statistics data", data })
})

router.get('/get-graph-data', async (req, res) => {
    const data = await graphData(req, res);
    res.send({ success: true, message: "Successfully found graph data", data })
})

router.get('/get-piechart-data', async (req, res) => {
    const data = await piechartData(req, res);
    res.send({ success: true, message: "Successfully found piechart data", data })
})

router.get('/get-combined-data', async (req, res) => {
    const data = await combinedData(req, res);
    res.send({ success: true, message: "Successfully found combined data", data })
})

module.exports = router