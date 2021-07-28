window.saveDataAcrossSessions=true;

const LOOK_DELAY = 3000 // 1 second
const LEFT_CUTOFF = window.innerWidth / 4
const RIGHT_CUTOFF = window.innerWidth - window.innerWidth / 4
const youtubeCategories=["Comedy","Beauty","Gaming","Tech","Family","Lifestyle","Fashion","DIY","Travel","Health and Fitness","Vlogger","Cooking","Learning","Music and Dance","Pranks/Challenges","Design/Art","Sports","ASMR","Animation","Conspiracy"];
let leftCategories=[];
let rightCategories=[];
let videoCounter=0;
var videoLinks='';


function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


let startLookTime = Number.POSITIVE_INFINITY
let lookDirection = null
var filename= location.pathname.split('/').pop();

if (filename=="ytcategory"){
  let cats=youtubeCategories;
  shuffle(cats);
  console.log(cats);
  var indexToSplit = cats.length/2;
  leftCategories = cats.slice(0, indexToSplit);
  rightCategories= cats.slice(indexToSplit + 1);
  printCategories();
}



if (location.pathname.includes("ytplay")){
  var myVar=''
  fetch('/getnextlink')
        .then(function (response) {
            return response.json();
        }).then(function (text) {
            myVar=text.url; 
            console.log(myVar)
            playVideo(myVar);
  })
}

webgazer.setGazeListener((data,timestamp)=>{
    if (data == null || lookDirection === "STOP") return
    if (
      data.x < LEFT_CUTOFF &&
      lookDirection !== "LEFT" &&
      lookDirection !== "RESET"
    ) {
      startLookTime = timestamp
      lookDirection = "LEFT"
    } else if (
      data.x > RIGHT_CUTOFF &&
      lookDirection !== "RIGHT" &&
      lookDirection !== "RESET"
    ) {
      startLookTime = timestamp
      lookDirection = "RIGHT"
    } else if (data.x >= LEFT_CUTOFF && data.x <= RIGHT_CUTOFF) {
      startLookTime = Number.POSITIVE_INFINITY
      lookDirection = null
    }

    if (startLookTime + LOOK_DELAY < timestamp) {
      if (lookDirection === "LEFT") {
        if (filename=="test"){
          GetHighlightedLeft();
        }
        else if (filename=="ytcategory"){
          if (document.getElementById("left").childElementCount!=1){
            splitytcategories('left');
          }
          else{
            window.location.replace("https://localhost:5000/ytplay/"+document.getElementById("left").firstChild.innerHTML);
          }
        }
        else if (location.pathname.includes('ytplay')){
          fetch('/getprevlink')
        .then(function (response) {
            return response.json();
        }).then(function (text) {
            myVar=text.url; 
            console.log(myVar)
            playVideo(myVar);
  })
        }
        console.log("LEFT")
        
      } else {
        if (filename=="test"){
          GetHighlightedRight();
        }  
        else if (filename=="ytcategory"){
          if (document.getElementById("right").childElementCount!=1){
          splitytcategories('right');
          }
          else{
            window.location.replace("https://localhost:5000/ytplay/"+document.getElementById("right").firstChild.innerHTML);
          }
        }
        else if (location.pathname.includes('ytplay')){
          fetch('/getnextlink')
        .then(function (response) {
            return response.json();
        }).then(function (text) {
            myVar=text.url; 
            console.log(myVar)
            playVideo(myVar);
  })
        }
        console.log("RIGHT")
      }

      startLookTime = Number.POSITIVE_INFINITY
      lookDirection = "STOP"
      setTimeout(() => {
        lookDirection = "RESET"
      }, 200)
    }

}).begin()

webgazer.showVideoPreview(false);
function GetHighlightedLeft(){
    document.getElementById("Twitter").hidden= false;
    setTimeout(() => {  console.log("World!"); }, 2000);
}

function displayCategories(categories){
  var mycats=categories;
  shuffle (mycats);
  
}
 function printCategories(){
   document.getElementById('left').innerHTML='';
   document.getElementById('right').innerHTML='';
   shuffle(leftCategories);
   var myDivL = document.getElementById("left");
   for (let i = 0; i < leftCategories.length; i++) {
    let btn = document.createElement("button");
    btn.classList.add("btn","btn-primary");
    btn.style.cssText +="margin: 5px; position:relative; display:grid; left:50%;";
    btn.innerHTML = leftCategories[i];
    myDivL.appendChild(btn);
  }
  shuffle(rightCategories);
  var myDivR = document.getElementById("right");
   for (let i = 0; i < rightCategories.length; i++) {
    let btn = document.createElement("button");
    btn.classList.add("btn","btn-danger");
    btn.style.cssText +="margin: 5px; position:relative; display:grid; left:50%;";
    btn.innerHTML = rightCategories[i];
    myDivR.appendChild(btn);
  }
 }

 function splitytcategories(side){
    if (side=='left'){
      shuffle(leftCategories);
      console.log(leftCategories);
      let cats=leftCategories;
      var indexToSplit = cats.length/2;
      leftCategories = cats.splice(0, indexToSplit);
      rightCategories= cats;
    }
    else{
      shuffle(rightCategories);
      console.log(rightCategories)
      let cats=rightCategories;
      var indexToSplit = cats.length/2;
      leftCategories = cats.splice(0, indexToSplit);
      rightCategories= cats;
    }
    printCategories();
 }


function GetHighlightedRight(){
    document.getElementById("Youtube").hidden = false;
    setTimeout(() => {  console.log("World!"); }, 2000);
    window.location.replace("https://localhost:5000/ytcategory");
}

function playVideo(name){
  myDiv=document.getElementById("Video")
  myDiv.innerHTML='';
  let frame = document.createElement("iframe");
  frame.style.cssText +="position: absolute; left: 50%; top: 50%;transform: translate(-50%, -50%);width:800px;height:600px;padding: 10px;";
  frame.src="https://www.youtube.com/embed/"+name+"?&autoplay=1&mute=1";
  myDiv.appendChild(frame);
}