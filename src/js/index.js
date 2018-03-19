/* ------------------------------------------- */

function moveVieportToClickedCircle(circleElement) {
  var clickedCircleCoordinateX = $(circleElement).closest('[js-circle-wrapper]').css('left').split('px')[0];
  var clickedCircleCoordinateY = $(circleElement).closest('[js-circle-wrapper]').css('top').split('px')[0];
  
  var negativeX = -clickedCircleCoordinateX+'px';
  var negativeY = -clickedCircleCoordinateY+'px';

  var translate3dCssString = 'translate3d('+negativeX+','+negativeY+',0)';
  $('[js-viewport-moving]').css('transform', translate3dCssString);
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
  currentPoints = currentPoints + 1000*currentSpeedLevel;
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