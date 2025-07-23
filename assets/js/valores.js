/**
 * ===================================
 * MÁFIA 30K - JAVASCRIPT VALORES
 * Funcionalidades do mercado de freelancers
 * ===================================
 */

// Estado global do mercado de valores
const valoresState = {
    freelancers: [],
    filteredFreelancers: [],
    currentFilters: {
        category: 'todos',
        valueRange: 'todos',
        search: '',
        sort: 'relevance'
    },
    favorites: MafiaUtils.storage.get('valores_favorites') || []
};

document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeFilters();
    loadFreelancersData();
    initializeFavorites();
});

/**
 * Inicializa sistema de busca
 */
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', MafiaUtils.debounce(function() {
            valoresState.currentFilters.search = this.value.toLowerCase();
            applyFilters();
            updateResultsCount();
        }, 300));
    }
}

/**
 * Inicializa sistema de filtros
 */
function initializeFilters() {
    // Filtros de categoria
    const categoryButtons = document.querySelectorAll('.filter-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active de todos os botões
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona active ao botão clicado
            this.classList.add('active');
            
            // Atualiza filtros
            valoresState.currentFilters.category = category;
            applyFilters();
            updateResultsCount();
        });
    });
    
    // Toggle filtros avançados
    const filtersToggle = document.getElementById('filters-toggle');
    const expandedFilters = document.getElementById('expanded-filters');
    
    if (filtersToggle && expandedFilters) {
        filtersToggle.addEventListener('click', function() {
            const isActive = expandedFilters.classList.contains('active');
            
            if (isActive) {
                expandedFilters.classList.remove('active');
                this.classList.remove('active');
            } else {
                expandedFilters.classList.add('active');
                this.classList.add('active');
            }
        });
    }
    
    // Filtro de valor
    const valueFilter = document.getElementById('value-filter');
    if (valueFilter) {
        valueFilter.addEventListener('change', function() {
            valoresState.currentFilters.valueRange = this.value;
            applyFilters();
            updateResultsCount();
        });
    }
    
    // Filtro de ordenação
    const sortFilter = document.getElementById('sort-filter');
    if (sortFilter) {
        sortFilter.addEventListener('change', function() {
            valoresState.currentFilters.sort = this.value;
            applyFilters();
            updateResultsCount();
        });
    }
}

/**
 * Carrega dados dos freelancers
 */
