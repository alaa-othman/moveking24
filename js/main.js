(function() {
      const toggleBtn = document.getElementById('menuToggle');
      const mobilePanel = document.getElementById('mobileNavPanel');
      const mobileLinks = document.querySelectorAll('.mobile-link');
      let isOpen = false;

      function setMenuState(open) {
        if (!mobilePanel) return;
        if (open) {
          mobilePanel.classList.remove('mobile-nav-transition');
          mobilePanel.classList.add('mobile-nav-open');
          toggleBtn?.setAttribute('aria-expanded', 'true');
          // animate bars to 'X'
          const bars = toggleBtn?.querySelectorAll('.menu-bar');
          if (bars) {
            bars[0]?.classList.add('rotate-45', 'translate-y-[6px]');
            bars[1]?.classList.add('opacity-0');
            bars[2]?.classList.add('-rotate-45', '-translate-y-[6px]');
          }
        } else {
          mobilePanel.classList.remove('mobile-nav-open');
          mobilePanel.classList.add('mobile-nav-transition');
          toggleBtn?.setAttribute('aria-expanded', 'false');
          const bars = toggleBtn?.querySelectorAll('.menu-bar');
          if (bars) {
            bars[0]?.classList.remove('rotate-45', 'translate-y-[6px]');
            bars[1]?.classList.remove('opacity-0');
            bars[2]?.classList.remove('-rotate-45', '-translate-y-[6px]');
          }
        }
        isOpen = open;
      }

      if (toggleBtn && mobilePanel) {
        mobilePanel.classList.add('mobile-nav-transition');
        toggleBtn.addEventListener('click', () => setMenuState(!isOpen));
        mobileLinks.forEach(link => link.addEventListener('click', () => setMenuState(false)));
        window.addEventListener('resize', () => { if (window.innerWidth >= 768 && isOpen) setMenuState(false); });
      }
    })();
    //       Carousel JS 
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track.children);
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;

    // Core function to move to a targeted slide
    function updateCarousel(index) {
      // Loop edges
      if (index >= slides.length) currentIndex = 0;
      else if (index < 0) currentIndex = slides.length - 1;
      else currentIndex = index;

      // Translate track smoothly based on current slide index
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Dynamic styling update for bottom navigation dots
      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.remove('bg-white/50');
          dot.classList.add('bg-white');
        } else {
          dot.classList.remove('bg-white');
          dot.classList.add('bg-white/50');
        }
      });
    }

    // Event Listeners for Arrow Controls
    nextBtn.addEventListener('click', () => updateCarousel(currentIndex + 1));
    prevBtn.addEventListener('click', () => updateCarousel(currentIndex - 1));

    // Event Listeners for Dot Controls
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const targetIndex = parseInt(e.target.dataset.index);
        updateCarousel(targetIndex);
      });
    });

    // Auto-play slider (moves every 3 seconds)
    setInterval(() => {
      updateCarousel(currentIndex + 1);
    }, 3000);
    // END Carousel JS