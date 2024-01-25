let canvas=document.querySelector('canvas');
let ctx=canvas.getContext('2d');

let boardWidth=1000;
let boardHeight=500;

let cellSize=50;

let snakeCells=[[0,0]];

let foodCell=generateRandomCell();
let direction='right';

let gameOver=false;

let score=0;

document.addEventListener('keydown',function(e)
{
    if(e.key=='ArrowLeft' && direction!='right')
    {
        direction='left';
    }else
    if(e.key=='ArrowUp' && direction!='down')
    {
        direction='up';
    }else
    if(e.key=='ArrowRight' && direction!='left')
    {
        direction='right';
    }else
    if(e.key=='ArrowDown' && direction!='up')
    {
        direction='down';
    }
})

// snake run with a speed of 2ms
let intervalId=setInterval(function(){
    update();
    draw();
},200);

function update()
{
    let headX=snakeCells[snakeCells.length-1][0];
    let headY=snakeCells[snakeCells.length-1][1];

    let newHeadX;
    let newHeadY;

    if(direction=='left')
    {
        newHeadX=headX-cellSize;
        newHeadY=headY;

        if(newHeadX<0 || checkmate(newHeadX,newHeadY))
        {
            gameOver=true;
        }
    }else
    if(direction=='right')
    {
        newHeadX=headX+cellSize;
        newHeadY=headY;

        if(newHeadX>=boardWidth || checkmate(newHeadX,newHeadY))
        {
            gameOver=true;
        }
    }else
    if(direction=='up')
    {
        newHeadX=headX;
        newHeadY=headY-cellSize;

        if(newHeadY<0 || checkmate(newHeadX,newHeadY))
        {
            gameOver=true;
        }
    }else 
    if(direction=='down')
    {
        newHeadX=headX;
        newHeadY=headY+cellSize;

        if(newHeadY>=boardHeight || checkmate(newHeadX,newHeadY))
        {
            gameOver=true;
        }
    }

    snakeCells.push([newHeadX,newHeadY]);

    if(newHeadX==foodCell[0] && newHeadY==foodCell[1])
    {
        foodCell=generateRandomCell();
        score+=1;
    }else{
        snakeCells.shift();
    }
}


function draw()
{
    if(gameOver==true)
    {
        clearInterval(intervalId);
        ctx.fillStyle='red';
        ctx.font='50px sans-serif';
        ctx.fillText("Game Over!!",300,250);
        return;
    }

    ctx.clearRect(0,0,boardWidth,boardHeight);
    // for drawing snake
    for(let item of snakeCells)
    {
        ctx.fillStyle="brown";
        ctx.fillRect(item[0],item[1],cellSize,cellSize);
        ctx.strokeStyle="white";
        ctx.strokeRect(item[0],item[1],cellSize,cellSize);
    }

    //for draw food
    ctx.fillStyle='yellow';
    ctx.fillRect(foodCell[0],foodCell[1],cellSize,cellSize);

    ctx.font='22px cursive';
    ctx.fillText(`score:${score}`,30,30);

}

function generateRandomCell()
{
    // return[
    //     Math.round((Math.random()*(boardWidth-cellSize))/cellSize)*cellSize,
    //     Math.round((Math.random()*(boardHeight-cellSize))/cellSize)*cellSize,
    // ];

    while(true)
    {
         let newFood=[
                 Math.round((Math.random()*(boardWidth-cellSize))/cellSize)*cellSize,
                 Math.round((Math.random()*(boardHeight-cellSize))/cellSize)*cellSize,
            ];
            let flag=false;
            for(let item of snakeCells)
            {
                if(item[0]==newFood[0] && item[1]==newFood[1])
                {
                    flag=true;
                    break;
                }
            }
            if(flag==false)
            {
                return newFood;
            }
    }
}

function checkmate(newHeadX,newHeadY)
{
    for(let item of snakeCells)
    {
        if(newHeadX==item[0] && newHeadY==item[1])
        {
            return true;
        }
    }

    return false;
}



