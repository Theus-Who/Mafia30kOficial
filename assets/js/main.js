/**
 * ===================================
 * MÁFIA 30K - JAVASCRIPT PRINCIPAL
 * Funcionalidades globais do site
 * ===================================
 */

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
  initializeNavigation();
  initializeLucideIcons();
  initializeAnimations();
  initializeScrollEffects();
});

/**
 * Inicializa a navegação mobile
 */
function initializeNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');

      // Troca o ícone do botão
      const icon = navToggle.querySelector('.nav-toggle-icon');
      if (navMenu.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
      } else {
        icon.setAttribute('data-lucide', 'menu');
      }

      // Reinicializa os ícones Lucide
      lucide.createIcons();
    });

    // Fecha o menu ao clicar em um link (mobile)
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('active');
          const icon = navToggle.querySelector('.nav-toggle-icon');
          icon.setAttribute('data-lucide', 'menu');
          lucide.createIcons();
        }
      });
    });
  }
}

/**
 * Inicializa os ícones Lucide
 */
function initializeLucideIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

/**
 * Inicializa animações de entrada
 */
function initializeAnimations() {
  // Observador de interseção para animações
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observa elementos com animação
  const animatedElements = document.querySelectorAll(
    '[class*="fade"], [class*="slide"]'
  );
  animatedElements.forEach((el) => {
    observer.observe(el);
  });
}

/**
 * Efeitos de scroll na navegação
 */
function initializeScrollEffects() {
  const navbar = document.getElementById('navbar');

  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.borderBottomColor = 'rgba(255, 0, 128, 0.4)';
      } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        navbar.style.borderBottomColor = 'rgba(255, 0, 128, 0.2)';
      }
    });
  }
}

/**
 * Utilitários globais
 */

// Função para mostrar notificações
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
      <div class="notification-content">
          <span class="notification-message">${message}</span>
          <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
              <i data-lucide="x"></i>
          </button>
      </div>
  `;

  // Adiciona estilos inline para a notificação
  notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(10px);
      border: 1px solid ${
        type === 'success' ? '#39ff14' : type === 'error' ? '#ff0080' : '#666'
      };
      border-radius: 12px;
      padding: 16px;
      color: white;
      max-width: 400px;
      animation: slideInRight 0.3s ease;
  `;

  document.body.appendChild(notification);

  // Remove automaticamente após 5 segundos
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);

  // Reinicializa ícones Lucide
  lucide.createIcons();
}

// Função para loading states
function setLoadingState(element, isLoading) {
  if (isLoading) {
    element.classList.add('loading');
    element.style.pointerEvents = 'none';
  } else {
    element.classList.remove('loading');
    element.style.pointerEvents = 'auto';
  }
}

// Função para smooth scroll
function smoothScrollTo(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

// Função para formatar valores monetários
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

// Função para formatar números
function formatNumber(number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'k';
  }
  return number.toString();
}

// Função para debounce (útil para buscas)
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Função para throttle (útil para scroll events)
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Função para detectar dispositivo mobile
function isMobile() {
  return window.innerWidth <= 768;
}

// Função para gerar ID único
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Função para copiar texto para clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showNotification('Texto copiado!', 'success');
  } catch (err) {
    console.error('Erro ao copiar texto:', err);
    showNotification('Erro ao copiar texto', 'error');
  }
}

// Função para validar email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Função para escapar HTML
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
}

// Função para storage local
const storage = {
  set: function (key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Erro ao salvar no localStorage:', e);
    }
  },

  get: function (key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Erro ao ler do localStorage:', e);
      return null;
    }
  },

  remove: function (key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Erro ao remover do localStorage:', e);
    }
  },
};

// Função para fazer requisições HTTP
async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

// Event listeners globais
window.addEventListener(
  'resize',
  throttle(function () {
    // Reajusta elementos responsivos se necessário
    initializeLucideIcons();
  }, 250)
);

// Previne zoom em inputs no iOS
if (isMobile()) {
  document.addEventListener('touchstart', function () {}, true);
}

// Adiciona classe para detectar se o usuário está usando teclado
document.addEventListener('keydown', function (e) {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', function () {
  document.body.classList.remove('keyboard-navigation');
});

// Exporta funções para uso global
window.MafiaUtils = {
  showNotification,
  setLoadingState,
  smoothScrollTo,
  formatCurrency,
  formatNumber,
  debounce,
  throttle,
  isMobile,
  generateId,
  copyToClipboard,
  isValidEmail,
  escapeHtml,
  storage,
  fetchData,
};

console.log('🔥 Máfia 30k - Sistema carregado com sucesso!');
