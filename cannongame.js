var canvas = document.getElementById("canvas");
var ctx=canvas.getContext('2d');
var gun={
		x:265,
		y:670,
		w:70,
		h:20
}
var rate=9;
var bu=[];
var lim=150;
var score={
		val:0,
		id:'Game '
};
var colors=['red','orange','green','blue','indigo','purple'];
function genBu()
{
var bullet={
		x:300,
		y:665,
		radius:10};
bullet.x=gun.x+35;
bu.push(bullet);
};

function menu()
{
      bgDraw();
	  ctx.fillStyle = '#FFF700';
	  ctx.font = '38px Arial';
	  ctx.textAlign = 'center';
	  ctx.fillText('WATCH OUT !!', canvas.width / 2, canvas.height / 4);
	  ctx.font = '28px Arial';
	  ctx.fillText('Click to Start', canvas.width / 2, canvas.height / 2);
	  ctx.font = '24px Arial';
	  ctx.fillText('CONTROLS-', canvas.width / 2, (canvas.height / 4) * 3);
	  ctx.fillText('1.Left arrow / A for left movement', canvas.width / 2, ((canvas.height / 4) * 3)+30);
	  ctx.fillText('2.Right arrow / D for left movement', canvas.width / 2, ((canvas.height / 4) * 3)+60);
	  canvas.addEventListener('click', start);
}
function start()
{  
	draw();
	canvas.removeEventListener('click',start);
}

function bgDraw()
{
ctx.fillStyle="black";
ctx.fillRect(0,0,600,900);
}
var stop=false;
function scr()
{
  score.val=bu.length;
  if(score.val>lim)
	  {
	  rate--;
	  lim+=150;
	  }
  ctx.fillStyle='white';
  ctx.font='24px serif';
  ctx.textBaseline='middle';
  ctx.fillText('Score: '+score.val,45,17);
}
function cannonDraw()
{   ctx.beginPath();
	ctx.fillStyle='white';
	ctx.fillRect(gun.x,gun.y,gun.w,gun.h);
	ctx.closePath();
	for(var k=0;k<obs.length;k++)
		{
		if(gunColl(obs[k]))
			stop=true;
		}
}

document.addEventListener('keydown',function(event){
	console.log(event.key,event.keyCode);
      if(event.keyCode==65 || event.keyCode==37)
    	  {
    	  if(gun.x>5)
    		  gun.x-=10;
    	  }
      else if(event.keyCode==68 || event.keyCode==39)
    	  {
    	  if((gun.x+70)<595)
    		  gun.x+=10;
    	  }
});

document.addEventListener('keyup',function(event){
	console.log(event.key,event.keyCode);
      if(event.keyCode==65 || event.keyCode==37)
    	  {
    	  if(gun.x>5)
    		  gun.x-=10;
    	  }
      else if(event.keyCode==68 || event.keyCode==39)
    	  {
    	  if(gun.x+70<595)
    		  gun.x+=10;
    	  }
});
var obs=[];
var orient=0;

function genRock()
{ orient++;
     var rock={
		        x:5,
		        y:150,
		        t:0,
		        lr:0,
		        dx:2,
		        dy:6,
		        color:colors[Math.floor(Math.random()*6)],
		        strength:Math.floor(Math.random()*100+70)
              };
obs.push(rock);
}

