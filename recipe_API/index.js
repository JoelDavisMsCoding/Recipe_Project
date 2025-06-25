//?Importing Our Packages
import {DB} from './connect.js';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
  res.status(200);
  res.send('recipes.db service is online')
});

app.get('/api/:id', (req, res) => { //Get a single recipe using the ID
  res.set('Content-Type', 'application/json');
  const recipeId = req.params.id;
  const sql = 'SELECT * FROM food_recipes WHERE id = ?';
  let data = {food_recipes: []};
  try{
    DB.get(sql, [recipeId], (err, rows)=>{
      if(err){
        throw err;
      }
      data.food_recipes.push({
        id: rows.id,
        food: rows.food,
        ingredients: rows.ingredients,
        instructions: rows.instructions,
        image_url: rows.image_url
      });
      let content = JSON.stringify(data);
      res.send(content);
    });
  }
  catch(err){
    console.log(err.message);
    res.status(467);
    res.send(`{"code":467, "status":"${err.message}"}`);
  }
});

app.get('/api', (req, res) => { //Get all the recipes so no Request is needed.
  res.set('content-type', 'application/json');
  const sql = 'SELECT * FROM food_recipes';
  let data = {food_recipes: []};
  try{
    DB.all(sql, [], (err, rows)=>{
      if(err){
        throw err;
      }
      rows.forEach(row=>{
        data.food_recipes.push({
          id: row.id,
          food: row.food,
          ingredients: row.ingredients,
          instructions: row.instructions,
          image_url: row.image_url
        });
      });
      let content = JSON.stringify(data);
      res.send(content);
    });
  }
  catch(err){
    console.log(err.message);
    res.status(467);
    res.send(`{"code":467, "status":"${err.message}"}`);
  }
});

app.post('/api', (req, res) => {
  console.log(req.body);

  res.set('content-type', 'application/json');
  const sql = 'INSERT INTO food_recipes(food, ingredients, instructions, image_url) VALUES(?, ?, ?, ?)';
  let newId;
  try{
    DB.run(sql, [req.body.food, req.body.ingredients, req.body.instructions, req.body.image_url], function(err){
      if(err) throw err;

      newId = this.lastID; //provided the auto increment integer id
      res.status(201);

      let data = {
        status: 201,
        id: newId,
        message: `Recipe ${newId} saved.`
      };
      
      let content = JSON.stringify(data);
      res.send (content);
    })
  }
  catch(err){
    console.log(err.message);
    res.status(500);
    res.send(`{"code":500, "status":"${err.message}"}`);
  }
});

app.put('/api/:id', (req, res) => { //This is how updates are handled.
  res.set('content-type', 'application/json');
  const sql = 'UPDATE food_recipes SET food = ?, ingredients = ?, instructions = ?, image_url = ? WHERE id = ?';
  try{
    DB.run(sql, [req.body.food, req.body.ingredients, req.body.instructions, req.body.image_url, req.params.id], function(err){
      if(err) throw err;
      if(this.changes === 1){//If one item was deleted run this
        res.status(200);
        res.send(`{"message": "Recipe ${req.params.id} was updated"}`);
      }
      else {
        res.status(400);
        res.send(`{"message": "No matching id for this request. No data was updated."}`);
      }
    })
  }catch(err){
    console.log(err.message);
    res.status(500);
    res.send(`{"code":500, "status":"${err.message}"}`);
  }
});

app.delete('/api/:id', (req, res) => {
  res.set('content-type', 'application/json');
  const sql = 'DELETE FROM food_recipes WHERE id = ?';
  try{
    DB.run(sql, [req.params.id], function(err){
      if(err) throw err;
      if(this.changes === 1){//If one item was deleted run this
        res.status(200);
        res.send(`{"message": "Recipe ${req.params.id} was removed from the list"}`);
      }
      else {
        res.status(200);
        res.send(`{"message": "No matching id for this request. No data was deleted."}`);
      }
    })
  }catch(err){
    console.log(err.message);
    res.status(500);
    res.send(`{"code":500, "status":"${err.message}"}`);
  }
});

const port = 3000;
app.listen(port, (err) => {
  if (err) {
    console.log('ERROR:', err.message);
  }
  console.log(`App is running on port http://localhost:${port}`);
});