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

