var canvasWidth;
var canvasHeight;

function setup() {
	canvasWidth = windowWidth;
	canvasHeight = windowHeight;
	createCanvas(canvasWidth, canvasHeight);
}

playerData = [];
drawing = false;
center = {
	real: 0,
	imaginary: 0,
	view: 600,
	zoom: 1
}

function diverge(realNum, imgNum, times, bound) {
	var realZ = 0;
	var imgZ = 0;
	for (var i = 0; i < times; i ++) {
		var b = 2 * realZ * imgZ;
		realZ = realZ ** 2 - imgZ ** 2 + realNum;
		imgZ = b + imgNum;
		if (realZ ** 2 + imgZ ** 2 > bound) {
			return [true, realZ, imgZ];
			break;
		}
	}
	return [false, realZ, imgZ];
}

function julia(realZ, imgZ, realNum, imgNum, times, bound) {
	for (var i = 0; i < times; i ++) {
		var b = 2 * realZ * imgZ;
		realZ = realZ ** 2 - imgZ ** 2 + realNum;
		imgZ = b + imgNum;
		if (realZ ** 2 + imgZ ** 2 > bound) {
			return [true, realZ, imgZ];
			break;
		}
	}
	return [false, realZ, imgZ];
}

function funthings(realNum, imgNum, times, bound, realStart, imgStart, c1, c2, c3) {
	var realZ = realStart;
	var imgZ = imgStart;
	for (var i = 0; i < times; i ++) {
		var aaa = c1 * realZ ** 2 - c2 * imgZ ** 2;
		var bbb = 2 * realZ * imgZ * c3;
		realZ = aaa + realNum;
		imgZ = bbb + imgNum;
		if (realZ ** 2 + imgZ ** 2 > bound) {
			return [true, realZ, imgZ];
			break;
		}
	}
	return [false, realZ, imgZ];
}

function d3diverge(realNum, imgNum, times, bound) {
	var realZ = 0;
	var imgZ = 0;
	for (var i = 0; i < times; i ++) {
		var aaa = realZ**3 - 3*realZ*imgZ**2;
		var bbb = 3*realZ**2*imgZ - imgZ**3;
		realZ = aaa + realNum;
		imgZ = bbb + imgNum;
		if (realZ ** 2 + imgZ ** 2 > bound) {
			return [true, realZ, imgZ];
			break;
		}
	}
	return [false, realZ, imgZ];
}

function reposition(realStart, imgStart, c1, c2, c3) {
	for (i = (canvasWidth-center.view)/2; i < (canvasWidth+center.view)/2; i++) {
		for (j = (canvasHeight-center.view)/2; j < (canvasHeight+center.view)/2; j++) { 
			realNum = 4*(i-canvasWidth/2)/(center.view * center.zoom)+center.real;
			imgNum = 4*(j-canvasHeight/2)/(center.view * center.zoom)+center.imaginary;
			calc = funthings(realNum, imgNum, 500*center.zoom, 1000, realStart, imgStart, c1, c2, c3);
			if (!calc[0]) {
				stroke(0)
				point(i, j);
			} else {
				var rrr = sqrt(calc[1]**2+calc[2]**2)/1000*255;
				var aaa = sqrt((i-canvasWidth/2)**2+(j-canvasHeight/2)**2)/center.view*510;
				stroke(255-rrr, 0, rrr, 255-aaa);
				point(i, j);
			}
		}
	}
}

function repositioning() {
	for (i = (canvasWidth-center.view)/2; i < (canvasWidth+center.view)/2; i++) {
		for (j = (canvasHeight-center.view)/2; j < (canvasHeight+center.view)/2; j++) { 
			realNum = 4*(i-canvasWidth/2)/(center.view * center.zoom)+center.real;
			imgNum = 4*(j-canvasHeight/2)/(center.view * center.zoom)+center.imaginary;
			calc = d3diverge(realNum, imgNum, 400, 1000)
			if (!calc[0]) {
				stroke(0)
				point(i, j);
			} else {
				var rrr = sqrt(calc[1]**2+calc[2]**2)/1000*255;
				var aaa = sqrt((i-canvasWidth/2)**2+(j-canvasHeight/2)**2)/center.view*510;
				stroke(0, rrr, 255-rrr, 255-aaa)
				c = color('hsla('+', 100%, 50%, '+aaa+')');
				point(i, j);
			}
		}
	}
}


function mousePressed() {
	if (mouseButton == LEFT && drawing) {
		center.real += 4*(mouseX-canvasWidth/2)/(center.view * center.zoom);
		center.imaginary += 4*(mouseY-canvasHeight/2)/(center.view * center.zoom);
		center.zoom *= 2;
		background(0);
		reposition(globalData[0], globalData[1], globalData[2], globalData[3], globalData[4]);
	} else if (mouseButton == RIGHT && drawing) {
		center.zoom /= 2;
		background(0);
		reposition(globalData[0], globalData[1], globalData[2], globalData[3], globalData[4]);
	}
	
}

function submit() {

}

