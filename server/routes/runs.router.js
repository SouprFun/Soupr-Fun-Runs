const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("req.user is:", req.user);
    pool
        .query(`SELECT * FROM "runs";`)
        .then((results)=> res.send(results.rows))
        .catch((error) => {
            console.log('Error making SELECT for runs:', error);
            res.sendStatus(500);
          });
});

module.exports = router;
