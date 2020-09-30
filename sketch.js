let p;
let cyclic_t;
let myAsciiArt;
let asciiart_width = 160; let asciiart_height = 80;

const Y_AXIS = 1;
const X_AXIS = 2;

let c1, c2;

var num = 150;
var noiseScale=500, noiseStrength=1;
var particles = [num];
var speed = 20;


function setup() {

  c1 = "#FFEFBA";
  c2 = "#b8eefa";
  createCanvas(window.innerWidth, window.innerHeight);
  p = createGraphics(window.innerWidth, window.innerHeight);
  p.noStroke();

  for (let i=0; i<num; i++) {
    //x value start slightly outside the right of canvas, z value how close to viewer
    var loc = p.createVector(p.random(width*1.2), p.random(height), 2);
    var angle = 0; //any value to initialize
    var dir = p.createVector(p.cos(angle), p.sin(angle));
    var speed = p.random(0.5,2);
    // var speed = random(5,map(mouseX,0,width,5,20));   // faster
    particles[i]= new Particle(loc, dir, 4);
  }

  gfx = createGraphics(asciiart_width, asciiart_height);
  gfx.pixelDensity(1);
  myAsciiArt = new AsciiArt(this);
  textAlign(CENTER, CENTER); textFont('DM Mono', 8); textStyle(NORMAL);
  noStroke(); fill(0);
  frameRate(10);
}

function draw() {
  // setGradient(0, 0, width, height, c1, c2, Y_AXIS);
  background(0, 0, 255)

  p.fill(0, 10);
  p.noStroke();
  p.rect(0, 0, width, height);
  for (let i=0; i<particles.length; i++) {
    particles[i].run();
  }

  gfx.image(p, 0, 0, gfx.width, gfx.height);
  gfx.filter(POSTERIZE, 5);
  ascii_arr = myAsciiArt.convert(gfx);
  myAsciiArt.typeArray2d(ascii_arr, this);
  tint(255, pow(1.0 - (cyclic_t % 1.0), 4) * 255);
  image(p, 0, 0, width, height);
  noTint();

  // image(p, 0, 0);
}

class Particle{
  constructor(_loc,_dir,_speed){
    this.loc = _loc;
    this.dir = _dir;
    this.speed = _speed;
  	// var col;
  }
  run() {
    this.move();
    this.checkEdges();
    this.update();
  }
  move(){
    let angle=p.noise(this.loc.x/noiseScale, this.loc.y/noiseScale, frameCount/noiseScale)*TWO_PI*noiseStrength; //0-2PI
    this.dir.x = p.cos(angle);
    this.dir.y = p.sin(angle);
    var vel = this.dir.copy();
    var d = 1;  //direction change
    vel.mult(this.speed*d); //vel = vel * (speed*d)
    this.loc.add(vel); //loc = loc + vel
  }
  checkEdges(){
    //float distance = dist(width/2, height/2, loc.x, loc.y);
    //if (distance>150) {
    if (this.loc.x<0 || this.loc.x>width || this.loc.y<0 || this.loc.y>height) {
      this.loc.x = p.random(width*1.2);
      this.loc.y = p.random(height);
    }
  }
  update(){
    p.fill(255);
    p.ellipse(this.loc.x, this.loc.y, this.loc.z * 15);
  }
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(color(c1), color(c2), inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(color(c1), color(c2), inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
