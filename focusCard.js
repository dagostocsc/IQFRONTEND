let focused = null;

function focusCard(card) {
  const slider = document.querySelector('.slider');

  if (focused && focused !== card) {
    focused.classList.remove('focused-card');
  }

  if (card.classList.contains('focused-card')) {
    card.classList.remove('focused-card');
    slider.style.animationPlayState = 'running';
    focused = null;
  } else {
    card.classList.add('focused-card');
    slider.style.animationPlayState = 'paused';
    focused = card;
  }
}
