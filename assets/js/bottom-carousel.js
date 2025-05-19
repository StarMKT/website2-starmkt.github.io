  const track = document.querySelector(".carousel-track");
  const leftBtn = document.querySelector(".carousel-arrow-left");
  const rightBtn = document.querySelector(".carousel-arrow-right");

  let currentIndex = 0;
  const totalSlides = document.querySelectorAll(".carousel-item").length;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  leftBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  });

  rightBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  });

  // Swipe gesture (mobile)
  let startX = 0;
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });
  track.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) leftBtn.click();
    else if (startX - endX > 50) rightBtn.click();
  });
