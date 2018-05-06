/* global $ */

var question = 1;
var num_questions = 0;

const wait = 300;
const width = screen.width;
const height = screen.height;

var back = document.getElementById('background');
back.width = width;
back.height = height;
var con = back.getContext('2d');




function triFrac(x1, y1, x2, y2, x3, y3, n, n1, delay){
    
    var triangles = [[[x1, y1], [x2, y2], [x3, y3]]];

    for (var k = n; k < n1; k ++){
        var newTriangles = [];
        for (var x = 0; x < triangles.length; x ++) {
            
            var t = triangles[x];
        
            var X1 = (t[1][0] + t[2][0])/2;
            var Y1 = (t[1][1] + t[2][1])/2;
            var X2 = (t[2][0] + t[0][0])/2;
            var Y2 = (t[2][1] + t[0][1])/2;
            var X3 = (t[0][0] + t[1][0])/2;
            var Y3 = (t[0][1] + t[1][1])/2;
            con.beginPath();
            con.moveTo(X1, Y1);
            con.lineTo(X2, Y2);
            con.lineTo(X3, Y3);
            con.fill();
            
            var t1 = [[t[0][0], t[0][1]], [X2, Y2], [X3, Y3]]
            var t2 = [[X1, Y1], [t[1][0], t[1][1]], [X3, Y3]]
            var t3 = [[X1, Y1], [X2, Y2], [t[2][0], t[2][1]]]
            newTriangles.push(t1)
            newTriangles.push(t2)
            newTriangles.push(t3)
        }
        triangles = newTriangles;
    }
        
}

var x1 = width/2-10;
var y1 = 600 - 300*Math.sqrt(3);
var x2 = width/2 - 310;
var y2 = 500;
var x3 = width/2 + 290;
var y3 = 500;

function reset(){
    con.fillRect(0,0,width,height);
    con.beginPath();
    con.fillStyle = '#ffffff';
    con.moveTo(x1, y1);
    con.lineTo(x2, y2);
    con.lineTo(x3, y3);
    con.fill();
    con.fillStyle = '#070000';
}

reset();

triFrac (x1, y1, x2, y2, x3, y3, 0, 2, 0)

var counter = 2



$('.que').each(function(index){
    num_questions += 1;
    $(this).css("display", 'none');
    $(this).css("left", '50%');
    $(this).css("top", '50%');
    $(this).css('transform','translate(-50%, -50%)');
    $(this).css("margin", 'auto');
    $(this).css("position", 'absolute');
});

var data = new Array(num_questions).fill(''); 

function show(i){
    $('#' + i.toString()).fadeIn(wait);
}

function hide(i){
    $('#' + i.toString()).fadeOut(wait);
}

function showFractal(){
    console.log('fuck');
    return;
}


function next(){
    
    
    hide(question);
    data[question-1] = $('input')[question-1].value;
    question += 1;
    if (question > num_questions) {
        showFractal()
    } else {
        setTimeout(function() {show(question)}, wait);
    }
}

function back(){
    if (question > 1) {
        hide(question);
        question -= 1;
        setTimeout(function() {show(question)}, wait);
    }
}



function handleKeypress(e){
    if (e.keyCode == '13') {
        next()
    } 
}



$('.go').click(next)
$('.back').click(back)

show(question);

document.onkeydown = handleKeypress;
