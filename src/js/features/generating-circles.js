function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function generateOneRandomCircle() {
  var circleHtml = '<div class="circle-wrapper" js-circle-wrapper><div class="circle" js-clickable-circle></div></div>';
  var randomCoordinateX = getRandomNumber(-200, 200);
  var randomCoordinateY = getRandomNumber(-200, 200);
  var $circleToAppend = $(circleHtml);
  $circleToAppend.css({
    top: randomCoordinateX+"px",
    left: randomCoordinateY+"px",
  });
  $circleToAppend.appendTo('[js-game-layer]');
  currentNumberOfCircles = currentNumberOfCircles + 1;
  console.log(currentNumberOfCircles);
}

var generator;
function generateCircles() {
  var speedMap = {
    1: 4000,
    2: 2000,
    3: 1000,
    4: 500,
    5: 250
  };
  
  clearInterval(generator);
  generateOneRandomCircle();
  generator = setInterval(function() {
    generateOneRandomCircle();
    checkForEndGameNumberOfCircles();
  }, speedMap[currentSpeedLevel]);
}