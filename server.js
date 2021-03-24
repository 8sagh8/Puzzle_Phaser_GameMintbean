const express = require("express");
const exp_hbs = require ("express-handlebars");
const bodyParser = require("body-parser");

const app = express();

app.engine("handlebars", exp_hbs());
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({extended: false}));

// access static file
app.use(express.static('public'));

app.get(`/`, (req, res)=>{
    res.render('index', {
      title: "Find the path"
    });
  });

app.get(`/level_01`, (req, res)=>{
  res.render('level_01', {
    title: "Playing Game Level"
  });
});

// listening route
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
})