function loadFreelancersData() {
    const freelancersContainer = document.getElementById('freelancers-grid');
    if (!freelancersContainer) return;
    
    // Simula loading
    MafiaUtils.setLoadingState(freelancersContainer, true);
    
    // Dados mockados dos freelancers
    const mockFreelancers = [
        {
            id: 1,
            name: 'CyberDesigner_30k',
            avatar: 'CD',
            value: 150,
            category: 'design',
            specialty: 'UI/UX & Identidade Visual',
            description: 'Especialista em criar interfaces que conectam com a alma da periferia. 5+ anos transformando ideias em experiências digitais únicas.',
            rating: 4.9,
            reviews: 127,
            responseTime: '2h',
            completedJobs: 89,
            portfolio: ['Logo Cyber Favela', 'App Underground Music', 'Site E-commerce Neon'],
            badges: ['🔥', '💎', '⚡', '👑'],
            level: 'Lendário',
            online: true,
            skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'],
            joinDate: '2023-01-15'
        },
        {
            id: 2,
            name: 'CodeMafia_Boss',
            avatar: 'CM',
            value: 200,
            category: 'dev',
            specialty: 'Full Stack & Blockchain',
            description: 'Dev que programa tanto frontend quanto contratos inteligentes. Construo sistemas que não dependem de ninguém.',
            rating: 4.8,
            reviews: 94,
            responseTime: '1h',
            completedJobs: 156,
            portfolio: ['DeFi Protocol', 'NFT Marketplace', 'Sistema Banking'],
            badges: ['💻', '🔐', '⚡'],
            level: 'Elite',
            online: true,
            skills: ['React', 'Node.js', 'Solidity', 'Python'],
            joinDate: '2022-11-20'
        },
        {
            id: 3,
            name: 'VideoMafia_Creator',
            avatar: 'VM',
            value: 80,
            category: 'video',
            specialty: 'Motion Graphics & Edição',
            description: 'Crio conteúdos visuais que viralizam. Do conceito à finalização, transformo ideias em vídeos impactantes.',
            rating: 4.7,
            reviews: 203,
            responseTime: '4h',
            completedJobs: 312,
            portfolio: ['Clipe Trap Nacional', 'Motion Brand Startup', 'Documentário Social'],
            badges: ['🎬', '🔥', '⚡'],
            level: 'Respeitado',
            online: false,
            skills: ['After Effects', 'Premiere', 'Cinema 4D', 'DaVinci'],
            joinDate: '2023-03-10'
        },
        {
            id: 4,
            name: 'TextMafia_Writer',
            avatar: 'TM',
            value: 60,
            category: 'copy',
            specialty: 'Copy Persuasivo & Storytelling',
            description: 'Escrevo textos que vendem e histórias que conectam. Transformo palavras em resultados reais para seu negócio.',
            rating: 4.6,
            reviews: 178,
            responseTime: '3h',
            completedJobs: 234,
            portfolio: ['Campanha Lançamento', 'E-book 50 Páginas', 'Scripts YouTube'],
            badges: ['✍️', '📚', '💫'],
            level: 'Respeitado',
            online: true,
            skills: ['Copywriting', 'Storytelling', 'SEO', 'Email Marketing'],
            joinDate: '2023-02-05'
        },
        {
            id: 5,
            name: 'MarketingMafia_Pro',
            avatar: 'MM',
            value: 120,
            category: 'marketing',
            specialty: 'Growth Hacking & Social Media',
            description: 'Especialista em fazer marcas explodirem nas redes. Estratégias que geram resultado desde o primeiro dia.',
            rating: 4.8,
            reviews: 145,
            responseTime: '2h',
            completedJobs: 198,
            portfolio: ['Campanha Viral TikTok', 'Growth Startup B2B', 'Influencer Marketing'],
            badges: ['📱', '🚀', '💥'],
            level: 'Elite',
            online: true,
            skills: ['Facebook Ads', 'Google Ads', 'Analytics', 'Growth'],
            joinDate: '2022-12-01'
        }
    ];
    
    setTimeout(() => {
        valoresState.freelancers = mockFreelancers;
        valoresState.filteredFreelancers = [...mockFreelancers];
        renderFreelancers(valoresState.filteredFreelancers);
        updateResultsCount();
        MafiaUtils.setLoadingState(freelancersContainer, false);
    }, 1000);
}

/**
 * Aplica filtros aos freelancers
 */
function applyFilters() {
    let filtered = [...valoresState.freelancers];
    
    // Filtro por categoria
    if (valoresState.currentFilters.category !== 'todos') {
        filtered = filtered.filter(freelancer => 
            freelancer.category === valoresState.currentFilters.category
        );
    }
    
    // Filtro por busca
    if (valoresState.currentFilters.search) {
        const searchTerm = valoresState.currentFilters.search;
        filtered = filtered.filter(freelancer =>
            freelancer.name.toLowerCase().includes(searchTerm) ||
            freelancer.specialty.toLowerCase().includes(searchTerm) ||
            freelancer.description.toLowerCase().includes(searchTerm) ||
            freelancer.skills.some(skill => skill.toLowerCase().includes(searchTerm))
        );
    }
    
    // Filtro por valor
    if (valoresState.currentFilters.valueRange !== 'todos') {
        const range = valoresState.currentFilters.valueRange;
        filtered = filtered.filter(freelancer => {
            const value = freelancer.value;
            
            switch (range) {
                case '0-50':
                    return value >= 0 && value <= 50;
                case '50-100':
                    return value > 50 && value <= 100;
                case '100-200':
                    return value > 100 && value <= 200;
                case '200+':
                    return value > 200;
                default:
                    return true;
            }
        });
    }
    
    // Ordenação
    switch (valoresState.currentFilters.sort) {
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        case 'price-low':
            filtered.sort((a, b) => a.value - b.value);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.value - a.value);
            break;
        case 'response':
            filtered.sort((a, b) => {
                const timeA = parseInt(a.responseTime);
                const timeB = parseInt(b.responseTime);
                return timeA - timeB;
            });
            break;
        default: // relevance
            filtered.sort((a, b) => {
                // Algoritmo simples de relevância baseado em rating, jobs e online status
                const scoreA = (a.rating * 0.4) + (a.completedJobs * 0.003) + (a.online ? 0.5 : 0);
                const scoreB = (b.rating * 0.4) + (b.completedJobs * 0.003) + (b.online ? 0.5 : 0);
                return scoreB - scoreA;
            });
            break;
    }
    
    valoresState.filteredFreelancers = filtered;
    renderFreelancers(filtered);
}

