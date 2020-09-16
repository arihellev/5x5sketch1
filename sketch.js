/* eslint-disable */

let similarWords = [];

let myWord = "alone";

//portrait variables

let cam;
let step =6;
let size;

let maxB = 0;

//face track variables


function setup() {
  
  similarWords = RiTa.rhymes(myWord);
  
  createCanvas(500, 500);
  cam = createCapture(VIDEO);
  cam.hide();

  pixelDensity(1);
  noStroke();
  
  size = int(width / (cam.width / step)) / 2;
}

function draw() {
  background(255, 50);
  
  cam.loadPixels();
  
  maxB = 0;

  if (cam.pixels.length > 0) {
    for (let y = 0; y < cam.height; y += step  ) {
      for (let x = 0; x < cam.width; x += step) {
        let i = (y * cam.width + x) * 4;

        let r = cam.pixels[i];
        let g = cam.pixels[i + 1];
        let b = cam.pixels[i + 2];

        let pColor = color(r, g, b);
        let pBright = brightness(pColor);
        
        if(pBright > maxB){
          maxB = pBright;  
        }
        
        let bright = int(map(pBright, 0, maxB, 0, 9));

        let txt = "";
        
        switch (bright) {
          case 0:
            txt = "solo";
            textStyle(ITALIC);
            break;
          case 1:
            txt = "isolated";
            break;
          case 2:
            txt = "alone";
            textStyle(ITALIC);
            break;
        }
        
        let xpos = map(x, 0, cam.width, 0, width);
        let ypos = map(y, 0, cam.height, 0, height);

        fill(0, (pBright - (maxB / 9) * bright) * 20);
        textSize(size - 5);
        text(txt, xpos, ypos + size);
      }
    }
  }
}
