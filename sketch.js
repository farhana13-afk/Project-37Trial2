//Create variables here
var dog, database, foodS, foodStock;
var feed, addFood;
var fedTime, lastFed, currentTime;
var foodObj;
var gameState = "Hungry";
var changeState, readingState;
var bedroom, garden, washroom;
var bedroomImage, gardenImage, washroomImage; 
function preload()
{
  //load images here
  dogI = loadImage("images/Dog.png");
  dogHappy = loadImage("images/Happy.png");
  bedroomImage = loadImage("images/Bed Room.png"); 
  gardenImage = loadImage("images/Garden.png"); 
  washroomImage = loadImage("images/Wash Room.png");
}

function setup() {
  database = firebase.database();
  createCanvas(550, 500);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value", readStock);

  readState=database.ref('gameState'); 
  readState.on("value", function(data){
     gameState = data.val();
  })

  dog = createSprite(350,250,50,100);
  dog.addImage(dogI);
  dog.scale=0.3; 

  feed = createButton("Feed the Dog")
  feed.position(555,65);
  feed.mousePressed(feedDog);

  addFeed = createButton("Add Food")
  addFeed.position(655,65);
  addFeed.mousePressed(addFood);
 
}


function draw() { 
  if(foodObj.getFoodStock() === 10){
     update("Playing"); 
     foodObj.garden();
     fill("black");
     textSize(25);
     stroke=("black");
     text("I AM FULL AND READY TO PLAY!!", 30, 90);
     text("Get my food level to 15,", 30, 110);
     text("I will start getting ready for bed.",30, 130);
   } else if(foodObj.getFoodStock() === 20){
     update("Sleeping"); 
     foodObj.bedroom();
     fill("black");
     textSize(25);
     stroke=("black");
     text("I AM FULL AND READY TO GO TO BED!!", 30, 90);
   }else if(foodObj.getFoodStock() === 15){
     update("Bathing");
     foodObj.washroom();
     fill("black");
     textSize(25);
     stroke=("black");
     text("I AM FULL AND READY TO SHOWER!!", 30, 90);
     text("Get my food level to 20, I will go to bed.", 30, 110);
   }else{
     update("Hungry");
     foodObj.display();
   } 

   if(gameState != "Hungry"){
    dog.remove();
  }else if (gameState === "Hungry"){
    dog.addImage(dogI);
    dog.scale=0.3; 
  }


  drawSprites();
  //add styles here
   textSize(20);
   fill("black");
   stroke=("black");
   text("Food:" + foodS, 450, 35);
  
}

function feedDog(){
  dog.addImage(dogHappy);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    gameState:"Hungry"
  })
}

function addFood(){
   foodS++; 
   database.ref('/').update({
     Food:foodS
   })
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}