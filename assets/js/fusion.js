/**
 * ===================================
 * MÁFIA 30K - JAVASCRIPT FUSION
 * Funcionalidades da marmitaria virtual
 * ===================================
 */

// Estado global do fusion
const fusionState = {
    currentCategory: 'combos',
    dishes: [],
    cart: [],
    subscription: null,
    favorites: MafiaUtils.storage.get('fusion_favorites') || []
};

document.addEventListener('DOMContentLoaded', function() {
    initializeCategories();
    initializeSubscription();
    loadDishesData();
    initializeCart();
});

/**
 * Inicializa o sistema de categorias
 */
function initializeCategories() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active de todos os botões
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona active ao botão clicado
            this.classList.add('active');
            
            // Atualiza estado e filtra pratos
            fusionState.currentCategory = category;
            filterDishes(category);
            
            // Analytics
            console.log(`Categoria selecionada: ${category}`);
        });
    });
}

/**
 * Inicializa sistema de assinatura
 */
function initializeSubscription() {
    const subscriptionButtons = document.querySelectorAll('.btn-plan, .btn-plan-popular');
    
    subscriptionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planCard = this.closest('.plan-card');
            const planTitle = planCard.querySelector('.plan-title').textContent;
            const planPrice = planCard.querySelector('.plan-price').textContent;
            
            showSubscriptionModal(planTitle, planPrice);
        });
    });
}

/**
 * Mostra modal de assinatura
 */
