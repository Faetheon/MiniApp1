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
client.connect()
const app = express();

app.use(express.static(`${__dirname}/../react-client/dist/`));
app.use(cors());

app.get('/:updateMoney/:username', (req, res) => {
    // Update Amount
    const UA = req.params.updateMoney;
    // User Name
    const UN = req.params.username
    
    client.query(`UPDATE users_data SET score=(SELECT score FROM users_data WHERE score_id=(SELECT id FROM users WHERE username='${UN}'))+${UA} WHERE score_id = (SELECT id FROM users WHERE username='${UN}')`)
        .then((result) => {
            res.status(200).send();
        })
        .catch(err => {
            if (err) throw err;
            res.status(400).send();
        });
        client.query(`SELECT score,high_score FROM users_data WHERE score_id=(SELECT id FROM users WHERE username='${UN}');`)
            .then(result => {
                if (result.rows[0].score > result.rows[0].high_score) {
                    client.query(`UPDATE users_data SET high_score=(SELECT score FROM users_data WHERE score_id=(SELECT id FROM users WHERE username='${UN}')) WHERE score_id = (SELECT id FROM users WHERE username='${UN}');`)
                        .catch(err => {
                            if (err) throw err;
                        })
                }
            })
            .catch(err  => {
                if (err) throw err;
            });
});

app.get('/login/:username/:password', (req, res) => {
    const {username, password} = req.params;
    client.query(`SELECT * FROM users_data WHERE score_id=(SELECT id FROM users WHERE username='${username}' AND password='${password}')`)
        .then((data) => {
            if (data.rowCount === 0) {
                throw 'User not found';
            } else {
                res.json(data.rows[0]);
            }
        })
        .catch(err => {
            console.log(err);
            client.query(`INSERT INTO users (id, username, password) VALUES ((SELECT MAX(id) FROM users)+1, '${username}', '${password}');`)
                .then(() => {
                    client.query(`INSERT INTO users_data (score_id, high_score, score, workers) VALUES ((SELECT id FROM users WHERE username='${username}'), 0, 0, '0, 0, 0');`)
                        .then(result => {
                            console.log(result);
                            res.status(201).send();
                        })
                        .catch(err => {
                            if (err) throw err;
                            res.status(400).send();
                        });
                })
                .catch(err => {
                    if (err) {
                        console.log(err);
                        res.status(400).send();
                    } else {
                        res.status(201).send();
                    }
                });
        });
});

app.get('/update', (req, res) => {
    const rows = [];
    let timeout;
    client.query("SELECT * FROM users_data ORDER BY high_score DESC LIMIT 10;")
        .then(result => {
            console.log(result.rows);
            rows.push(result.rows);
            rows[1] = [];
            rows[0].forEach(score => {
                client.query(`SELECT username FROM users WHERE id=${score.score_id}`)
                    .then(result => {
                        clearTimeout(timeout);
                        rows[1].push(result.rows);
                        timeout = setTimeout(() => {
                            res.json(rows);
                        }, 1000);
                    })
                    .catch(err => {
                        if (err) throw err;
                    });
            });
        })
        .catch(err => {
            if (err) throw err;
        });
});

app.get('/*', (req, res) => {
    res.status(304).send(`${__dirname}/../react-client/dist/index.html`)
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT }`);
});


/* 
    SCHEMA INFO:
        client.query("CREATE TABLE users (id INT SERIAL PRIMARY KEY, username UNIQUE VARCHAR(20), password VARCHAR(64));", (err, res) => {
            client.query("CREATE TABLE users_data (score_id SERIAL PRIMARY KEY, high_score INTEGER, score INTEGER, workers character(7);", (err, res) => {
                    if (err) throw err;
                    console.log(res.rows);
                    client.end();
                });
        });
*/