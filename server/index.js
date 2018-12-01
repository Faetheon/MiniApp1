const express = require('express');
const cors = require('cors');
const Sequelize = require('sequelize');

const dbUrl = process.env.DB_URL;

const sequelize = new Sequelize({dbUrl, 
    dialect: 'postgres'
});

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(`${__dirname}/../react-client/dist/`));
app.use(cors());

app.get('/:updateMoney', (req, res) => {
    const amountToAdd = req.params.updateMoney;
    console.log(amountToAdd);
    res.status(200).send();
});

app.get('/*', (req, res) => {
    res.status(304).sendFile(`${__dirname}/../react-client/dist/index.html`)
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT }`);
});