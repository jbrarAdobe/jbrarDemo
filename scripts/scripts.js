import {
  buildBlock,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
} from './aem.js';

/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}

/**
 * Load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    buildHeroBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Creates floating particles for background animation
 */
function createParticleSystem() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles-container';
  document.body.appendChild(particlesContainer);

  // Create 50 particles
  for (let i = 0; i < 50; i += 1) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random positioning and timing
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 20}s`;
    particle.style.animationDuration = `${20 + Math.random() * 10}s`;

    particlesContainer.appendChild(particle);
  }
}

/**
 * Creates geometric background pattern
 */
function createGeometricBackground() {
  const geometricBg = document.createElement('div');
  geometricBg.className = 'geometric-bg';
  document.body.appendChild(geometricBg);
}

/**
 * Adds dynamic header behavior based on scroll
 */
function initializeHeader() {
  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateHeader() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide/show header on scroll (simplified for native anchor navigation)
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
}

/**
 * Ensures carousel is always visible and properly positioned
 */
function initializeCarouselVisibility() {
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    // Ensure carousel is always visible and not affected by animations
    carousel.style.opacity = '1';
    carousel.style.visibility = 'visible';
    carousel.style.animationPlayState = 'running';
    carousel.classList.add('carousel-ready');

    // Force a layout recalculation to ensure sticky positioning works
    carousel.offsetHeight;
  }
}

/**
 * Adds intersection observer for scroll animations
 */
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all sections and blocks, but exclude carousel since it's sticky
  document.querySelectorAll('.section, .block').forEach((el) => {
    // Skip carousel since it should always be visible (sticky positioning)
    if (!el.classList.contains('carousel')) {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    }
  });
}

/**
 * Browser native anchor navigation works perfectly with sticky carousel
 * Disabling custom smooth scrolling to prevent interference
 */
function initializeSmoothScrolling() {
  // Disable custom smooth scrolling - browser native anchor navigation works better
  // with sticky carousel positioning. Direct URL loads work perfectly, so we should
  // let the browser handle all anchor navigation naturally.

  // If you want to re-enable custom scrolling for non-anchor links, you can add:
  // document.addEventListener('click', (e) => {
  //   const link = e.target.closest('a[href^="#"]');
  //   if (link) {
  //     // Let browser handle anchor navigation naturally
  //     return;
  //   }
  // });
}

/**
 * Adds cursor trail effect
 */
function initializeCursorEffects() {
  const trail = [];
  const trailLength = 10;

  document.addEventListener('mousemove', (e) => {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    document.body.appendChild(dot);

    trail.push(dot);

    if (trail.length > trailLength) {
      const oldDot = trail.shift();
      oldDot.remove();
    }

    setTimeout(() => {
      if (dot.parentNode) {
        dot.remove();
      }
    }, 1000);
  });
}

/**
 * Adds parallax scrolling effects
 */
function initializeParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  let ticking = false;

  function updateParallax() {
    const scrollTop = window.pageYOffset;

    parallaxElements.forEach((element) => {
      const speed = parseFloat(element.dataset.parallax) || 0.5;
      const yPos = -(scrollTop * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
}

/**
 * Adds typing animation to elements
 */
function initializeTypingEffect() {
  const typingElements = document.querySelectorAll('[data-type]');

  typingElements.forEach((element) => {
    const text = element.textContent;
    const speed = parseInt(element.dataset.typeSpeed, 10) || 50;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--neon-cyan)';

    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i += 1;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          element.style.borderRight = 'none';
        }, 1000);
      }
    }, speed);
  });
}

/**
 * Adds glitch effect on hover
 */
function initializeGlitchEffect() {
  const glitchElements = document.querySelectorAll('.glitch');

  glitchElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
      element.style.animation = 'glitch 0.3s ease-in-out';
    });

    element.addEventListener('mouseleave', () => {
      element.style.animation = '';
    });

    element.addEventListener('animationend', () => {
      element.style.animation = '';
    });
  });
}

/**
 * Adds fade-in animations to sections
 */
function addLoadingAnimations() {
  const sections = document.querySelectorAll('.section');
  sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.6s ease';

    setTimeout(() => {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }, index * 200);
  });
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await waitForFirstImage();
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  // Browser handles initial hash navigation perfectly with sticky carousel
  // No custom JavaScript needed

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();

  // Initialize futuristic features
  initializeHeader();
  initializeCarouselVisibility(); // Ensure carousel is always visible
  initializeSmoothScrolling();
  initializeScrollAnimations();
  addLoadingAnimations();

  // Additional effects
  createParticleSystem();
  createGeometricBackground();
  initializeCursorEffects();
  initializeParallax();
  initializeTypingEffect();
  initializeGlitchEffect();
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
