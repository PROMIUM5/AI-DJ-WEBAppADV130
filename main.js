song_1 = "";
song_2 = "";
leftWristY = 0;
leftWristX = 0;
rightWristY = 0;
rightWristX = 0;
scoreLeftWrist = 0;
song_1Status = "";
scoreRightWrist = 0;
song_2Status = "";

function preload() {
  song_1 = loadSound(" Heroes Tonight.mp3");
  song_2 = loadSound("Where we Started.mp3");
}
function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}
function draw() {
  image(video, 0, 0, 600, 500);
  song_1Status = song_1.isPlaying();
  song_2Status = song_2.isPlaying();
  if (scoreLeftWrist > 0.01) {
    fill("green");
    stroke("white");
    circle(leftWristX, leftWristY, 36);
    song_2.stop();
    if(song_1Status == false){
      song_1.play();
      document.getElementById("song").innerHTML =
        "Playing Heroes Tonight song.";
    }
  }
  if(scoreRightWrist > 0.01){
    fill("aqua");
    stroke("black");
    circle(rightWristX, rightWristY, 36);
    song_1.stop();
    if(song_2Status == false){
        song_2.play();
        document.getElementById("song").innerHTML = "Playing Where We Started"
    }
  }
}

function modelLoaded() {
  console.log("Model Is Loaded");
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    leftWristY = results[0].pose.leftWrist.y;
    leftWristX = results[0].pose.leftWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    rightWristX = results[0].pose.rightWrist.x;
    scoreRightWrist = results[0].pose.keypoints[10].score;
    console.log(
      "leftWristY =" +
        leftWristY +
        "leftWristX =" +
        leftWristX +
        "rightWristX = " +
        rightWristX +
        "rightWristY" +
        rightWristY
    );
  }
}
