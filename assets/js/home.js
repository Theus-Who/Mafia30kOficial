/**
 * ===================================
 * MÁFIA 30K - JAVASCRIPT HOME PAGE
 * Funcionalidades específicas da página inicial
 * ===================================
 */

document.addEventListener('DOMContentLoaded', function () {
  initializeHomeAnimations();
  initializeServiceCards();
  initializeHeroEffects();
});

/**
 * Inicializa animações específicas da home
 */
function initializeHomeAnimations() {
  // Animação sequencial dos elementos do hero
  const heroElements = [
    '.hero-title',
    '.hero-quote',
    '.hero-description',
    '.hero-actions',
  ];

  heroElements.forEach((selector, index) => {
    const element = document.querySelector(selector);
    if (element) {
      element.style.animationDelay = `${index * 0.3}s`;
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';

      setTimeout(() => {
        element.style.transition = 'all 0.8s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 300);
    }
  });

  // Animação dos cards de serviço
  const serviceCards = document.querySelectorAll('.service-card');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
        }
      });
    },
    { threshold: 0.2 }
  );

  serviceCards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
  });
}

/**
 * Inicializa interações dos cards de serviço
 */
function initializeServiceCards() {
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach((card) => {
    // Efeito de hover com som (se disponível)
    card.addEventListener('mouseenter', function () {
      // Adiciona efeito de brilho
      this.style.boxShadow =
        '0 20px 40px rgba(255, 0, 128, 0.3), 0 0 30px rgba(57, 255, 20, 0.2)';

      // Anima o ícone
      const icon = this.querySelector('.service-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
      }

      // Anima a seta
      const arrow = this.querySelector('.service-arrow');
      if (arrow) {
        arrow.style.transform = 'translateX(8px)';
      }
    });

    card.addEventListener('mouseleave', function () {
      this.style.boxShadow = '';

      const icon = this.querySelector('.service-icon');
      if (icon) {
        icon.style.transform = '';
      }

      const arrow = this.querySelector('.service-arrow');
      if (arrow) {
        arrow.style.transform = '';
      }
    });

    // Efeito de clique
    card.addEventListener('click', function (e) {
      // Previne navegação se não for um link direto
      if (!e.target.closest('a')) {
        const link = this.querySelector('.service-link');
        if (link) {
          // Efeito visual de clique
          this.style.transform = 'scale(0.98)';
          setTimeout(() => {
            this.style.transform = '';
            window.location.href = link.href;
          }, 150);
        }
      }
    });

    // Adiciona atributo de dados para tracking
    const service = card.getAttribute('data-service');
    if (service) {
      card.addEventListener('click', function () {
        // Analytics ou tracking aqui
        console.log(`Serviço clicado: ${service}`);
      });
    }
  });
}

/**
 * Efeitos especiais do hero
 */
function initializeHeroEffects() {
  const heroTitle = document.querySelector('.hero-title');
  const quoteBox = document.querySelector('.quote-box');

  if (heroTitle) {
    // Efeito de brilho pulsante no título
    let glowIntensity = 0;
    let glowDirection = 1;

    setInterval(() => {
      glowIntensity += glowDirection * 0.02;
      if (glowIntensity >= 1) glowDirection = -1;
      if (glowIntensity <= 0) glowDirection = 1;

      const glowColor = `rgba(255, 0, 128, ${0.3 + glowIntensity * 0.4})`;
      heroTitle.style.textShadow = `0 0 ${
        20 + glowIntensity * 30
      }px ${glowColor}`;
    }, 50);
  }

  if (quoteBox) {
    // Efeito de borda animada na quote
    let borderGlow = 0;
    let borderDirection = 1;

    setInterval(() => {
      borderGlow += borderDirection * 0.01;
      if (borderGlow >= 1) borderDirection = -1;
      if (borderGlow <= 0) borderDirection = 1;

      const borderColor = `rgba(255, 0, 128, ${0.3 + borderGlow * 0.4})`;
      const shadowColor = `rgba(57, 255, 20, ${0.2 + borderGlow * 0.3})`;

      quoteBox.style.borderColor = borderColor;
      quoteBox.style.boxShadow = `0 0 ${20 + borderGlow * 20}px ${shadowColor}`;
    }, 100);
  }

  // Efeito parallax suave no hero
  window.addEventListener(
    'scroll',
    MafiaUtils.throttle(() => {
      const scrolled = window.pageYOffset;
      const heroSection = document.querySelector('.hero-section');

      if (heroSection && scrolled < window.innerHeight) {
        const parallaxSpeed = 0.5;
        heroSection.style.transform = `translateY(${
          scrolled * parallaxSpeed
        }px)`;
      }
    }, 16)
  );
}

/**
 * Contador animado para estatísticas
 */
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

/**
 * Efeito de digitação para textos
 */
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

/**
 * Partículas flutuantes de fundo (opcional)
 */
function createFloatingParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'floating-particles';
  particlesContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
  `;

  document.body.appendChild(particlesContainer);

  // Cria partículas
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(57, 255, 20, 0.3);
          border-radius: 50%;
          animation: float ${5 + Math.random() * 10}s linear infinite;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation-delay: ${Math.random() * 5}s;
      `;

    particlesContainer.appendChild(particle);
  }

  // Adiciona CSS da animação
  const style = document.createElement('style');
  style.textContent = `
      @keyframes float {
          0% {
              transform: translateY(100vh) rotate(0deg);
              opacity: 0;
          }
          10% {
              opacity: 1;
          }
          90% {
              opacity: 1;
          }
          100% {
              transform: translateY(-100vh) rotate(360deg);
              opacity: 0;
          }
      }
  `;
  document.head.appendChild(style);
}

/**
 * Easter egg - Konami Code
 */
function initializeKonamiCode() {
  const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'KeyB',
    'KeyA',
  ];

  let userInput = [];

  document.addEventListener('keydown', function (e) {
    userInput.push(e.code);

    if (userInput.length > konamiCode.length) {
      userInput.shift();
    }

    if (userInput.join(',') === konamiCode.join(',')) {
      // Easter egg ativado!
      document.body.style.filter = 'hue-rotate(180deg)';
      MafiaUtils.showNotification(
        '🎮 Modo Cyber ativado! Bem-vindo à Matrix da Máfia 30k!',
        'success'
      );
      createFloatingParticles();

      setTimeout(() => {
        document.body.style.filter = '';
      }, 10000);
    }
  });
}

// Inicializa easter eggs
initializeKonamiCode();

// Adiciona listeners para botões específicos da home
document.addEventListener('click', function (e) {
  // Botão "Entrar na Máfia"
  if (e.target.closest('a[href="rede.html"]')) {
    MafiaUtils.showNotification(
      'Redirecionando para a Rede Social 30k...',
      'info'
    );
  }

  // Botão "Criar Perfil"
  if (e.target.closest('a[href="perfil.html"]')) {
    MafiaUtils.showNotification('Abrindo criador de perfil 30k...', 'info');
  }
});

// Performance monitoring
const perfObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'navigation') {
      console.log(
        `⚡ Página carregada em ${entry.loadEventEnd - entry.loadEventStart}ms`
      );
    }
  }
});

perfObserver.observe({ entryTypes: ['navigation'] });

console.log('🏠 Home Page - Scripts carregados com sucesso!');
