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

// JavaScript for Vertical Navbar in Services Section
document.addEventListener("DOMContentLoaded", function () {
  // Vertical Navbar Functionality
  const navbar = document.querySelector(".navbar-top");
  const servicesSection = document.getElementById("services");
  const aboutSection = document.getElementById("about");

  function checkScroll() {
    const servicesPosition = servicesSection.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight;

    if (servicesPosition < viewportHeight / 2) {
      navbar.classList.add("navbar-vertical");
      document.body.classList.add("services-active");
    } else {
      navbar.classList.remove("navbar-vertical");
      document.body.classList.remove("services-active");
    }
  }

  // About Link Smooth Scroll
  document.querySelectorAll('a[href="#about"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      aboutSection.scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  window.addEventListener("scroll", checkScroll);
});


//dropdown menu


    //Visitor count
    document.addEventListener('DOMContentLoaded', function () {
      // 1. First try localStorage/sessionStorage
      try {
        if (!sessionStorage.getItem('visited')) {
          sessionStorage.setItem('visited', 'true');
          let count = parseInt(localStorage.getItem('visitorCount') || 0) + 1;
          localStorage.setItem('visitorCount', count);
          updateCounter(count);
        } else {
          updateCounter(localStorage.getItem('visitorCount') || 0);
        }
      }
      catch (e) {
        // 2. Fallback to cookies if storage fails
        console.warn("Using cookie fallback");
        let count = getCookie('visitorCount');
        if (!getCookie('visited')) {
          document.cookie = "visited=true; path=/; max-age=86400"; // 24h
          count = parseInt(count || 0) + 1;
          document.cookie = `visitorCount=${count}; path=/; max-age=${365 * 24 * 60 * 60}`;
        }
        updateCounter(count || 1);
      }

      function updateCounter(num) {
        document.getElementById('visitor-counter').textContent =
          `Visitors Count: ${new Intl.NumberFormat().format(num)}`;
      }

      function getCookie(name) {
        return document.cookie
          .split('; ')
          .find(row => row.startsWith(name + '='))
          ?.split('=')[1];
      }
    });

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