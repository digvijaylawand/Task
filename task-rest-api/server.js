var express = require("express")
var cors = require('cors')
var db = require("./sqlitedb.js")
var app = express()
app.use(cors());
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var HTTP_PORT = 8000
app.listen(HTTP_PORT, () => {
 console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
app.get("/", (req, res, next) => {
 res.json({"message":"Ok"})
});
app.get("/api/user", (req, res, next) => {
 var sql = "select * from user"
 var params = []
 db.all(sql, params, (err, rows) => {
 if (err) {
 res.status(400).json({"error":err.message});
 return;
 }
 res.json(rows)
 });
 });
app.get("/api/user/:id", (req, res, next) => {
 var sql = "select * from user where id = ?"
 var params = [req.params.id]
 db.get(sql, params, (err, row) => {
 if (err) {
 res.status(400).json({"error":err.message});
 return;
 }
 res.json(row)
 });
});
app.post("/api/user/", (req, res, next) => {
 var errors=[]
 if (!req.body.item){
 errors.push("No item specified");
 }
 var data = {
 fname : req.body.fname,
 lname : req.body.lname,
 email : req.body.email,
 mobile : req.body.mobile,
 age : req.body.age,
 image : req.body.image,
 country : req.body.country,
 state : req.body.state,
 address : req.body.address,
 address1 : req.body.address1,
 address2 : req.body.address2,
 ischeck : req.body.ischeck,
 }
 var sql = 'INSERT INTO user (fname, lname, email, mobile, age, image, country, state, address, address1, address2, ischeck) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
 var params =[data.fname, data.lname, data.email, data.mobile, data.age, data.image, data.country, data.state, data.address, data.address1, data.address2, data.ischeck]
 db.run(sql, params, function (err, result) {
 if (err){
 res.status(400).json({"error": err.message})
 return;
 }
 data.id = this.lastID;
 res.json(data);
 });
})
app.put("/api/user/:id", (req, res, next) => {
 var data = {
 fname : req.body.fname,
 lname : req.body.lname,
 email : req.body.email,
 mobile : req.body.mobile,
 age : req.body.age,
 image : req.body.image,
 country : req.body.country,
 state : req.body.state,
 address : req.body.address,
 address1 : req.body.address1,
 address2 : req.body.address2,
 ischeck : req.body.ischeck
 }
 db.run(
 `UPDATE user SET
 fname = ?,
 lname = ?,
 email = ?,
 mobile = ?,
 age = ?,
 image = ?,
 country = ?,
 state = ?,
 address = ?,
 address1 = ?,
 address2 = ?,
 ischeck = ?
 WHERE id = ?`,
 [data.fname, data.lname, data.email, data.mobile, data.age, data.image, data.country, data.state, data.address, data.address1, data.address2, data.ischeck, req.params.id],
 function (err, result) {
 if (err){
 console.log(err);
 res.status(400).json({"error": res.message})
 return;
 }
 res.json(data)
 });
})
app.delete("/api/user/:id", (req, res, next) => {
 db.run(
 'DELETE FROM user WHERE id = ?',
 req.params.id,
 function (err, result) {
 if (err){
 res.status(400).json({"error": res.message})
 return;
 }
 res.json({"message":"deleted", changes: this.changes})
 });
})
app.use(function(req, res){
 res.status(404);
});
