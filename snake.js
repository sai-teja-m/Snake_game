//used basic concepts like OOPS,Event listeners, DOM in JS
// Basic Data Structures (arrays) 

function init(){
    canvas = document.getElementById('mycanvas');       //to draw 
    W=canvas.width=screen.availWidth*0.65;
    H=canvas.height= screen.availHeight*0.80;
    cs=30;  //cell size for each snake block

    gameend="false";                                        //to end the game when it touches the border
    score= 10;                                      
    
    food_img=new Image();                               //for food
    food_img.src = "images/frog.png";                          //image

    bowl= new Image();                                  //for trophy
    bowl.src = "images/bowl.png";                              // image

    food = getRandFood();                               //getting random coordinates of food

    pen=canvas.getContext('2d');                        //to draw on canvas
    Snake={                                             //snake object
        //color:"blue",
        init_len:2,                                     //initial lenth of snake
        direction:"None",                               //so that it doesnt move at start
        arr:[],                                         //for storing cordnates 
        
        createSnake:function(){                         //
            for(var i=this.init_len;i>0;i--){
                this.arr.push({x:i,y: 0});            //initializing snake with push 2,0 and 1,0 into array arr
            }
        },
        drawSnake:function(){
                pen.fillStyle="rgb(59, 58, 51)";                   //snake colour
                for(var i=0;i<this.arr.length;i++){         
                    pen.fillRect(this.arr[i].x *cs,this.arr[i].y*cs,cs-2,cs-2);         // if not multiplied we get one on another
                }                                                                       // eg 1,0 will turn into 30,0 and 2,0 into 60,0 it will like blocks
        },
        updateSnake:function(){
                
            if(this.direction!="None"){
                //this.arr.pop();
                
                var headX=this.arr[0].x;                                //curr head coordinates
                var headY=this.arr[0].y;
                if( headX==food.x && headY == food.y){                  //for updating score and updating the coord of food 
                    food= getRandFood();
                    score=score+10;                      //increasing socre everytime it eats
                }
                else{
                    this.arr.pop();                                 //we dont want to dec the size of snake when it eats food.
                }                                                   //when we update the move we add one block at beginning and remove at end

                var nextX,nextY;
                if(this.direction=="right"){
                    nextX= headX+1;
                    nextY= headY;
                }
                else if(this.direction=="left"){
                    nextX= headX-1;
                    nextY= headY;
                }
                else if(this.direction=="top"){
                    nextX= headX;
                    nextY= headY-1;
                }
                else if(this.direction=="bottom"){ 
                    nextX= headX;
                    nextY= headY+1;
                }
                this.arr.unshift({x:nextX,y:nextY});            //adding block at start
                
            }
            
            if(this.arr[0].x <0 ||this.arr[0].x >= Math.round(W/cs) || this.arr[0].y <0 ||this.arr[0].y >= Math.round(H/cs)){
                gameend="true";                                 //if snake touch the border
            }
        }

    }

    Snake.createSnake();                                //creating the snake 
    //function keypressed(event)

    
    document.addEventListener('keydown',function(event){                   //event listener for keydown (direction) 
            if(event.key=="ArrowRight"){
                Snake.direction="right";
            }
            else if(event.key=="ArrowLeft"){
                Snake.direction="left";
            }
            else if(event.key=="ArrowUp"){
                Snake.direction="top";
            }
            else if(event.key=="ArrowDown"){
                Snake.direction="bottom";
            }
            //console.log(Snake.direction);
    });

}

init();

function getRandFood(){
    foodX=Math.round(Math.random()*(W-cs)/cs);                      //generating coord of food randomly
    foodY=Math.round(Math.random()*(H-cs)/cs);
    var food={                                                      
        x:foodX,
        y:foodY,
    }
    return food;
}

function draw(){
    pen.clearRect(0,0,W,H);             //removing older canvas and drawing new else we will also have older version of canvas i.e snake upgrade unexpectedly
    Snake.drawSnake();                  
    
    pen.drawImage(food_img,food.x *cs,food.y *cs,cs,cs);    //food
    pen.drawImage(bowl,35,25,2*cs,cs);      //trphy dimensions
    
    pen.fillStyle="red";                //for score
    pen.font ="20px Roboto";            //for score
    pen.fillText(score,50,50);         //score dimensions
}
function update(){
    Snake.updateSnake();                //updating snake
}



function gameloop(){                    //gameloop
    if(gameend=="true"){
        clearInterval(f);               //if game ends it shld clear the interval (or) say stop updating 
        alert("GAME OVER\n TO PLAY AGAIN REFRESH");
    }

    draw();
    update();
}

f=setInterval(gameloop,200);            // for the pace to update 
