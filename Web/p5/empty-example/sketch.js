let angle = 0;//The angle at which the windmill rotates
let rotationSpeed = 0;//The speed at which the windmill rotates
let lightSwitch = true;//When lightSwitch is true, the color is blue, and false is the color red
let clickCounter = 0;//Statistics of mouse clicks
let colorChangeThreshold = 10; //Change the color every ten clicks

function setup() {
  createCanvas(500, 500);
}
function draw(){
    drawBackground();
    drawWindmill(angle);
    angle += rotationSpeed;
    drawText();
    drawMouse();
    console.log(rotationSpeed);
}

//Draw text
function drawText() {
    fill(255); 
    //Change the color every ten clicks
    if (lightSwitch===false) {
        fill(0);
    }
    text("Click the mouse to turn the windmill.\n Change the color every ten clicks.", 10, 10, 400, 50);
}
//Draw mouse
function drawMouse() {
    push();
    fill(5, 25, 35);
    if (lightSwitch===false) {
        fill(34, 9, 1);
    };
    rect(mouseX-20,mouseY-20,20,20);
    ellipse(mouseX,mouseY,20,20);
    noStroke()
    pop();
}
//Draw background
function drawBackground(){ 
    var circleSize = 750;
    var colorA = 0;
    background(0); //
    for(var i=0; i<10; i++){
        noStroke();
        fill(0,61,91,constrain(colorA, 100, 255));
        //Change the color every ten clicks
        if (lightSwitch===false) {
            fill(148, 27, 12,constrain(colorA, 100, 255));
        };
        ellipse(width/2, height/2, circleSize, circleSize);
        circleSize -= 100;
        colorA += 50;  
    }
//Draw the random dot background when the windmill starts turning
    if (rotationSpeed>=0.01) {
        for (let i = 0; i < 150; i++) {//amount
            if (random() > 0.99) {//speed
                fill(255);
                ellipse(random(width), random(height), 3, 3);
            }
        }
    };
};
//Draw the windmill
function drawWindmill(angle) {
// Draw windmill tower
    push();
    fill("#006494");
    //Change the color every ten clicks
    if (lightSwitch===false) {
        fill("#621708");
    };
    quad(width / 2 - 10, height / 2,width / 2 + 10, height / 2,width / 2 + 80, height,width / 2 - 80, height);
    pop();
//Draw the door of the windmill tower
    push();
    fill(0);
    rect(width / 2 - 25, height - 70, 50, 80,10); 
    pop();
//Draw random particles for the tower when the windmill starts turning
    if (rotationSpeed>=0.01) {
        push();
        for (let i = 0; i < 10; i++) {
        let x = random(235, 260);//x axis
        let y = random(250, 450);//y axis
        let w = random(1, 5); // width
        let h = random(1, 10); // height
        fill(random(255), random(255), random(255)); // 随机颜色
        rect(x, y, w, h, 10);
        }
        pop();
    };
//Draw windmill blades 
    push();
    translate(width / 2, height / 2);
    stroke("#00a6fb");
    //Change the color every ten clicks
    if (lightSwitch===false) {
        stroke("#f6aa1c");
    };
    strokeWeight(20);
    rotate(angle);
    line(0, 0, 80, 0);
    line(0, 0, -80, 0);
    line(0, 0, 0, -80);
    line(0, 0, 0, 80);
    pop();  
//Draw windmill center hub
    push();
    fill("#00798c");
    //Change the color every ten clicks
    if (lightSwitch===false) {
        fill("#bc3908");
    };
    ellipse(250,250,30,30);
    pop();
}
function mousePressed() {
//Increase the windmill rotation speed on each click
    rotationSpeed += 0.01;
    //Change the color every ten clicks
    clickCounter++;
    if (clickCounter >= colorChangeThreshold){
        lightSwitch = !lightSwitch;
        clickCounter = 0;
    };
}