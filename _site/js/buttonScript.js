var defaults = {
  maxRotationX: 1,
  maxRotationY: 2,
  inTransition: 'all 85ms ease-out',
  outTransition: 'all 500ms cubic-bezier(0.035, 1.095, 0.240, 1.560)'
};

var button = document.querySelector('.button');

var buttonHalfWidth = parseInt(button.offsetWidth / 2),
    buttonHalfHeight = parseInt(button.offsetHeight / 2);

button.addEventListener('click', function(e) {
  var clickLayerX = e.layerX,
      clickLayerY = e.layerY,
      clickFromOrigoX = clickLayerX - buttonHalfWidth,
      clickFromOrigoY = clickLayerY - buttonHalfHeight;

  var rotationY = defaults.maxRotationY * (clickFromOrigoX / buttonHalfWidth),
      rotationX = -(defaults.maxRotationX * (clickFromOrigoY / buttonHalfHeight));

  var rotationTransform = 'rotateX(' + rotationX + 'deg) rotateY(' + rotationY + 'deg) scale(0.85)';

  setTimeout(function() {
    button.style.transition = defaults.outTransition;
    button.style.transform = 'none';
  }, 85);

  button.style.transition = defaults.inTransition;
  button.style.transform = rotationTransform;
});
