alert_sound = ""
status = "";
objects = [];

function preload()
{
    alert_sound = "alert.mp3"
}

function setup()
{
    canvas = createCanvas(450,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(450,400);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}

function gotResults(error,results)
{
    if (error)
    {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(video,0,0,380,380);

    if (status != "")
    {
        r = random(225);
        g = random(225);
        b = random(225);
        objectDetector.detect(video,gotResults);
        
        for (i = 0 ; i < objects.length ; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object detected";

            if (objects[i].label = "person")
            {
                alert_sound.pause()
                document.getElementById("baby_status").innerHTML = "Baby found";
            }
            else
            {
                alert_sound.play()
                document.getElementById("baby_status").innerHTML = "Baby not found";
            }
            
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

        if (objects.length < 0)
        {
            alert_sound.play()
            document.getElementById("baby_status").innerHTML = "Baby not found";
        }
    }
}