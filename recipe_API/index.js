//?Importing Our Packages
import express from 'express';
import bodyParser from 'body-parser';

//This is creating a "express" APP
const app = express();
const port = 3000;
//import router from './app/routes/router';

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})

//app.use('/api', router);
app.use(bodyParser.json());