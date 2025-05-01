const slider = document.getElementById('gallery-track');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    const totalSlides = slider.children.length;
    let slideWidth = slider.clientWidth;
    let index = 0;

    function showSlide(i) {
      slider.style.transform = `translateX(-${i * slideWidth}px)`;
      updateButtonState();
    }

    function nextSlide() {
      if (index < totalSlides - 1) {
        index++;
        showSlide(index);
      } else {
        clearInterval(autoSlide);
      }
    }

    function prevSlide() {
      if (index > 0) {
        index--;
        showSlide(index);
      }
    }

    function updateButtonState() {
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === totalSlides - 1;
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    let autoSlide = setInterval(() => {
      if (index < totalSlides - 1) {
        nextSlide();
      } else {
        clearInterval(autoSlide);
      }
    }, 3000);

    const wrapper = document.getElementById('gallery-wrapper');
    wrapper.addEventListener('mouseenter', () => clearInterval(autoSlide));
    wrapper.addEventListener('mouseleave', () => {
      if (index < totalSlides - 1) {
        autoSlide = setInterval(nextSlide, 2000);
      }
    });

    // Swipe support
    let startX = 0;
    slider.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    slider.addEventListener('touchend', e => {
      let endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) nextSlide();
      else if (endX - startX > 50) prevSlide();
    });

    // Update on resize
    window.addEventListener('resize', () => {
      slideWidth = slider.clientWidth;
      showSlide(index);
    });

    updateButtonState();