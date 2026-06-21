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
    const track = document.getElementById('carouselItems');
    const slides = Array.from(track.children);
    const firstSlide = slides[0];
    const lastSlide = slides[slides.length - 1];
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    // Core function to move to a targeted slide
    // function updateCarousel(oldindex, newindex) {

    //   const track = document.getElementById('carouselItems');
    //   const slides = Array.from(track.children);
    //   const firstSlide = slides[0];
    //   const lastSlide = slides[slides.length - 1];

    //   if (newindex < 0) {
    //     currentIndex = slides.length - 1; // Loop back to last slide
    //   } else if (newindex = slides.length) {
    //     currentIndex = 0; // Loop to first slide
    //   } else {
    //     currentIndex = newindex;
    //   }
    // }
    // updateCarousel(currentIndex, currentIndex + 1);

    // Event Listeners for Arrow Controls
    // nextBtn.addEventListener('click', () => updateCarousel(currentIndex + 1));
    // prevBtn.addEventListener('click', () => updateCarousel(currentIndex - 1));

    // Auto-play slider (moves every 5 seconds)
    // setInterval(() => {
    //   updateCarousel(currentIndex + 1);
    //   console.log(`Auto-play moved to slide index: ${currentIndex}`);
    //   console.log(`Current slide: ${slides[currentIndex].outerHTML}`);
    // }, 1000);
    // END Carousel JS

  (function() {
    const track = document.getElementById('carouselTrack');
    const itemsContainer = document.getElementById('carouselItems');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dotsContainer');

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayInterval = null;
    const AUTO_DELAY = 4000;

    // Build dots
    function buildDots() {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${i === 0 ? 'bg-white scale-110 shadow-md' : 'bg-white/50 hover:bg-white/80'}`;
        dot.dataset.index = i;
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', function() {
          goToSlide(parseInt(this.dataset.index));
          resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
      }
    }
    buildDots();

    function updateDots(index) {
      const dots = dotsContainer.querySelectorAll('button');
      dots.forEach((dot, i) => {
        if (i === index) {
          dot.className = 'w-3 h-3 rounded-full transition-all duration-300 bg-white scale-110 shadow-md';
        } else {
          dot.className = 'w-3 h-3 rounded-full transition-all duration-300 bg-white/50 hover:bg-white/80';
        }
      });
    }

    function goToSlide(index) {
      if (index < 0) index = 0;
      if (index >= totalSlides) index = totalSlides - 1;
      currentIndex = index;
      itemsContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateDots(currentIndex);
    }

    function nextSlide() {
      goToSlide((currentIndex + 1) % totalSlides);
      resetAutoPlay();
    }

    function prevSlide() {
      goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
      resetAutoPlay();
    }

    function startAutoPlay() {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(nextSlide, AUTO_DELAY);
    }

    function resetAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
      startAutoPlay();
    }

    function pauseAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    }

    function resumeAutoPlay() {
      if (!autoPlayInterval) {
        startAutoPlay();
      }
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Pause on hover, resume on leave
    track.addEventListener('mouseenter', pauseAutoPlay);
    track.addEventListener('mouseleave', resumeAutoPlay);

    // Keyboard support
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      }
    });

    // Initialize
    goToSlide(0);
    startAutoPlay();

    // Expose for debugging
    window.carousel = { goToSlide, nextSlide, prevSlide, currentIndex: () => currentIndex };
  })();