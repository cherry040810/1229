var face_x =[]
var face_y =[]
var face_size =[]
var face_num = 1
var song
var songIsplay=false
var amp
var vol=0
var m_x,m_y
var music_btn,mouse_btn,Speech_btn
var musicIsplay=true
var mouseIsplay=true
var myRec = new p5.SpeechRec();
var result


function preload(){
  song = loadSound("Auld Lang Syne - DJ Williams.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
 



  music_btn = createButton("撥放音樂")
  music_btn.position(20,10)
  music_btn.size(350, 100);
  music_btn.style('background-color', '#f1c0e8');
  music_btn.style('font-size', '40px');
  music_btn.style('color', 'white');
  music_btn.mousePressed(music_btn_pressed)

  mouse_btn = createButton("暫停")
  mouse_btn.position(370,10)
  mouse_btn.size(350, 100);
  mouse_btn.style('background-color', 'black');
  mouse_btn.style('font-size', '40px');
  mouse_btn.style('color', 'white');
  mouse_btn.mousePressed(mouse_btn_pressed)

  Speech_btn = createButton("語音辨識(撥音樂/暫停)") 
  Speech_btn.position(740,10) 
  Speech_btn.size(350, 100); 
  Speech_btn.style('background-color', '#f1c0e8'); 
  Speech_btn.style('font-size', '38px'); 
  Speech_btn.style('color', 'white');
  Speech_btn.mousePressed(Speech_btn_pressed)



}



function music_btn_pressed(){  
  song.stop()
  song.play()
  songIsplay = true
  musicIsplay=false
  amp=new p5.Amplitude()
  music_btn.style('background-color', '#f1c0e8');
  mouse_btn.style('background-color', 'black');
}

function mouse_btn_pressed(){  
  song.pause()
  mouseIsplay=true
  songIsplay = false
  music_btn.style('background-color', 'black');
  mouse_btn.style('background-color', '#00b4d8');
}

function Speech_btn_pressed(){ //語音說話
  music_btn.style('background-color', 'black');//設定按鈕顏色 
  mouse_btn.style('background-color', 'black');//設定按鈕顏色 
  Speech_btn.style('background-color', '#f1c0e8');//設定按鈕顏色 
  myRec.onResult = showResult;
  myRec.start();  
}

function showResult()
  {
      if(myRec.resultValue==true) {
      
      push()
        translate(0,0)
        background(192, 255, 192);
        fill(255,0,0)
        textStyle("italic")
        text(myRec.resultString,1200,10);
        text(myRec.resultString,0, height/2);
      pop()
      result = myRec.resultString
      console.log(1)
      console.log(myRec.resultString)
      if(myRec.resultString==="播音樂")
      {
        music_btn_pressed()
        mouseIsplay = false
        songIsplay = true
      }
      if(myRec.resultString==="暫停")
      {
        song.pause()
        mouseIsplay = true
        songIsplay = false
        }
    }
  }


function draw() {
  background("#bde0fe");
  textSize(40)
  text("X:"+mouseX+" Y:"+mouseY,50,50)
  if(songIsplay){
    vol = amp.getLevel()
    m_x =map(vol,0,1,0,width) 
    m_y= map(vol,0,1,0,height)
    
  }
  else
  if(mouseIsplay)
  {
    m_x = mouseX
    m_y= mouseY
  
  }
  
  push()
  translate(width/2,height/2)
  fill("#ffc8dd")
  ellipse(0,0,400,350)
  ellipse(100+m_x/10,-280+m_y/10,100,250) //左耳朵
  ellipse(-100+m_x/10,-280+m_y/10,100,250) //右耳朵

  fill("#ffafcc")
  ellipse(100,-250,40,130) //左耳窩
  ellipse(-100,-250,40,130)//右耳窩

  ellipse(0,0,50,30) //鼻子橢圓

  fill("#ff99c8")
 ellipse(120,0,60,60) //腮紅
  ellipse(-120,0,60,60) 

 fill(0)
ellipse(-75+map(mouseX,0,width,-20,20),-90+map(mouseY,0,height,-20,20),40)//眼睛
  ellipse(+75+map(mouseX,0,width,-20,20),-90+map(mouseY,0,height,-20,20),40)
  if(mouseIsPressed)
{
  fill(255)
  arc(0,75,200,150,0,PI)
}
else
{
  fill(255,0,0)
  arc(0,75,200,75,0,PI)
}
fill(255)
arc(0,74,200,50,0,PI)
pop()
}