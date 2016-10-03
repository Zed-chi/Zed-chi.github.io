/*declaring VARS*/
var YouStats=0;
var ComputerStats=0;
var ai = {stepMap:[], stepCounter:0,name:"Computer"};
var me = {stepMap:[], stepCounter:0,name:"You"};
var stepCounter = 0;
var sighMe;
var sighAi;
var choosedComb;
var winCombs =[ [1,2,3],[4,5,6],[7,8,9],[1,4,7],
                [2,5,8],[3,6,9],[1,5,9],[7,5,3]];
var finalStep=9;
var win=0;
  
/*end*/

/*declaring functions*/

//***Start
function init(){
    ai = {stepMap:[], stepCounter:0,name:"Computer"};
    me = {stepMap:[], stepCounter:0,name:"You"};
    stepCounter = 0;
    sighMe="";
    sighAi="";
    choosedComb="";
    winCombs =[ [1,2,3],[4,5,6],[7,8,9],[1,4,7],
                [2,5,8],[3,6,9],[1,5,9],[7,5,3]];
    finalStep=9;
    win=0; 
    document.getElementById("Computer").innerHTML=ComputerStats;
    document.getElementById("You").innerHTML=YouStats; 
    document.getElementById("endMessage").style.display="none";
    document.getElementById("tiles").style.display="none";
    document.getElementById("end").style.display="none";
    document.getElementById("glyphSelect").style.display="block";
}
function fistStep(){
    var first = Math.floor(Math.random()*2+1);
    if(first==2){setAI();}
}
function selectX(){
    sighMe="x";sighAi="o";
    document.getElementById("glyphSelect").style.display="none";
    document.getElementById("tiles").style.display="table";
    fistStep();
}
function selectO(){
    sighMe="o";sighAi="x";
    document.getElementById("glyphSelect").style.display="none";
    document.getElementById("tiles").style.display="table";
    fistStep();
}

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
    else{modal("endMessage","block","Game Over");gameOver();}
}    
function modal(id,option,message){
    document.getElementById("tiles").style.display="none";
    document.getElementById(id).style.display=option;
    document.getElementById("message").innerHTML=message;
}
function checkWin(guy){
    for (var i=0; i<winCombs.length; i++){
        var isWinNow=0;
        for(var j=0; j<guy.stepMap.length; j++){
            if( winCombs[i].indexOf(guy.stepMap[j])>-1 ){isWinNow++;}
        }
        
        if(isWinNow===3){
            win = 1;
            modal("endMessage","block",guy.name+" WIN");
            eval(guy.name+"Stats++");
        }
        else{
            if(stepCounter===9 && win===0){
                modal("endMessage","block","Game Over");}
        }
    }
}

function cont(){
    reset();
}
function end(){
    modal("endMessage","none");
    modal("end","block");
    document.getElementById("over").innerHTML="Game Over";
    YouStats=0;
    ComputerStats=0;
}
function reset(){
init();
    for (var k = 1; k<10;k++){
        document.getElementById(k).innerHTML = "";
    }
}

function analizeWinCombs(){
    var ai=0;
    var empty=0;
    var me=0;
    
    for(var i=0;i<winCombs.length;i++){
        ai=0;
        empty=0;
        me=0;
        for(var j=0;j<3;j++){
            var x = winCombs[i][j];
            if(document.getElementById(x).innerHTML===sighAi){ai++;}
            else if(document.getElementById(x).innerHTML===""){empty++;}
            else{me++;}
        }
        if( (ai===2&&empty===1) ){
            choosedComb=i;
            return true;
        }
    }
    
    for(i=0;i<winCombs.length;i++){
        ai=0;
        empty=0;
        me=0;
        for(j=0;j<3;j++){
            var x = winCombs[i][j];
            if(document.getElementById(x).innerHTML===sighAi){ai++;}
            else if(document.getElementById(x).innerHTML===""){empty++;}
            else{me++;}
        }
        if( (me===2&&empty===1) ){
            choosedComb=i;
            return true;
        }
    }
    
    for(i=0;i<winCombs.length;i++){
        ai=0;
        empty=0;
        me=0;
        for(j=0;j<3;j++){
            var x = winCombs[i][j];
            if(document.getElementById(x).innerHTML===sighAi){ai++;}
            else if(document.getElementById(x).innerHTML===""){empty++;}
            else{me++;}
        }
        if( (ai>=1&&empty>=1) ){
            choosedComb=i;
            return true;
        }
    }
    //alert(choosedComb);
}

function makeChoice(){
    var a = winCombs[choosedComb];
    for(var i=0; i<3;i++){
        if(!document.getElementById(a[i]).innerHTML){
            return a[i];
        }
    }
    
}

function setAI(){
    if(stepCounter<finalStep){
        var isChecked = false;
        while(!isChecked){
            if(stepCounter<3){var x = Math.floor(Math.random()*9)+1;}
            else{analizeWinCombs();var x = makeChoice();}
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
    else{modal("endMessage","block","Game Over");}
}


window.onload=init;