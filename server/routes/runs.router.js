const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
//get
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log("req.user is:", req.user);
    pool
        //where user_id
        .query(`SELECT * FROM runs 
        JOIN categories ON runs.cat_id = categories.category_id
        WHERE user_id = ${req.user.id}
        ORDER BY runs.id;`)
        .then((results) => {
            res.send(results.rows);
        })
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

//post
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log("in post runs, req.user is:", req.user, req.body);
    const query = `INSERT INTO "runs" ("user_id", "distance", "time", "pace", "date", "notes", "cat_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    pool
        .query(query, [req.user.id, req.body.distance, req.body.time, req.body.pace, req.body.date, req.body.note, req.body.categories])
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('Error making Posting to runs:', error);
            res.sendStatus(500);
        });

    // this is to post into the runs_categories table not entirely sure how it is going to work ... 
    // need the run id that is created when run ^^^ is posted 
    // const query2 = `INSERT INTO "runs_categories" ("run_id", "cat_id")
    //     VALUES($1, $2);`;
    // for (let cat of req.body.categories){
    //     pool   
    //         .query(query2, [])
    // }
});

// router.post('/cat'), rejectUnauthenticated, (req, res) => {
//     console.log("in posting cat", req.body, req.user.id);
//     const query = `INSERT INTO "runs_categories" ("user_id", "cat_id")
//     VALUES($1, $2);`;
//     for (let cat of req.body){


//         // pool
//         //     .query(query, [req.user.id, cat] )
//     }
// }
//delete
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in delete', req.params.id)
    const query = `DELETE FROM runs WHERE runs.id = $1;`
    pool
        .query(query, [req.params.id])
        .then((response) => res.sendStatus(200))
        .catch(error => {
            console.log(`Error deleting run`, error);
            res.sendStatus(500);
        });
})
//update
router.put('/:id', rejectUnauthenticated, (req, res) => {
    const body = req.body;
    const user = req.user.id;
    const run_id = req.params.id;
    console.log('in update, body, user, id', body, user, run_id );
    query = `UPDATE runs SET 
	"distance" = $1, 
	"time" = $2, 
	"pace" = $3, 
	"date" = $4, 
	"notes" = $5,
	"cat_id" = $6 
	WHERE runs.id = $7 AND runs.user_id = $8;`;
    pool.query(query, [body.distance, body.time, body.pace, body.date, body.note, body.cat_id, run_id, user])
        .then(response => res.sendStatus(200))
        .catch(error => {
            console.log(`Error updating run`, error);
            res.sendStatus(500);
        });
})

module.exports = router;