function showSubscriptionModal(planTitle, planPrice) {
    const modal = document.createElement('div');
    modal.className = 'subscription-modal';
    modal.innerHTML = `
        <div class="subscription-modal-content">
            <div class="modal-header">
                <h3>🍛 Assinatura ${planTitle}</h3>
                <button class="modal-close" onclick="this.closest('.subscription-modal').remove()">
                    <i data-lucide="x"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <div class="plan-summary">
                    <div class="plan-price-large">${planPrice}</div>
                    <p>Marmitas frescas entregues na sua porta, sem complicação!</p>
                </div>
                
                <div class="subscription-benefits">
                    <h4>Benefícios inclusos:</h4>
                    <ul>
                        <li>✅ Pratos autorais da Máfia 30k</li>
                        <li>✅ Ingredientes premium selecionados</li>
                        <li>✅ Entrega gratuita</li>
                        <li>✅ Flexibilidade para pausar ou cancelar</li>
                        <li>✅ Acesso a pratos exclusivos</li>
                    </ul>
                </div>
                
                <form class="subscription-form" onsubmit="processSubscription(event)">
                    <div class="form-group">
                        <label>Nome completo</label>
                        <input type="text" required placeholder="Seu nome">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" required placeholder="seu@email.com">
                    </div>
                    <div class="form-group">
                        <label>Telefone</label>
                        <input type="tel" required placeholder="(11) 99999-9999">
                    </div>
                    <div class="form-group">
                        <label>Endereço de entrega</label>
                        <textarea required placeholder="Rua, número, bairro, cidade"></textarea>
                    </div>
                    
                    <button type="submit" class="btn-subscribe">
                        <i data-lucide="credit-card"></i>
                        ASSINAR AG ORA
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
 * Processa assinatura
 */
function processSubscription(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const subscriptionData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        plan: 'Fusion 30k',
        timestamp: new Date().toISOString()
    };
    
    // Simula processamento
    const submitBtn = event.target.querySelector('.btn-subscribe');
    MafiaUtils.setLoadingState(submitBtn, true);
    
    setTimeout(() => {
        fusionState.subscription = subscriptionData;
        MafiaUtils.storage.set('fusion_subscription', subscriptionData);
        
        MafiaUtils.showNotification('🎉 Assinatura ativada! Primeira entrega em 24h.', 'success');
        
        // Fecha modal
        document.querySelector('.subscription-modal')?.remove();
        
        // Analytics
        console.log('Assinatura processada:', subscriptionData);
    }, 2000);
}

// Função global para processar assinatura
window.processSubscription = processSubscription;

/**
 * Carrega dados dos pratos
 */
function loadDishesData() {
    const dishesContainer = document.getElementById('dishes-grid');
    if (!dishesContainer) return;
    
    // Simula loading
    MafiaUtils.setLoadingState(dishesContainer, true);
    
    // Dados mockados dos pratos
    const mockDishes = [
        {
            id: 1,
            name: 'Combo Cyber Boss',
            description: 'Costela de porco com molho especial 30k + arroz neon + feijão underground',
            price: 32,
            time: '25 min',
            spice: 3,
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
            ingredients: ['Costela suína', 'Molho 30k', 'Arroz basmati', 'Feijão preto', 'Salada'],
            rating: 4.9,
            orders: 234,
            category: 'combos',
            badge: '🔥',
            isSignature: true
        },
        {
            id: 2,
            name: 'Matrix Veggie',
            description: 'Proteína vegetal com temperos futuristas + quinoa + legumes cibernéticos',
            price: 28,
            time: '20 min',
            spice: 2,
            image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800',
            ingredients: ['Proteína de soja', 'Quinoa', 'Mix de legumes', 'Molho tahine', 'Brócolis'],
            rating: 4.7,
            orders: 156,
            category: 'vegano',
            badge: '🌱',
            isSignature: false
        },
        {
            id: 3,
            name: 'Favela Gourmet',
            description: 'Picanha grelhada + farofa especial + vinagrete premium',
            price: 45,
            time: '30 min',
            spice: 2,
            image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=800',
            ingredients: ['Picanha premium', 'Farofa caseira', 'Vinagrete', 'Arroz integral', 'Salada'],
            rating: 4.8,
            orders: 189,
            category: 'premium',
            badge: '💎',
            isSignature: true
        },
        {
            id: 4,
            name: 'Underground Wrap',
            description: 'Wrap artesanal com frango desfiado + cream cheese + molho secreto',
            price: 22,
            time: '15 min',
            spice: 1,
            image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800',
            ingredients: ['Tortilla artesanal', 'Frango desfiado', 'Cream cheese', 'Alface', 'Tomate'],
            rating: 4.6,
            orders: 312,
            category: 'rapido',
            badge: '⚡',
            isSignature: false
        }
    ];
    
    setTimeout(() => {
        fusionState.dishes = mockDishes;
        renderDishes(mockDishes);
        filterDishes(fusionState.currentCategory);
        MafiaUtils.setLoadingState(dishesContainer, false);
    }, 1000);
}

/**
 * Renderiza os pratos
 */
function renderDishes(dishes) {
    const dishesContainer = document.getElementById('dishes-grid');
    if (!dishesContainer) return;
    
    dishesContainer.innerHTML = '';
    
    dishes.forEach((dish, index) => {
        const dishElement = createDishElement(dish);
        dishElement.style.animationDelay = `${index * 0.1}s`;
        dishesContainer.appendChild(dishElement);
    });
    
    // Reinicializa ícones
    lucide.createIcons();
}

/**
 * Cria elemento HTML de um prato
 */
function createDishElement(dish) {
    const dishDiv = document.createElement('div');
    dishDiv.className = 'dish-card';
    dishDiv.setAttribute('data-category', dish.category);
    
    const isFavorite = fusionState.favorites.includes(dish.id);
    const spiceLevel = '🌶️'.repeat(dish.spice) + '○'.repeat(3 - dish.spice);
    
    dishDiv.innerHTML = `
        <div class="dish-badges">
            <div class="dish-badge">
                <span class="dish-emoji">${dish.badge}</span>
                <span class="dish-rating">${dish.rating}</span>
            </div>
            ${dish.isSignature ? '<div class="signature-badge">AUTORAL</div>' : ''}
        </div>
        
        <div class="dish-image-container">
            <img src="${dish.image}" alt="${dish.name}" class="dish-image">
            <div class="dish-image-overlay"></div>
        </div>
        
        <div class="dish-content">
            <div class="dish-header">
                <h3 class="dish-name">${dish.name}</h3>
                <span class="dish-price">R$ ${dish.price}</span>
            </div>
            
            <p class="dish-description">${dish.description}</p>
            
            <div class="dish-stats">
                <div class="dish-stat">
                    <div class="stat-value">${dish.time}</div>
                    <div class="stat-label">Preparo</div>
                </div>
                <div class="dish-stat">
                    <div class="stat-value spice-level">${spiceLevel}</div>
                    <div class="stat-label">Tempero</div>
                </div>
                <div class="dish-stat">
                    <div class="stat-value">${dish.orders}</div>
                    <div class="stat-label">Pedidos</div>
                </div>
            </div>
            
            <div class="dish-ingredients">
                <h4 class="ingredients-title">INGREDIENTES:</h4>
                <div class="ingredients-list">
                    ${dish.ingredients.map(ingredient => 
                        `<span class="ingredient-tag">${ingredient}</span>`
                    ).join('')}
                </div>
            </div>
            
            <div class="dish-actions">
                <button class="dish-order-btn" data-dish-id="${dish.id}">
                    <i data-lucide="shopping-cart"></i>
                    PEDIR AGORA
                    <i data-lucide="arrow-right" class="btn-arrow"></i>
                </button>
                <button class="dish-favorite-btn ${isFavorite ? 'active' : ''}" data-dish-id="${dish.id}">
                    <i data-lucide="heart"></i>
                </button>
            </div>
        </div>
    `;
    
    // Event listeners
    const orderBtn = dishDiv.querySelector('.dish-order-btn');
    const favoriteBtn = dishDiv.querySelector('.dish-favorite-btn');
    
    orderBtn.addEventListener('click', function() {
        addToCart(dish);
    });
    
    favoriteBtn.addEventListener('click', function() {
        toggleFavorite(dish.id, this);
    });
    
    // Efeito hover no card
    dishDiv.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    dishDiv.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
    
    return dishDiv;
}

/**
 * Filtra pratos por categoria
 */
function filterDishes(category) {
    const dishCards = document.querySelectorAll('.dish-card');
    
    dishCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'todos' || cardCategory === category) {
            card.style.display = 'block';
            card.classList.add('filtered-in');
            card.classList.remove('filtered-out');
        } else {
            card.style.display = 'none';
            card.classList.add('filtered-out');
            card.classList.remove('filtered-in');
        }
    });
    
    // Atualiza contador de resultados
    const visibleCards = document.querySelectorAll('.dish-card:not(.filtered-out)').length;
    console.log(`${visibleCards} pratos encontrados na categoria: ${category}`);
}

/**
 * Adiciona prato ao carrinho
 */
function addToCart(dish) {
    const existingItem = fusionState.cart.find(item => item.id === dish.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        fusionState.cart.push({
            ...dish,
            quantity: 1
        });
    }
    
    updateCartUI();
    MafiaUtils.showNotification(`${dish.name} adicionado ao carrinho!`, 'success');
    
    // Salva no localStorage
    MafiaUtils.storage.set('fusion_cart', fusionState.cart);
    
    // Analytics
    console.log(`Prato adicionado ao carrinho: ${dish.name}`);
}

/**
 * Toggle favorito
 */
function toggleFavorite(dishId, buttonElement) {
    const index = fusionState.favorites.indexOf(dishId);
    
    if (index > -1) {
        fusionState.favorites.splice(index, 1);
        buttonElement.classList.remove('active');
        MafiaUtils.showNotification('Removido dos favoritos', 'info');
    } else {
        fusionState.favorites.push(dishId);
        buttonElement.classList.add('active');
        MafiaUtils.showNotification('Adicionado aos favoritos!', 'success');
    }
    
    // Salva no localStorage
    MafiaUtils.storage.set('fusion_favorites', fusionState.favorites);
    
    // Animação de feedback
    buttonElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        buttonElement.style.transform = '';
    }, 200);
}


console.log('🍛 30k Fusion - Scripts carregados com sucesso!');