let p;
let cyclic_t;
let myAsciiArt;
let asciiart_width = 120; let asciiart_height = 60;


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  p = createGraphics(window.innerWidth, window.innerHeight);
  p.noStroke();

  gfx = createGraphics(asciiart_width, asciiart_height);
  gfx.pixelDensity(1);
  myAsciiArt = new AsciiArt(this);
  myAsciiArt.printWeightTable();
  textAlign(CENTER, CENTER); textFont('DM Mono', 8); textStyle(NORMAL);
  noStroke(); fill(0);
  frameRate(30);
}

function draw() {
  for (var x = 0; x < width; x+=5) {
		for (var y = 0; y < height; y+=5) {
			var c = 255 * noise(0.01 * x, 0.01 * y);
			p.fill(c);
			p.rect(x, y, 5, 5);
		}
  	}
  //
  // cyclic_t = millis() * 0.0002 % 4;

  gfx.image(p, 0, 0, gfx.width, gfx.height);
  gfx.filter(POSTERIZE, 3);
  ascii_arr = myAsciiArt.convert(gfx);
  myAsciiArt.typeArray2d(ascii_arr, this);
  tint(255, pow(1.0 - (cyclic_t % 1.0), 4) * 255);
  image(p, 0, 0, width, height);
  noTint();

  //image(p, 0, 0);
}