function drawRock()
{
	for(var j=0;j<obs.length;j++)
		{
		  ctx.beginPath();
		  ctx.arc(obs[j].x,obs[j].y,(obs[j].strength)*0.3,0,2*Math.PI);
		  ctx.fillStyle=obs[j].color;
		  ctx.fill();
		  ctx.closePath();
		  ctx.fillStyle='white';
		  ctx.textBaseline='middle';
		  ctx.font='22px Arial';
		  ctx.fillText(obs[j].strength,obs[j].x-5,obs[j].y);
		
     if(obs[j].x+(obs[j].strength)*0.3>=0 )
    	 {
    	 obs[j].x+=obs[j].dx;
    	 obs[j].y+=obs[j].dy;
    	 }
     else if(obs[j].x-(obs[j].strength)*0.3<=0)
     { 
     console.log("in new else");
     obs[j].dx*=-1;
     obs[j].x+=obs[j].dx;     
     }
     
     if(obs[j].x+(obs[j].strength)*0.3>600)
     { obs[j].dx*=-1;
     obs[j].x+=obs[j].dx;
     obs[j].y+=obs[j].dy;
     }
     
     if(obs[j].y-(obs[j].strength)*0.3<=0)
		{obs[j].dy*=-0.6;
		obs[j].y+=obs[j].dy;
		}
    		
	if(obs[j].y+(obs[j].strength)*0.3>=700)
		{obs[j].dy*=-0.7;
		obs[j].y+=obs[j].dy;
		}
	
     }
}
function bulletDraw()
{   for(var i=0;i<bu.length;i++)
     {ctx.beginPath();
     ctx.arc(bu[i].x,bu[i].y,8,0,2*Math.PI);
     ctx.fillStyle='red';
     ctx.fill();
     ctx.closePath();
     bu[i].y-=4;}
}
var a=-1;

function bulletColl()
{
	for(var i=0;i<obs.length;i++)
		{
		     for(var j=0;j<bu.length;j++)
		    	 {   var sumofradii=(obs[i].strength*0.3)+bu[j].radius ;
		    	     var dcX=obs[i].x-bu[j].x;
		    	     var dcY=obs[i].y-bu[j].y;
		    	     if(dcX*dcX + dcY*dcY <= sumofradii*sumofradii)
		    	     { obs[i].strength-=5;
		    	     bu.splice(j,1);
		    	     if(obs[i].strength<=0)
		    	    	 obs.splice(i,1);
		    	     }
		    	 }
		}
}

var g;
var ctr=0;
var point=[];
function over()
{   
	ctr=localStorage.getItem('ctr');
	ctr++;
	ctx.clearRect(0,0,600,700);
	bgDraw();
	score.id+=ctr;
	localStorage.setItem('ctr',ctr);
	localStorage.setItem(score.id,JSON.stringify(score));
	ctx.fillStyle='white';
	ctx.font = '36px Arial';
	ctx.textAlign='center';
	ctx.fillText('GAME OVER :(',300,100);
	ctx.fillStyle='red';
	ctx.font ='28px Arial';
	ctx.fillText('This Run '+score.val,300,150);
	ctx.fillStyle='white';
	ctx.font ='28px Arial';
	var pos=225;
	ctx.fillText('Past HighScores',300,pos);
	for(var j=0;j<localStorage.length;j++)
		{ 
		    var key=localStorage.key(j);
		    if(key.substring(0,4)=='Game')
		      {
		    	var q=JSON.parse(localStorage.getItem(key));
		        point.push(q);
		      }
		}
	point.sort(function(a,b){return b.val-a.val;});
	pos+=50;
	for(var k=0;k<point.length;k++)
		{
		    ctx.fillText(point[k].id+'   '+point[k].val,300,pos);
		    pos+=25;
		}
	pos+=25;
	ctx.fillText('Click to go back to Main Menu',300,pos);
	console.log(point);
	canvas.addEventListener('click',function(){
		if(confirm('Do you want to clear your past scores ?'))
			localStorage.clear();
		location.reload();});	
}

function gunColl(circle)
{
	
		if(circle.y+circle.strength*0.3>=670)
			{
			    if(circle.x>gun.x && (circle.x+circle.strength*0.3)<=gun.x+70)
			    	return true;
			    else
			    	if(circle.x>gun.x && (circle.x-circle.strength*0.3)<=gun.x+70)
			    		return true;
			}
		else
			return false;
		
}

function draw()
{  
	a++;
	bgDraw();
	cannonDraw();
	if(a%rate==0)
	genBu();
	bulletDraw();
	if(a%350==0)
		genRock();
	bulletColl();
	drawRock();
	scr();
	if(!stop)
	g=requestAnimationFrame(draw);
	else
		{
		over();
		canceAnimationFrame(g);
		}
}
menu();
canvas.focus();
