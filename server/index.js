require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {Client} = require('pg');

const dbUrl = process.env.DB_URL;
const PORT = process.env.PORT || 3000;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;

const client = new Client(dbUrl, {
    user: USER,
    password: PASSWORD
});
const app = express();

app.use(express.static(`${__dirname}/../react-client/dist/`));
app.use(cors());

app.get('/:updateMoney/:username', (req, res) => {
    // Update Amount
    const UA = req.params.updateMoney;
    // User Name
    const UN = req.params.username
    
    client.connect()
    client.query(`SELECT * FROM users_data WHERE score_id = (SELECT id FROM users WHERE username='${UN}')`)
        .then((res) => {
            console.log(res);
            res.status(200).send();
        })
        .catch(err => {
            if (err) throw err;
            res.status(400).send();
        });

});

app.get('/login/:username/:password', (req, res) => {
    // client.connect();
    // client.query(`INSERT INTO users (username, password) VALUES ('${req.params.username}', '${req.params.password}');`)
    //     .then(() => {
    //         client.query(`INSERT INTO users_score (high_score, score) VALUES (0, 0, '0, 0, 0');`)
    //             .then(res => {
    //                 client.end();
    //                 console.log(res);
    //             })
    //             .catch(err => {
    //                 if (err) throw err;
    //                 client.end();
    //             });
    //     })
    //     .catch(err => {
    //         if (err) {
    //             console.log(err);
    //             res.status(400).send();
    //         } else {
                res.status(201).send();
        //     }
        //     client.end();
        // });
});

app.get('/*', (req, res) => {
    res.status(304).sendFile(`${__dirname}/../react-client/dist/index.html`)
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT }`);
});


/* 
    SCHEMA INFO:
        client.connect();
        client.query("CREATE TABLE users (id INT SERIAL PRIMARY KEY, username UNIQUE VARCHAR(20), password VARCHAR(64));", (err, res) => {
            client.query("CREATE TABLE users_data (score_id SERIAL PRIMARY KEY, high_score INTEGER, score INTEGER, workers character(7);", (err, res) => {
                    if (err) throw err;
                    console.log(res.rows);
                    client.end();
                });
        });
*/