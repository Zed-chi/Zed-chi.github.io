/*declaring VARS*/
var ai = {stepMap:[], stepCounter:0,name:"AI"};
var me = {stepMap:[], stepCounter:0,name:"You"};
var stepCounter = 0;
var sighMe;
var sighAi;
var winCombs =[ [1,2,3],[4,5,6],[7,8,9],[1,4,7],
                [2,5,8],[3,6,9],[1,5,9],[7,5,3]];
var finalStep=9;
var win=0;
/*end*/

/*declaring functions*/
function set(x) {
    if(stepCounter<finalStep){
        var tile = document.getElementById(x);
        if(!tile.innerHTML) {
            stepCounter++;
            me.stepCounter++;
            me.stepMap.push(x);
            tile.innerHTML = sighMe;
            checkWin(me);
            if(win!==1){setAI();}
        }
        else{
            alert('tile is full of shi..');
        }
    }
    else{alert("over");}
}    
function setAI(){
    if(stepCounter<finalStep){
        var isChecked = false;
        while(!isChecked){
            var x = Math.floor(Math.random()*9)+1;
            //alert(x);
            var tile = document.getElementById(x);
            if(!tile.innerHTML) {
                stepCounter++;
                ai.stepCounter++;
                ai.stepMap.push(x);
                tile.innerHTML = sighAi;
                isChecked = true;
                checkWin(ai);
            }
        }
        
    }
    else{alert("over");}
}
function checkWin(guy){
    for (var i=0; i<winCombs.length; i++){
        var isWinNow=0;
        for(var j=0; j<guy.stepMap.length; j++){
            if( winCombs[i].indexOf(guy.stepMap[j])>-1 ){isWinNow++;}
        }
        
        if(isWinNow===3){
            win = 1;
            alert(guy.name+" WIN");
            gameOver();
            break;
        }
        else{
            if(stepCounter===9 && win===0){alert("over");gameOver();}
        }
    }
} 
function gameOver(){
    var promptSuccess=false;
    var again;
    //Asking U for continue
    while(!promptSuccess){
        again = prompt("New game? (y or n)");
        if(again === "y" || again === "n"){promptSuccess = true;}
        else{alert("again")}
    }
    //Stuff
    if(again === "y"){reset();}
    else{reset();document.write("OVER");}
}
function reset(){
    for (var k = 1; k<10;k++){
        document.getElementById(k).innerHTML = "";
    }
    ai.stepMap=[];
    ai.stepCounter=0;
    me.stepMap=[]; me.stepCounter=0;
    stepCounter = 0;
    win=0;
}
function type(){
    var promptSuccess=false;
	while(!promptSuccess){
	    sighMe = prompt("what kind of gliph you want (x or o)");
	    if(sighMe=="x"||sighMe=="o"){
	        promptSuccess = true;
	        sighMe==="x"?sighAi="o":sighAi="x";
	    }
	    else{alert("again");}
	}
}
/*end*/

/**************************
 * Rules of Foking WIIINN
 * ***********************/ 
/*
for(var i=0;i<me.stepMap.length; i++){
    for(var j=i+1;j<me.stepMap.length;j++){
        if(me.stepMap[j]==me.stepMap[i+6]){}
        else if(me.stepMap[j]==me.stepMap[i+3]){}
        else if(me.stepMap[j]==me.stepMap[i+1]&&(me.stepMap[i]!==3&&me.stepMap[i]!==6) ){}
        else if(me.stepMap[j]==me.stepMap[i+4]&&(me.stepMap[i]===1||me.stepMap[i]===5) ){}
        else if(me.stepMap[j]==me.stepMap[i+2]&&(me.stepMap[i]===3||me.stepMap[i]===5) ){}
        
    }
}
*/

type();