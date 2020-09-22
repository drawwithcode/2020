let p;
let cyclic_t;
let myAsciiArt;
let asciiart_width = 120; let asciiart_height = 60;

var num = 500;
var noiseScale=500, noiseStrength=1;
var particles = [num];


function setup() {
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
    particles[i]= new Particle(loc, dir, speed);
  }

  gfx = createGraphics(asciiart_width, asciiart_height);
  gfx.pixelDensity(2);
  myAsciiArt = new AsciiArt(this);
  textAlign(CENTER, CENTER); textFont('DM Mono', 8); textStyle(NORMAL);
  noStroke(); fill("#999");
  // frameRate(15);
}

function draw() {
  background("#F9F9F9")
  // for (var x = 0; x < width; x+=5) {
	// 	for (var y = 0; y < height; y+=5) {
	// 		var c = 255 * noise(0.01 * x, 0.01 * y);
	// 		p.fill(c);
	// 		p.rect(x, y, 5, 5);
	// 	}
  // 	}

  p.fill(0, 10);
  p.noStroke();
  p.rect(0, 0, width, height);
  for (let i=0; i<particles.length; i++) {
    particles[i].run();
  }

  gfx.image(p, 0, 0, gfx.width, gfx.height);
  gfx.filter(POSTERIZE, 3);
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
    p.ellipse(this.loc.x, this.loc.y, this.loc.z * 10);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
