img = "";
status = "";
objects=[];
function preload(){
img=loadImage("download copy.jpeg")
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
        for(p=0; p < objects.length; p++){
            document.getElementById("status").innerHTML="Status: objects detected.";
            fill(255, 0, 0);
            stroke(255,0,0);
            percent=floor(objects[p].confidence*100);
            text(objects[p].label+ " "+percent+" %", objects[p].x, objects[p].y-15);
            noFill();
            rect(objects[p].x, objects[p].y, objects[p].width, objects[p].height);
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