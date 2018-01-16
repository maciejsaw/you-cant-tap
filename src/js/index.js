/* Game parameters */
var endgameNumberOfCircles = 20;
/* ------------------------------------------- */

/* Global trackers */
var currentSpeedLevel = 1;
var currentNumberOfCircles = 0;
var currentPoints = 0;
var speedTimer__2;
var speedTimer__3;
var speedTimer__4;
var speedTimer__5;
var upbeatAnimationTimer;
var upbeatAnimationTimer2;
/* ------------------------------------------- */

function moveVieportToClickedCircle(circleElement) {
  var clickedCircleCoordinateX = $(circleElement).closest('[js-circle-wrapper]').css('left').split('px')[0];
  var clickedCircleCoordinateY = $(circleElement).closest('[js-circle-wrapper]').css('top').split('px')[0];
  
  var negativeX = -clickedCircleCoordinateX+'px';
  var negativeY = -clickedCircleCoordinateY+'px';

  var translate3dCssString = 'translate3d('+negativeX+','+negativeY+',0)';
  $('[js-viewport-moving]').css('transform', translate3dCssString);
}

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

function destroyCircle(circleElement) {
  $(circleElement).addClass('is-destroyed');
  $(circleElement).closest('[js-circle-wrapper]').addClass('is-destroyed');
  currentNumberOfCircles = currentNumberOfCircles - 1;
  setTimeout(function() {
    $(circleElement).closest('[js-circle-wrapper]').remove();
  }, 1000);
}

function updatePoints() {
  currentPoints = currentPoints + 100*currentSpeedLevel*currentSpeedLevel;
  $('[js-points-counter]').text(currentPoints);
}

function resetPoints() {
  currentPoints = 0;
  $('[js-points-counter]').text(currentPoints);
}

$(document).on('mousedown touchstart', '[js-clickable-circle]', function(event) {
  //moveVieportToClickedCircle(this);
  destroyCircle(this);
  generateOneRandomCircle();
  updatePoints();
});

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

function checkForEndGameNumberOfCircles() {
  if (currentNumberOfCircles >= endgameNumberOfCircles) {
    window.alert('Game over! Your score is '+ currentPoints);
    prepareNewGame();
  }
}

function prepareNewGame() {
  $('[js-circle-wrapper]').remove();
  $('[js-initial-clickable-circle]').removeClass('is-hidden');
  $('[js-initial-clickable-circle]').removeClass('is-collapsed');
  clearInterval(generator);
  clearTimeout(speedTimer__2);
  clearTimeout(speedTimer__3);
  clearTimeout(speedTimer__4);
  clearTimeout(speedTimer__5);
  currentSpeedLevel = 1;
  currentNumberOfCircles = 0;
  resetPoints();
  stopRingsUpbeatAnimations();
  $('[js-viewport-moving]').css('transform', 'translate3d(0px, 0px, 0)');
}

function startSpeedIncreaseTimers() {
  var speedTimer__2 = setTimeout(function() {
    currentSpeedLevel = 2;
  }, 16000);
  var speedTimer__3 = setTimeout(function() {
    currentSpeedLevel = 3;
  }, 32000);
  var speedTimer__4 = setTimeout(function() {
    currentSpeedLevel = 4;
  }, 64000);
  var speedTimer__5 = setTimeout(function() {
    currentSpeedLevel = 5;
  }, 128000);
}

function startInitialCircleUpbeatAnimations() {
  clearInterval(upbeatAnimationTimer);
  upbeatAnimationTimer = setInterval(function() {
    $('[js-initial-clickable-circle]').not('.is-destroyed').addClass('is-upbeat');
    setTimeout(function() {
      $('[js-initial-clickable-circle]').removeClass('is-upbeat');
    }, 500)
  } ,1000)
}

function doRingsUpbeatAnimation() {
  $('.background__ring').addClass('is-upbeat-3d');
  $('.background-layer').addClass('is-upbeat');
  setTimeout(function() {
    $('.background__ring').removeClass('is-upbeat-3d');
    $('.background-layer').removeClass('is-upbeat');
  }, 300);
}

function startRingsUpbeatAnimations() {
  clearInterval(upbeatAnimationTimer2);
  doRingsUpbeatAnimation();
  upbeatAnimationTimer2 = setInterval(function() {
    doRingsUpbeatAnimation();
  }, 1000) 
}

function stopRingsUpbeatAnimations() {
  clearInterval(upbeatAnimationTimer2);
}

function startNewGame() {
  generateCircles();
  startSpeedIncreaseTimers();
  //startRingsUpbeatAnimations();
}

$(document).on('click touchstart', '[js-initial-clickable-circle]', function(event) {
  $('[js-initial-clickable-circle]').addClass('is-collapsed');
  startNewGame();
});

/*on init*/
prepareNewGame();
startInitialCircleUpbeatAnimations();

//try to block swipe gestures and pinch
$(document).on('touchmove', function(event) {
  event = event.originalEvent || event;
  if (event.scale !== 1) {
     event.preventDefault();
  }
}, false);