/**
 * Renderiza os freelancers
 */
function renderFreelancers(freelancers) {
    const freelancersContainer = document.getElementById('freelancers-grid');
    const emptyState = document.getElementById('empty-state');
    
    if (!freelancersContainer) return;
    
    if (freelancers.length === 0) {
        freelancersContainer.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    
    freelancersContainer.style.display = 'grid';
    if (emptyState) emptyState.style.display = 'none';
    
    freelancersContainer.innerHTML = '';
    
    freelancers.forEach((freelancer, index) => {
        const freelancerElement = createFreelancerElement(freelancer);
        freelancerElement.style.animationDelay = `${index * 0.1}s`;
        freelancersContainer.appendChild(freelancerElement);
    });
    
    // Reinicializa ícones
    lucide.createIcons();
}

/**
 * Cria elemento HTML de um freelancer
 */
function createFreelancerElement(freelancer) {
    const freelancerDiv = document.createElement('div');
    freelancerDiv.className = 'freelancer-card';
    
    const isFavorite = valoresState.favorites.includes(freelancer.id);
    const levelColors = {
        'Lendário': 'linear-gradient(135deg, #8b5cf6, #ec4899)',
        'Elite': 'linear-gradient(135deg, #f59e0b, #ef4444)',
        'Respeitado': 'linear-gradient(135deg, #10b981, #06b6d4)'
    };
    
    freelancerDiv.innerHTML = `
        <div class="freelancer-header">
            <div class="freelancer-info">
                <div class="freelancer-profile">
                    <div class="freelancer-avatar-container">
                        <div class="freelancer-avatar" style="background: ${levelColors[freelancer.level] || levelColors['Respeitado']}">${freelancer.avatar}</div>
                        ${freelancer.online ? '<div class="online-indicator"></div>' : ''}
                    </div>
                    
                    <div class="freelancer-details">
                        <h3>${freelancer.name}</h3>
                        <p class="freelancer-specialty">${freelancer.specialty}</p>
                        <div class="freelancer-badges">
                            <span class="level-badge" style="background: ${levelColors[freelancer.level]}">${freelancer.level}</span>
                            <div class="freelancer-emojis">
                                ${freelancer.badges.map(badge => `<span>${badge}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="freelancer-value">
                    <div class="value-amount">R$ ${freelancer.value}</div>
                    <div class="value-unit">/hora</div>
                </div>
            </div>
            
            <p class="freelancer-description">${freelancer.description}</p>
            
            <div class="freelancer-stats">
                <div class="freelancer-stat">
                    <div class="stat-value">${freelancer.rating}</div>
                    <div class="stat-label">Rating</div>
                </div>
                <div class="freelancer-stat">
                    <div class="stat-value">${freelancer.reviews}</div>
                    <div class="stat-label">Reviews</div>
                </div>
                <div class="freelancer-stat">
                    <div class="stat-value">${freelancer.responseTime}</div>
                    <div class="stat-label">Resposta</div>
                </div>
                <div class="freelancer-stat">
                    <div class="stat-value">${freelancer.completedJobs}</div>
                    <div class="stat-label">Jobs</div>
                </div>
            </div>
            
            <div class="freelancer-portfolio">
                <h4 class="portfolio-title">PORTFÓLIO DESTACADO:</h4>
                <div class="portfolio-list">
                    ${freelancer.portfolio.map(item => `
                        <div class="portfolio-item">
                            <span class="portfolio-bullet">•</span>
                            ${item}
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <div class="freelancer-actions">
            <div class="actions-buttons">
                <button class="btn-hire" data-freelancer-id="${freelancer.id}">
                    <i data-lucide="message-circle"></i>
                    CONTRATAR
                </button>
                <button class="btn-favorite ${isFavorite ? 'active' : ''}" data-freelancer-id="${freelancer.id}">
                    <i data-lucide="star"></i>
                </button>
            </div>
        </div>
    `;
    
    // Event listeners
    const hireBtn = freelancerDiv.querySelector('.btn-hire');
    const favoriteBtn = freelancerDiv.querySelector('.btn-favorite');
    
    hireBtn.addEventListener('click', function() {
        showHireModal(freelancer);
    });
    
    favoriteBtn.addEventListener('click', function() {
        toggleFavorite(freelancer.id, this);
    });
    
    // Efeito hover no card
    freelancerDiv.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px) scale(1.01)';
    });
    
    freelancerDiv.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
    
    return freelancerDiv;
}