function keyPressed() {
  if ((keyCode === ENTER || keyCode === RETURN) && !drawing) {
  	if ($("input").is(":focus")) {
  		playerData.push($("input").val());
  		$("input").val("");
  		var lll = textForm.question.length;
  		for (var i = 0; i < lll; i++) {
  			animate(textForm.remove, i*(textForm.speed/lll))
  		}
  		sierpinski.grow = -sierpinski.radius/textForm.speed;
  		sierpinski.spin *= 4;
  		animate(function() {
  			sierpinski.iterations++;
  		}, textForm.speed)
  		animate(function() {
  			sierpinski.grow = 0;
  			sierpinski.radius = abs(sierpinski.radius);
  			sierpinski.angle += PI;
  			sierpinski.spin /= 4;
  		}, textForm.speed*2)

  		textForm.no++;
  		if (textForm.no >= questions.length-1) {
  			textForm.addText = questions[textForm.no];
  			$("input").fadeOut();
	  		lll = textForm.addText.length;
	  		for (var i = 0; i < lll; i++) {
	  			animate(textForm.add, i*(textForm.speed/lll)+textForm.speed)
	  		}
	  		for (var i = 0; i < lll; i++) {
	  			animate(textForm.remove, i*(textForm.speed/lll)+textForm.speed*5)	
	  		}
	  		animate(function() {
	  			drawing = true;
	  			background(0)
	  		}, textForm.speed*5)
  			animate(createSet, textForm.speed*6)
  		} else {
	  		textForm.addText = questions[textForm.no];
	  		lll = textForm.addText.length;
	  		for (var i = 0; i < lll; i++) {
	  			animate(textForm.add, i*(textForm.speed/lll)+textForm.speed)
	  		}
	  	}
  	} else {
    	$("input").focus();
  	}
  }
}

questions = ["Hello?", "First Name?", "Last Name?", "Year of Birth?", "Creating Your Special Set"]

var textForm = {
	no: 0,
	question: "Hello!",
	addText: "",
	speed: 60,
	remove: function() {
	    var pos = floor(random()*textForm.question.length);
	    textForm.question = textForm.question.substring(0, pos)+textForm.question.substring(pos+1);
	    $("h1").text(textForm.question);
	},
	add: function() {
	    textForm.question += textForm.addText[0];
	    textForm.addText = textForm.addText.substring(1, textForm.addText.length);
	    $("h1").text(textForm.question);
	}
}

function animate(effect, time) {
	animation.push({run: effect, time: time});
}

animation = []


sierpinski = {
	angle: 0,
	radius: 700,
	iterations: 1,
	spin: 0.02,
	grow: 0, 
	repeat: function(points, c) {
		noFill();
		stroke("lime");
		strokeWeight(2);
		triangle(points[0]+canvasWidth/2, points[1]+canvasHeight/2, points[2]+canvasWidth/2, points[3]+canvasHeight/2, points[4]+canvasWidth/2, points[5]+canvasHeight/2);
		if (c > 1) {
			newPoints = [this.m(points[0], points[4]), this.m(points[1], points[5]), this.m(points[2], points[4]), this.m(points[3], points[5]), points[4], points[5]]
			sierpinski.repeat(newPoints, c-1);
			newPoints = [points[0], points[1], this.m(points[0], points[2]), this.m(points[1], points[3]), this.m(points[0], points[4]), this.m(points[1], points[5])]
			sierpinski.repeat(newPoints, c-1);
			newPoints = [this.m(points[0], points[2]), this.m(points[1], points[3]), points[2], points[3], this.m(points[2], points[4]), this.m(points[3], points[5])]
			sierpinski.repeat(newPoints, c-1);
		}
	},
	m: function(a, b) {
		return (a+b)/2
	},
	draw: function() {
		var points = [cos(this.angle) * this.radius, sin(this.angle) * this.radius, cos(this.angle+2*PI/3) * this.radius, sin(this.angle+2*PI/3) * this.radius, cos(this.angle+4*PI/3) * this.radius, sin(this.angle+4*PI/3) * this.radius]
		sierpinski.repeat(points, this.iterations);
		this.angle += this.spin;
		this.radius += this.grow;
	}
}


var f = 0;

function draw() {
	f++;

	if (!drawing) {
		background(0)
		sierpinski.draw();
	}
	for (var i = animation.length - 1; i >= 0; i--) {
		animation[i].time--;
		if (animation[i].time <= 0) {
			animation[i].run();
			animation.splice(i,1);
		}
	}
}

globalData = []

function createSet() {
	background(0)
	data = []
	var hashingString = sha256(playerData[1]+playerData[2]+playerData[3]+playerData[4])
	var sss = (hashingString[12].indexOf("1234567") >= 0) ? -1 : 1;
	data.push(parseInt(hashingString.substring(0, 11), 16)/16**11*0.5*sss)
	var sss = (hashingString[24].indexOf("1234567") >= 0) ? -1 : 1;
	data.push(parseInt(hashingString.substring(12, 23), 16)/16**11*0.5*sss)
	var sss = (hashingString[36].indexOf("1234567") >= 0) ? -1 : 1;
	data.push(parseInt(hashingString.substring(24, 35), 16)/16**11*4*sss)
	var sss = (hashingString[48].indexOf("1234567") >= 0) ? -1 : 1;
	data.push(parseInt(hashingString.substring(36, 47), 16)/16**11*4*sss)
	var sss = (hashingString[60].indexOf("1234567") >= 0) ? -1 : 1;
	data.push(parseInt(hashingString.substring(48, 59), 16)/16**11*4*sss)
	globalData = data;
	console.log(data)
	reposition(data[0], data[1], data[2], data[3], data[4]);
}











