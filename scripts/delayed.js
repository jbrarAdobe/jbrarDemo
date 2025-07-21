// Futuristic delayed functionality - loads after everything else

/**
 * Creates matrix rain effect
 */
function createMatrixRain() {
  const matrixContainer = document.createElement('div');
  matrixContainer.className = 'matrix-rain';
  document.body.appendChild(matrixContainer);

  const characters = 'AMSAMSAMSAMS01AMSAMSAMSAMS01AMSAMSAMSAMS01AMSAMSAMSAMS01AMSAMSAMSAMS01';

  function createDrop() {
    const drop = document.createElement('div');
    drop.className = 'matrix-drop';
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.animationDuration = `${3 + Math.random() * 4}s`;
    drop.style.animationDelay = `${Math.random() * 2}s`;

    // Random character from AMS
    drop.textContent = characters.charAt(Math.floor(Math.random() * characters.length));

    matrixContainer.appendChild(drop);

    // Remove drop after animation
    setTimeout(() => {
      if (drop.parentNode) {
        drop.parentNode.removeChild(drop);
      }
    }, 7000);
  }

  // Create drops at intervals
  const matrixInterval = setInterval(() => {
    if (Math.random() < 0.3) {
      createDrop();
    }
  }, 100);

  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    clearInterval(matrixInterval);
  });
}

/**
 * Creates floating orbs with energy effects
 */
function createEnergyOrbs() {
  const orbContainer = document.createElement('div');
  orbContainer.className = 'energy-orbs';
  document.body.appendChild(orbContainer);

  for (let i = 0; i < 5; i += 1) {
    const orb = document.createElement('div');
    orb.className = 'energy-orb';
    orb.style.left = `${Math.random() * 100}%`;
    orb.style.top = `${Math.random() * 100}%`;
    orb.style.animationDelay = `${Math.random() * 5}s`;

    // Add floating animation
    orb.style.setProperty('--float-x', `${Math.random() * 200 - 100}px`);
    orb.style.setProperty('--float-y', `${Math.random() * 200 - 100}px`);

    orbContainer.appendChild(orb);
  }
}

/**
 * Creates mouse interaction effects
 */
function initializeMouseInteractions() {
  const mouseGradient = document.createElement('div');
  mouseGradient.className = 'mouse-gradient';
  document.body.appendChild(mouseGradient);

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    mouseGradient.style.background = `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(100, 255, 218, 0.06), transparent 40%)`;
  });

  // Hide gradient when mouse leaves window
  document.addEventListener('mouseleave', () => {
    mouseGradient.style.background = 'transparent';
  });
}

/**
 * Creates scanning line overlay
 */
function createScanLines() {
  const scanLines = document.createElement('div');
  scanLines.className = 'scan-lines';
  document.body.appendChild(scanLines);

  // Create horizontal scan lines
  for (let i = 0; i < 100; i += 1) {
    const line = document.createElement('div');
    line.className = 'scan-line';
    line.style.top = `${i * 2}%`;
    line.style.animationDelay = `${Math.random() * 2}s`;
    scanLines.appendChild(line);
  }
}

/**
 * Initializes data streams on elements
 */
function initializeDataStreams() {
  const elements = document.querySelectorAll('.data-stream');
  elements.forEach((element) => {
    const stream = document.createElement('div');
    stream.className = 'stream-overlay';
    stream.textContent = '01010101 11001100 00110011 10101010';
    element.appendChild(stream);
  });
}

/**
 * Creates circuit board pattern overlay
 */
function createCircuitOverlay() {
  const circuitOverlay = document.createElement('div');
  circuitOverlay.className = 'circuit-pattern';
  document.body.appendChild(circuitOverlay);

  // Add circuit elements
  for (let i = 0; i < 20; i += 1) {
    const circuit = document.createElement('div');
    circuit.className = 'circuit-element';
    circuit.style.left = `${Math.random() * 100}%`;
    circuit.style.top = `${Math.random() * 100}%`;
    circuit.style.animationDelay = `${Math.random() * 3}s`;
    circuitOverlay.appendChild(circuit);
  }
}

/**
 * Advanced parallax with performance optimization
 */
function initializeAdvancedParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax-speed]');
  let ticking = false;

  function updateParallax() {
    const scrollTop = window.pageYOffset;

    parallaxElements.forEach((element) => {
      const speed = parseFloat(element.dataset.parallaxSpeed) || 0.5;
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
 * Creates holographic distortion effect
 */
function createHolographicEffect() {
  const hologramElements = document.querySelectorAll('.holographic');

  hologramElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
      element.style.filter = 'hue-rotate(90deg) contrast(1.2)';
    });

    element.addEventListener('mouseleave', () => {
      element.style.filter = '';
    });
  });
}

/**
 * Adds quantum loading animations
 */
function initializeQuantumLoaders() {
  const loaders = document.querySelectorAll('.quantum-loader');
  loaders.forEach((loader) => {
    // Create quantum particles
    for (let i = 0; i < 8; i += 1) {
      const particle = document.createElement('div');
      particle.className = 'quantum-particle';
      particle.style.animationDelay = `${i * 0.1}s`;
      loader.appendChild(particle);
    }
  });
}

/**
 * Performance optimization for low-end devices
 */
function initializePerformanceOptimization() {
  // Detect low-performance devices
  const isLowPerformance = navigator.hardwareConcurrency < 4
    || navigator.deviceMemory < 2
    || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isLowPerformance) {
    document.body.classList.add('reduced-effects');

    // Disable heavy animations
    const particles = document.querySelectorAll('.particle, .matrix-drop');
    particles.forEach((particle) => {
      particle.style.display = 'none';
    });
  }
}

/**
 * Initialize all delayed features
 */
function initializeDelayedFeatures() {
  // Respect user's motion preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    createMatrixRain();
    createEnergyOrbs();
    createScanLines();
    createCircuitOverlay();
    initializeAdvancedParallax();
    createHolographicEffect();
    initializeQuantumLoaders();
  }

  // Always initialize these (they respect motion preferences internally)
  initializeMouseInteractions();
  initializeDataStreams();
  initializePerformanceOptimization();

  // Delayed initialization to ensure everything is loaded
  setTimeout(() => {
    document.body.classList.add('effects-loaded');
  }, 1000);
}

// Initialize when page is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeDelayedFeatures, 2000);
  });
} else {
  setTimeout(initializeDelayedFeatures, 2000);
}
