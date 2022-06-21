const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log("req.user is:", req.user);
    pool
        //where user_id
        .query(`SELECT * FROM "runs";`)
        .then((results)=> res.send(results.rows))
        .catch((error) => {
            console.log('Error making SELECT for runs:', error);
            res.sendStatus(500);
          });
});

/* category ids:
    1: speed
    2: long
    3: fun
    4: causal/social
    5: race
*/

// note: issue with postman logging in... 

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log("req.user is:", req.user);
    const query = `INSERT INTO "runs" ("user_id", "distance", "time", "pace", "cat_id", "date", "notes")
    VALUES ($1, $2, $3, $4, $5, $6, $7);`
    pool
        .query(query, [req.user.id, req.body.distance, req.body.time, req.body.pace, req.body.cat_id, req.body.date, req.body.notes])
        .then((results)=> res.send(results.rows))
        .catch((error) => {
            console.log('Error making Posting to runs:', error);
            res.sendStatus(500);
          });
});

module.exports = router;
