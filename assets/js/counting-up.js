function animateCountUp(el, target, suffix = '') {
  let current = 0;
  const update = () => {
    const increment = Math.ceil(target / 30);
    current += increment;
    if (current >= target) {
      el.textContent = `+${target}${suffix}`;
    } else {
      el.textContent = `+${current}`;
      requestAnimationFrame(update);
    }
  };
  update();
}

function startCounting() {
  document.querySelectorAll('.count-up').forEach((el, idx) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = idx === 1 ? 'Bi' : '';
    animateCountUp(el, target, suffix);
  });
}

let hasCounted = false;

function checkAndStartCount() {
  const overlayText = document.querySelector('.overlay-text');
  if (!overlayText || hasCounted) return;

  const rect = overlayText.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  if (rect.top < windowHeight && rect.bottom > 0) {
    hasCounted = true;
    startCounting();
    window.removeEventListener('scroll', checkAndStartCount);
    window.removeEventListener('load', checkAndStartCount);
  }
}

window.addEventListener('scroll', checkAndStartCount);
window.addEventListener('load', checkAndStartCount);
