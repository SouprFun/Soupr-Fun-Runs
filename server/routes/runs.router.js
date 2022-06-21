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
        .query(`SELECT * FROM "runs" 
        JOIN "user" ON runs.user_id = "user"."id"
        where "user".id = ${req.user.id};`)
        .then((results) => res.send(results.rows))
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
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('Error making Posting to runs:', error);
            res.sendStatus(500);
        });
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in delete', req.params, req.user.id)
    const query = `DELETE FROM runs WHERE runs.id = $1 AND runs.user_id = $2;`
    pool
        .query(query, [req.params.id, req.user.id])
        .then((response) => res.sendStatus(204))
        .catch(error => {
            console.log(`Error deleting run`, error);
            res.sendStatus(500);
        });
})

router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in update');
    const body = req.body;
    const user = req.user.id;
    const run_id = req.params.id;
    query = `UPDATE runs SET 
	"distance" = $1, 
	"time" = $2, 
	"pace" = $3, 
	"cat_id" = $4, 
	"date" = $5, 
	"notes" = $6
	WHERE runs.id = $7 AND runs.user_id = $8;`;
    pool.query(query, [body.distance, body.time, body.pace, body.cat_id, body.date, body.notes, run_id, user])
        .then(response => res.sendStatus(200))
        .catch(error => {
            console.log(`Error updating run`, error);
            res.sendStatus(500);
        });
})

module.exports = router;
