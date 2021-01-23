class Food{
    constructor(){
this.image = loadImage("images/milk.png");
this.foodStock =0; 
this.lastFed;
}
updateFoodStock(foodStock){
    this.foodStock = foodStock;
  }
getFedTime(lastFed){
    this.lastFed=lastFed;
  }

deductFood(){
    if(this.foodStock>0){
     this.foodStock=this.foodStock-1;
    }
   } 

getFoodStock(){
 return this.foodStock;
}

bedroom(){
    background(bedroomImage,550,500);
}
garden(){
    background(gardenImage,550,500);
}
washroom(){
    background(washroomImage,550,500);
}
display(){
    background(46,139,87);

    var x=70, y=100;
    imageMode(CENTER);
    if(this.foodStock!=0){
    for(var i=0; i<this.foodStock; i++){
        if(i%10==0){
            x=70;
            y=y+50;
        }
        image(this.image,x,y,50,50);
        x=x+30;
    }
    }
}
}