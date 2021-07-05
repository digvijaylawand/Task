var sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "userdb.sqlite"
let db = new sqlite3.Database(DBSOURCE, (err) => {
 if (err) {
 console.error(err.message)
 throw err
 }else{
 console.log('Connected to the SQLite database.')
 db.run(`CREATE TABLE user (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 fname text,
 lname text,
 email text,
 mobile integer,
 age integer,
 image text,
 country text,
 state text,
 address text,
 address1 text,
 address2 text,
 ischeck integer
 )`,
 (err) => {
 if (err) {
 console.log(err);
 }else{
 var insert = 'INSERT INTO user (fname, lname, email, mobile, age, image, country, state, address, address1, address2, ischeck) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
db.run(insert, ['Digvijay', 'Lawand', 'lawanddigvijay25@gmail.com', 8379933665, 23, '', 'India', 'Maharashtra', 'tal khatav dist satara', '', '', 0])
 
 }
 });
 }
});
module.exports = db