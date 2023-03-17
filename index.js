const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const sequelize = require('./config/db');

const apiRoutes = require('./routes/api.routes.js')

app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('views'));
app.use('/api', apiRoutes)


app.listen(port, async () => {
    try {
        console.log(`listening on port ${port}`)
        // await sequelize.sync({ force: true });
        await sequelize.authenticate()
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
});