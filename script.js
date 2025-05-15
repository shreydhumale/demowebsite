//fix nav bar (fixed position)
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 0) {
    // Stick after 100px of scrolling
    navbar.style.position = "fixed";
    navbar.style.top = "0";
  } else {
    navbar.style.position = "relative"; // Return to normal
  }
});



//dropdown menu background scroll 

document.addEventListener('DOMContentLoaded', function () {
<<<<<<< HEAD
  const dropdowns = document.querySelectorAll('.events-dropdown');
=======
  const dropdowns = document.querySelectorAll('.events-dropdown-content');
>>>>>>> 0a04a53fd02049a4b1802a8a82ac4b570527062d

  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('mouseenter', () => {
      document.body.classList.add('lock-scroll');
    });

    dropdown.addEventListener('mouseleave', () => {
      document.body.classList.remove('lock-scroll');
    });

    dropdown.addEventListener('wheel', function (e) {
      const scrollTop = dropdown.scrollTop;
      const scrollHeight = dropdown.scrollHeight;
      const clientHeight = dropdown.clientHeight;
      const isScrollable = scrollHeight > clientHeight;
      const delta = e.deltaY;

      if (!isScrollable) return;

      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight;

      if ((delta < 0 && atTop) || (delta > 0 && atBottom)) {
        e.preventDefault();
      }
    }, { passive: false });
  });
});



//dropdown menu end

//visitor counter
const binId = '681c31658a456b7966999879';
  const apiKey = '$2a$10$GaKUEgjhh5kMP7Heqtgn1OfHBiSvwGtqBs6Y5Ns3.vr5u8cXYYyXO';
  const apiUrl = `https://api.jsonbin.io/v3/b/${binId}`;

  document.addEventListener('DOMContentLoaded', function () {
    // Only increment if this is a new session
    if (!sessionStorage.getItem('visited')) {
      sessionStorage.setItem('visited', 'true');

      // Get the current count
      fetch(apiUrl, {
        headers: {
          'X-Master-Key': apiKey
        }
      })
        .then(res => res.json())
        .then(data => {
          const currentCount = data.record.visitorCount || 0;
          const newCount = currentCount + 1;

          // Update the count
          fetch(apiUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'X-Master-Key': apiKey
            },
            body: JSON.stringify({ visitorCount: newCount })
          })
            .then(() => {
              updateCounter(newCount);
            });
        });
    } else {
      // Just fetch the existing count
      fetch(apiUrl, {
        headers: {
          'X-Master-Key': apiKey
        }
      })
        .then(res => res.json())
        .then(data => {
          updateCounter(data.record.visitorCount || 0);
        });
    }

    function updateCounter(count) {
      document.getElementById('visitor-counter').textContent =
        `Visitors Count: ${new Intl.NumberFormat().format(count)}`;
    }
  });

//visitor counter end

    
    // for mobile menu
    function toggleMenu() {
      const mobileNav = document.querySelector('.mobile-nav');
      const overlay = document.querySelector('.overlay') || createOverlay();

      mobileNav.classList.toggle('active');
      overlay.classList.toggle('active');
    }

    function createOverlay() {
      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      overlay.addEventListener('click', toggleMenu);
      document.body.appendChild(overlay);
      return overlay;
    }

    // Follow Us toggle
    document.addEventListener('DOMContentLoaded', function () {
      const followBtn = document.querySelector('.follow-btn');
      if (followBtn) {
        followBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          const socialLinks = this.nextElementSibling;
          socialLinks.classList.toggle('active');
        });
      }
    });

    // image slider home
    const slider = document.getElementById('slider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const totalSlides = slider.children.length;
    const slideWidth = slider.clientWidth;
    let index = 0;
    
    function showSlide(i) {
        slider.style.transform = `translateX(-${i * slideWidth}px)`;
        updateButtonState();
    }
    
    // Stop at last slide
    function nextSlide() {
        if (index < totalSlides - 1) {
            index++;
            showSlide(index);
        } else {
            clearInterval(autoSlide); 
        }
    }
    
    // Stop at first slide
    function prevSlide() {
        if (index > 0) {
            index--;
            showSlide(index);
        }
    }
    
    // Disable/enable buttons accordingly
    function updateButtonState() {
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === totalSlides - 1;
    }
    
    // Button Clicks
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto Slide
    let autoSlide = setInterval(() => {
        if (index < totalSlides - 1) {
            nextSlide();
        } else {
            clearInterval(autoSlide);
        }
    }, 3000);
    
    // Pause on hover
    slider.parentElement.addEventListener('mouseenter', () => clearInterval(autoSlide));
    slider.parentElement.addEventListener('mouseleave', () => {
        if (index < totalSlides - 1) {
            autoSlide = setInterval(nextSlide, 2500);
        }
    });
    
    // Swipe Support
    let startX = 0;
    
    slider.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    slider.addEventListener('touchend', e => {
        let endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) nextSlide();
        else if (endX - startX > 50) prevSlide();
    });
    
    // Initial button state
    updateButtonState();
    //image slider end
