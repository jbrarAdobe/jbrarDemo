// Futuristic delayed functionality - loads after everything else

/**
 * Creates matrix rain effect
 */
function createMatrixRain() {
  const matrixContainer = document.createElement('div');
  matrixContainer.className = 'matrix-rain';
  document.body.appendChild(matrixContainer);

  const characters = 'AMSAMSAMSAMS01AMSAMSAMSAMS01AMSAMSAMSAMS01AMSAMSAMSAMS01AMSAMSAMSAMS01';
  const columns = Math.floor(window.innerWidth / 20);

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
  const orbCount = 5;
  
  for (let i = 0; i < orbCount; i++) {
    const orb = document.createElement('div');
    orb.className = 'energy-orb';
    orb.style.cssText = `
      position: fixed;
      width: ${20 + Math.random() * 40}px;
      height: ${20 + Math.random() * 40}px;
      border-radius: 50%;
      background: var(--gradient-accent);
      pointer-events: none;
      z-index: -1;
      opacity: 0.6;
      animation: orbFloat ${10 + Math.random() * 10}s ease-in-out infinite;
    `;
    
    // Random position
    orb.style.left = `${Math.random() * 100}%`;
    orb.style.top = `${Math.random() * 100}%`;
    
    document.body.appendChild(orb);
  }

  // Add floating animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes orbFloat {
      0%, 100% {
        transform: translate(0, 0) scale(1);
      }
      25% {
        transform: translate(20px, -30px) scale(1.1);
      }
      50% {
        transform: translate(-15px, 20px) scale(0.9);
      }
      75% {
        transform: translate(25px, 10px) scale(1.05);
      }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Adds interactive mouse movements
 */
function initializeMouseInteractions() {
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Update CSS custom properties for mouse position
    document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`);
  });

  // Add mouse-following gradient
  const mouseGradient = document.createElement('div');
  mouseGradient.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(100, 255, 218, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
    transform: translate(-50%, -50%);
    transition: all 0.1s ease;
  `;
  document.body.appendChild(mouseGradient);

  document.addEventListener('mousemove', (e) => {
    mouseGradient.style.left = `${e.clientX}px`;
    mouseGradient.style.top = `${e.clientY}px`;
  });
}

/**
 * Creates scan line effect
 */
function createScanLines() {
  const scanContainer = document.createElement('div');
  scanContainer.className = 'scan-lines';
  scanContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    opacity: 0.1;
  `;

  // Add scan line
  const scanLine = document.createElement('div');
  scanLine.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--neon-cyan), transparent);
    animation: scanMove 4s ease-in-out infinite;
  `;

  scanContainer.appendChild(scanLine);
  document.body.appendChild(scanContainer);

  // Add scan animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes scanMove {
      0% { top: 0; opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { top: 100%; opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Adds data stream effect to specific elements
 */
function initializeDataStreams() {
  const streamElements = document.querySelectorAll('.data-stream');
  
  streamElements.forEach((element) => {
    const stream = document.createElement('div');
    stream.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
      opacity: 0.2;
    `;

    const data = document.createElement('div');
    data.textContent = '01010101 11001100 00110011 10101010 01101001 11010010';
    data.style.cssText = `
      position: absolute;
      white-space: nowrap;
      color: var(--neon-cyan);
      font-family: 'Monaco', monospace;
      font-size: 10px;
      animation: dataFlow 10s linear infinite;
    `;

    stream.appendChild(data);
    element.style.position = 'relative';
    element.appendChild(stream);
  });
}

/**
 * Creates circuit board overlay
 */
function createCircuitOverlay() {
  const circuit = document.createElement('div');
  circuit.className = 'circuit-pattern';
  circuit.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    opacity: 0.1;
  `;
  document.body.appendChild(circuit);
}

/**
 * Adds performance-optimized parallax scrolling
 */
function initializeAdvancedParallax() {
  const parallaxElements = document.querySelectorAll('[data-speed]');
  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach((element) => {
      const speed = parseFloat(element.dataset.speed || 0.5);
      const yPos = -(scrolled * speed);
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
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
    // Add quantum particles
    for (let i = 0; i < 3; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--neon-cyan);
        border-radius: 50%;
        animation: quantumParticle ${1 + i * 0.2}s ease-in-out infinite;
        animation-delay: ${i * 0.1}s;
      `;
      loader.appendChild(particle);
    }
  });

  // Add quantum particle animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes quantumParticle {
      0%, 100% {
        transform: rotate(0deg) translateX(20px) rotate(0deg);
        opacity: 1;
      }
      50% {
        transform: rotate(180deg) translateX(20px) rotate(-180deg);
        opacity: 0.3;
      }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Performance monitoring and optimization
 */
function initializePerformanceOptimization() {
  // Reduce effects on low-performance devices
  const isLowPerformance = navigator.hardwareConcurrency < 4 || 
                          navigator.deviceMemory < 4 ||
                          window.innerWidth < 768;

  if (isLowPerformance) {
    // Disable some heavy effects
    document.documentElement.style.setProperty('--animation-duration', '0.1s');
    
    // Remove particles on mobile
    const particles = document.querySelectorAll('.particle, .matrix-drop');
    particles.forEach(particle => particle.remove());
  }

  // Monitor frame rate
  let lastTime = performance.now();
  let frameCount = 0;
  let fps = 60;

  function measureFPS() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
      fps = frameCount;
      frameCount = 0;
      lastTime = currentTime;
      
      // Reduce effects if FPS is low
      if (fps < 30) {
        document.documentElement.style.setProperty('--reduce-motion', '1');
      }
    }
    
    requestAnimationFrame(measureFPS);
  }
  
  measureFPS();
}

// Initialize all delayed features
function initializeDelayedFeatures() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    createMatrixRain();
    createEnergyOrbs();
    createScanLines();
    createCircuitOverlay();
  }
  
  initializeMouseInteractions();
  initializeDataStreams();
  initializeAdvancedParallax();
  createHolographicEffect();
  initializeQuantumLoaders();
  initializePerformanceOptimization();
}

// Wait for everything to be loaded, then add effects
if (document.readyState === 'complete') {
  initializeDelayedFeatures();
} else {
  window.addEventListener('load', initializeDelayedFeatures);
}
