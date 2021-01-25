img = "";
status = "";
objects=[];
function preload(){
img=loadImage("plants.png")
}

function setup(){
    canvas=createCanvas(330, 300);
    canvas.center(); 
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Detecting objects";
}

function draw(){
    image(img,0,0,300,300);
    if(status != ""){
        for(q=0; q < objects.length; q++){
            document.getElementById("status").innerHTML="Status: objects detected.";
            fill(255, 0, 0);
            stroke(255,0,0);
            percentage=floor(objects[q].confidence*100);
            text(objects[q].label+ " "+percentage+" %", objects[q].x, objects[q].y-15);
            noFill();
            rect(objects[q].x, objects[q].y, objects[q].width, objects[q].height);
        }
    }
}

function modelLoaded(){
    console.log("modelLoaded");
    status=true;
    objectdetector.detect(img, getResults);
}
function getResults(error, results){
    if(error){
        console.log(error);
    }
    if(results){
        console.log(results);
        objects=results;
        document.getElementById("numberofobjectsdetected").innerHTML=1;
    }
}