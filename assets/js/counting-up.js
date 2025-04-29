  function animateCountUp(el, target, suffix = '') {
    let current = 0;
    const speed = 5; // Smaller = faster

    const update = () => {
      const increment = Math.ceil(target / 30); // 30 steps
      current += increment;
      if (current >= target) {
        el.textContent = `+${target}${suffix}`;
      } else {
        el.textContent = `+${current}${suffix}`;
        requestAnimationFrame(update);
      }
    };

    update();
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.count-up').forEach((el, idx) => {
          const target = parseInt(el.dataset.count);
          const suffix = idx === 1 ? 'Bi' : '';
          animateCountUp(el, target, suffix);
        });
        obs.disconnect(); // Only run once
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.querySelector('.overlay-text'));
