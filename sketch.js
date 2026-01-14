let video;
let sound
let button
let fft
let waveform
function preload(){
sound = loadSound("BaeChiGi,PUNCH -바람에 날려.mp3")

fft = new p5.FFT();



}
function setup() {

  createCanvas(windowWidth, windowHeight, WEBGL);
  video = createCapture(VIDEO);
  video.size(width, height);
  button =createButton('playMusic');
button.position(width/2,height*0.9)
button.mousePressed(playSound);
  noStroke();
}





function draw() {
   //image(video, 0, 0, 100, 100)
 background(0);
  orbitControl();
  waveform = fft.waveform();
  pointLight(255, 255, 255, width/2, height/2, 300);
  ambientLight(255);
  video.loadPixels();
  console.log(video.pixels.length, width*height*4);
  // console.log()

  let boxSize = int(map(mouseX, 0,  width, 20, 60));

  for (let y = 0; y < video.height; y += boxSize) {
    for (let x = 0; x < video.width; x += boxSize) {
      let index = (x + y * video.width) * 4;
      let r = video.pixels[index];
      let g = video.pixels[index+1];
      let b = video.pixels[index+2];
      let a = video.pixels[index+3];
      let h = 1-r/255
    let index2 =int(map(0,2*PI,0,1024))
      let curH = abs(300*waveform[index2])
    



      push();
      fill(r, g, b, a);
      translate(x - width/2, y - height/2,boxSize/2);
      box(boxSize-2, boxSize-2, random(0,h * boxSize *curH/8));
      pop();
    
    }
  }
}


function playSound(){
 if(!sound.isPlaying()){
  sound.play( );
}
}
