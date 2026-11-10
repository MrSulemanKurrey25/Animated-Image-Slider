document.addEventListener('DOMContentLoaded', () => {
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');
  const carousel = document.querySelector('.carousel');
  const list = document.querySelector('.list');
  const runningTime = document.querySelector('.carousel .timeRunning');

  const timeRunning = 3000; // Animation transition duration in ms
  const timeAutoNext = 7000; // Auto-advance interval in ms

  let runTimeOut;
  let runNextAuto = setTimeout(() => {
    nextBtn.click();
  }, timeAutoNext);

  // Event listeners for navigation buttons
  nextBtn.addEventListener('click', () => showSlider('next'));
  prevBtn.addEventListener('click', () => showSlider('prev'));

  // Function to reset and restart the progress bar animation
  function resetTimeAnimation() {
    runningTime.style.animation = 'none';
    void runningTime.offsetHeight; // Trigger browser reflow to restart animation
    runningTime.style.animation = `runningTime ${timeAutoNext / 1000}s linear 1 forwards`;
  }

  // Core slider logic
  function showSlider(type) {
    const sliderItemsDom = list.querySelectorAll('.item');

    if (type === 'next') {
      list.appendChild(sliderItemsDom[0]);
      carousel.classList.add('next');
    } else {
      list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
      carousel.classList.add('prev');
    }

    // Clear and reset transition timeout
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
      carousel.classList.remove('next');
      carousel.classList.remove('prev');
    }, timeRunning);

    // Clear and reset auto-next timer
    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
      nextBtn.click();
    }, timeAutoNext);

    resetTimeAnimation();
  }

  // Initialize the progress animation on load
  resetTimeAnimation();
});