status = "";
objects = [];

function setup()
{
    canvas = createCanvas(400,350);
    canvas.center();
    canvas.position(700,240);
    video = createCapture(VIDEO);
    video.hide();
    video.size(400,350);
}


function modelLoaded() 
{
    console.log("Model Loaded!");
    status = true;
}


function start() 
{
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("object_name").value;
}





function draw()
{
    image(video,0,0,400,350)
    if (status != "")
    {
        objectDetector.detect(video , gotResult)
        for (i=0 ; i < objects.length ; i++)
        {
            document.getElementById("status").innerHTML = "Status : Detecting Objects";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects detected are : " + objects.length;

            fill("#8b4513");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y +15);
            noFill();
            stroke("#8b4513");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);      
          
    
        
    

    if (objects[i].label == object_name)
    {
        video.stop();
        objectDetector.detect(gotResult);
        document.getElementById("object_status").innerHTML = object_name + "found";
        synth = window.SpeechSynthesis;
        utterThis = new SpeechSynthesisUtterance(object_name + "found");
        synth.speak(utterThis);
    }
    else
    {
        document.getElementById("object_status").innerHTML = object_name + "not found";
    }
}

    }
    

}

function gotResult(error , results)
{
    if (error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}