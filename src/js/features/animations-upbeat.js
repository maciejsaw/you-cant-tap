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