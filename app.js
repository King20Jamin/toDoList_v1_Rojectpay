const express= require("express");
const bodyParser= require("body-parser");
const app= express();

let items = ["Wake up", "Eat food"];
let workItems= [];
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(res, res){

let today= new Date();
let options= {
  weekday:"long",
  day:"numeric",
  month:"long"

};

let day= today.toLocaleDateString("en-Us", options);

res.render("lists", {listTitle: day, newListItems: items});

});

app.get("/work", function(req, res){
  res.render("lists", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
res.render("about");
});

app.post("/", function(req, res){
  let item= req.body.newItem;

  if(req.body.lists === "Work List"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  };

});



app.listen(3000, function(){
  console.log("port 3000 is active !");
});
