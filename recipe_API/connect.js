import sqlite3 from 'sqlite3';
const sql3 = sqlite3.verbose();

const DB = new sql3.Database('./recipes.db', sqlite3.OPEN_READWRITE, connected);

function connected(err) {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log('Created the DB OR SQLite DB already exist');
}

let sql = `CREATE TABLE IF NOT EXISTS food_recipes(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  food TEXT NOT NULL,
  ingredients TEXT NOT NULL
)`;

DB.run(sql, [], (err)=>{
    if(err) {
        console.log('error creating food_recipes table');
        return;
    }
    console.log('CREATED TABLE')
});

export {DB};