/**
 * Mostra modal de contratação
 */
function showHireModal(freelancer) {
    const modal = document.createElement('div');
    modal.className = 'hire-modal';
    modal.innerHTML = `
        <div class="hire-modal-content">
            <div class="modal-header">
                <h3>💼 Contratar ${freelancer.name}</h3>
                <button class="modal-close" onclick="this.closest('.hire-modal').remove()">
                    <i data-lucide="x"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <div class="freelancer-summary">
                    <div class="freelancer-avatar" style="background: linear-gradient(135deg, #10b981, #06b6d4)">${freelancer.avatar}</div>
                    <div class="freelancer-info">
                        <h4>${freelancer.name}</h4>
                        <p>${freelancer.specialty}</p>
                        <div class="freelancer-rate">
                            <strong>R$ ${freelancer.value}/hora</strong>
                            <span>• Responde em ${freelancer.responseTime}</span>
                        </div>
                    </div>
                </div>
                
                <form class="hire-form" onsubmit="processHire(event, ${freelancer.id})">
                    <div class="form-group">
                        <label>Título do Projeto</label>
                        <input type="text" required placeholder="Ex: Criação de logo para startup">
                    </div>
                    
                    <div class="form-group">
                        <label>Descrição Detalhada</label>
                        <textarea required placeholder="Descreva seu projeto, objetivos, prazo e qualquer informação relevante..." rows="4"></textarea>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Orçamento Estimado</label>
                            <select required>
                                <option value="">Selecione...</option>
                                <option value="500-1000">R$ 500 - R$ 1.000</option>
                                <option value="1000-2500">R$ 1.000 - R$ 2.500</option>
                                <option value="2500-5000">R$ 2.500 - R$ 5.000</option>
                                <option value="5000+">R$ 5.000+</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Prazo Desejado</label>
                            <select required>
                                <option value="">Selecione...</option>
                                <option value="1-3">1-3 dias</option>
                                <option value="1-week">1 semana</option>
                                <option value="2-weeks">2 semanas</option>
                                <option value="1-month">1 mês</option>
                                <option value="flexible">Flexível</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Seu Email</label>
                        <input type="email" required placeholder="seu@email.com">
                    </div>
                    
                    <div class="form-group">
                        <label>WhatsApp (opcional)</label>
                        <input type="tel" placeholder="(11) 99999-9999">
                    </div>
                    
                    <button type="submit" class="btn-send-proposal">
                        <i data-lucide="send"></i>
                        ENVIAR PROPOSTA
                    </button>
                </form>
            </div>
        </div>
    `;
    
    // Estilos do modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
        overflow-y: auto;
        padding: 20px;
    `;
    
    document.body.appendChild(modal);
    lucide.createIcons();
}

/**
 * Processa contratação
 */
function processHire(event, freelancerId) {
    event.preventDefault();
    
    const freelancer = valoresState.freelancers.find(f => f.id === freelancerId);
    if (!freelancer) return;
    
    const formData = new FormData(event.target);
    const hireData = {
        freelancerId: freelancerId,
        freelancerName: freelancer.name,
        projectTitle: formData.get('title'),
        description: formData.get('description'),
        budget: formData.get('budget'),
        deadline: formData.get('deadline'),
        email: formData.get('email'),
        whatsapp: formData.get('whatsapp'),
        timestamp: new Date().toISOString()
    };
    
    // Simula processamento
    const submitBtn = event.target.querySelector('.btn-send-proposal');
    MafiaUtils.setLoadingState(submitBtn, true);
    
    setTimeout(() => {
        // Salva no histórico
        const hireHistory = MafiaUtils.storage.get('hire_history') || [];
        hireHistory.push(hireData);
        MafiaUtils.storage.set('hire_history', hireHistory);
        
        MafiaUtils.showNotification(`🎉 Proposta enviada para ${freelancer.name}! Resposta em até ${freelancer.responseTime}.`, 'success');
        
        // Fecha modal
        document.querySelector('.hire-modal')?.remove();
        
        // Analytics
        console.log('Proposta enviada:', hireData);
    }, 2000);
}

// Função global para processar contratação
window.processHire = processHire;

/**
 * Toggle favorito
 */
function toggleFavorite(freelancerId, buttonElement) {
    const index = valoresState.favorites.indexOf(freelancerId);
    
    if (index > -1) {
        valoresState.favorites.splice(index, 1);
        buttonElement.classList.remove('active');
        MafiaUtils.showNotification('Removido dos favoritos', 'info');
    } else {
        valoresState.favorites.push(freelancerId);
        buttonElement.classList.add('active');
        MafiaUtils.showNotification('Adicionado aos favoritos!', 'success');
    }
    
    // Salva no localStorage
    MafiaUtils.storage.set('valores_favorites', valoresState.favorites);
    
    // Animação de feedback
    buttonElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        buttonElement.style.transform = '';
    }, 200);
}

/**
 * Inicializa sistema de favoritos
 */
function initializeFavorites() {
    // Carrega favoritos do localStorage
    const savedFavorites = MafiaUtils.storage.get('valores_favorites');
    if (savedFavorites) {
        valoresState.favorites = savedFavorites;
    }
}

/**
 * Atualiza contador de resultados
 */
function updateResultsCount() {
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        const count = valoresState.filteredFreelancers.length;
        resultsCount.textContent = `${count} talento${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`;
    }
}

/**
 * Sistema de recomendações
 */
function getRecommendations(userId) {
    // Lógica simples de recomendação baseada em histórico e favoritos
    const hireHistory = MafiaUtils.storage.get('hire_history') || [];
    const favorites = valoresState.favorites;
    
    // Recomenda freelancers similares aos favoritos
    const recommendations = valoresState.freelancers.filter(freelancer => {
        return !favorites.includes(freelancer.id) && 
               freelancer.rating >= 4.5 && 
               freelancer.online;
    }).slice(0, 3);
    
    return recommendations;
}

/**
 * Busca avançada com filtros múltiplos
 */
function advancedSearch(criteria) {
    let results = [...valoresState.freelancers];
    
    // Filtro por skills
    if (criteria.skills && criteria.skills.length > 0) {
        results = results.filter(freelancer =>
            criteria.skills.some(skill =>
                freelancer.skills.some(fSkill =>
                    fSkill.toLowerCase().includes(skill.toLowerCase())
                )
            )
        );
    }
    
    // Filtro por disponibilidade
    if (criteria.onlineOnly) {
        results = results.filter(freelancer => freelancer.online);
    }
    
    // Filtro por tempo de resposta
    if (criteria.maxResponseTime) {
        results = results.filter(freelancer => {
            const responseHours = parseInt(freelancer.responseTime);
            return responseHours <= criteria.maxResponseTime;
        });
    }
    
    // Filtro por rating mínimo
    if (criteria.minRating) {
        results = results.filter(freelancer => freelancer.rating >= criteria.minRating);
    }
    
    return results;
}

/**
 * Sistema de notificações para novos freelancers
 */
function checkNewFreelancers() {
    const lastCheck = MafiaUtils.storage.get('last_freelancer_check');
    const now = Date.now();
    
    if (!lastCheck || (now - lastCheck) > 24 * 60 * 60 * 1000) { // 24 horas
        // Simula verificação de novos freelancers
        const newFreelancersCount = Math.floor(Math.random() * 3) + 1;
        
        if (newFreelancersCount > 0) {
            MafiaUtils.showNotification(`🆕 ${newFreelancersCount} novo${newFreelancersCount > 1 ? 's' : ''} talento${newFreelancersCount > 1 ? 's' : ''} na plataforma!`, 'info');
        }
        
        MafiaUtils.storage.set('last_freelancer_check', now);
    }
}

// Verifica novos freelancers ao carregar
setTimeout(checkNewFreelancers, 3000);

// Sistema de analytics simples
function trackFreelancerView(freelancerId) {
    const views = MafiaUtils.storage.get('freelancer_views') || {};
    views[freelancerId] = (views[freelancerId] || 0) + 1;
    MafiaUtils.storage.set('freelancer_views', views);
}

// Auto-refresh da lista a cada 5 minutos
setInterval(() => {
    console.log('🔄 Verificando atualizações de freelancers...');
    // Em produção, faria uma requisição para verificar atualizações
}, 5 * 60 * 1000);

console.log('💰 Mercado de Valores - Scripts carregados com sucesso!');