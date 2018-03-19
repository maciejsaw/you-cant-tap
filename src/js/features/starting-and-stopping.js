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

function startNewGame() {
  generateCircles();
  startSpeedIncreaseTimers();
  //startRingsUpbeatAnimations();
}

$(document).on('click touchstart', '[js-initial-clickable-circle]', function(event) {
  $('[js-initial-clickable-circle]').addClass('is-collapsed');
  startNewGame();
});