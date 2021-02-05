const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/movies/get/all", (req, res) => {
   let sql = `SELECT * FROM movies`;

   if (req.query.movies) {
       sql = ` WHERE id = 1 ${req.query.movies}`
       
   }

   db.query(sql, (err, data) => {
       if (err) {
           return res.status(404).send(err.message);
       }
       return res.status(200).send(data);
   });
});

router.get("/movies/get/all", (req, res) => {
   let sql = `SELECT * FROM movies`;

   if (req.query.movies) {
       sql = ` WHERE id = 4${req.query.movies}`
       
   }

   db.query(sql, (err, data) => {
       if (err) {
           return res.status(404).send(err.message);
       }
       return res.status(200).send(data);
   });
});
router.post ("/movies/get/all", (req, res) => {
   let sql = `SELECT * FROM movies`;

   if (err) {
      res.status(500).send(err.message);
   } else if (req.query.movies) {
       sql = ` INSERT INTO movies (name, genre, release_date, release_month, release_year, duration_min, description) values ("Mulan", "Fantasy", 25, 3, 2020, 120, "A girl disguises ..." ${req.query.movies}`
       
   }

   db.query(sql, (err, data) => {
       if (err) {
           return res.status(404).send(err.message);
       }
       return res.status(200).send(data);
   });
});

router.patch
router.patch

router.get("/aktorBiodata/:id", (req, res) => {
   let sql = `SELECT * FROM aktorBiodata`;
       if(req.query.aktorBiodata) {
           sql = `WHERE actorBiodata =
                               firstName : "PENELOPE"
                               lastName : "GUINESS"`
       }
   
       db.query(sql, (err, data) => {
           if (err) {
               return res.status(404).send(err.message);
           }
           return res.status(200).send(data);
       });
   });        

console.log(sql);

module.exports = router;