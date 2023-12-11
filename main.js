song = ""
leftwristx = ""
leftwristy = ""
rightwristx = ""
rightwristy = ""
rwscore = 0
lwscore = 0

function preload(){

    song = loadSound("music.mp3")
}

function setup(){

    canvas = createCanvas(500, 500)
    canvas.position(520, 235)

    video = createCapture(VIDEO)
    video.hide()

    mypose = ml5.poseNet(video, modaloaded)
    mypose.on("pose", gotresults)
}

function modaloaded(){

    console.log("yes, pose net is loaded")
     
}

function gotresults(r){

    if(r.length > 0){

        console.log(r)

        lwscore = r[0].pose.keypoints[9].score
        rwscore = r[0].pose.keypoints[10].score

        leftwristx = r[0].pose.leftWrist.x
        leftwristy = r[0].pose.leftWrist.y

        rightwristx = r[0].pose.rightWrist.x
        rightwristy = r[0].pose.rightWrist.y
    }
}

function draw(){

    image(video, 0, 0, 500, 500)

    if(lwscore > 0.2){

        fill("yellow")
        stroke("black")
        circle(leftwristx, leftwristy, 20)

        inlw = Number(leftwristy)
        lwrd = floor(inlw)
        volume = lwrd/500
        song.setVolume(volume)
        document.getElementById("v").innerHTML = "Volume" + volume

    }
}


function playing(){

    song.play()
    song.setVolume(1)
    song.rate(0.2)
}
