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

/**
 * Inicializa funcionalidades do carrinho
 */
function initializeCart() {
    // Carrega carrinho do localStorage
    const savedCart = MafiaUtils.storage.get('fusion_cart');
    if (savedCart) {
        fusionState.cart = savedCart;
        updateCartUI();
    }
    
    // Cria indicador de carrinho na navegação
    createCartIndicator();
}

/**
 * Cria indicador de carrinho
 */
function createCartIndicator() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    const cartIndicator = document.createElement('div');
    cartIndicator.className = 'cart-indicator';
    cartIndicator.innerHTML = `
        <button class="cart-btn" id="cart-btn">
            <i data-lucide="utensils"></i>
            <span class="cart-count" id="cart-count">0</span>
        </button>
    `;
    
    cartIndicator.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
    `;
    
    const cartBtn = cartIndicator.querySelector('.cart-btn');
    cartBtn.style.cssText = `
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #ff6b35, #ff4757);
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(255, 107, 53, 0.4);
        transition: all 0.3s ease;
        position: relative;
    `;
    
    const cartCount = cartIndicator.querySelector('.cart-count');
    cartCount.style.cssText = `
        position: absolute;
        top: -5px;
        right: -5px;
        background: #ff0080;
        color: white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        font-size: 12px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 24px;
    `;
    
    document.body.appendChild(cartIndicator);
    
    // Event listener
    cartBtn.addEventListener('click', function() {
        showCartModal();
    });
    
    // Hover effects
    cartBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 30px rgba(255, 107, 53, 0.6)';
    });
    
    cartBtn.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '0 4px 20px rgba(255, 107, 53, 0.4)';
    });
    
    lucide.createIcons();
}

/**
 * Atualiza UI do carrinho
 */
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = fusionState.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

/**
 * Mostra modal do carrinho
 */
function showCartModal() {
    if (fusionState.cart.length === 0) {
        MafiaUtils.showNotification('Seu carrinho está vazio!', 'info');
        return;
    }
    
    const total = fusionState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const modal = document.createElement('div');
    modal.className = 'cart-modal';
    modal.innerHTML = `
        <div class="cart-modal-content">
            <div class="cart-header">
                <h3>🍛 Seu Pedido Fusion</h3>
                <button class="cart-close" onclick="this.closest('.cart-modal').remove()">
                    <i data-lucide="x"></i>
                </button>
            </div>
            
            <div class="cart-items">
                ${fusionState.cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <p>R$ ${item.price} x ${item.quantity}</p>
                            <small>Tempo: ${item.time}</small>
                        </div>
                        <div class="cart-item-total">
                            R$ ${item.price * item.quantity}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="cart-footer">
                <div class="delivery-info">
                    <p><i data-lucide="clock"></i> Entrega estimada: 45-60 min</p>
                    <p><i data-lucide="truck"></i> Taxa de entrega: Grátis</p>
                </div>
                <div class="cart-total">
                    <strong>Total: ${MafiaUtils.formatCurrency(total)}</strong>
                </div>
                <button class="btn-checkout" onclick="checkoutFusion()">
                    <i data-lucide="credit-card"></i>
                    FINALIZAR PEDIDO
                </button>
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
        background: rgba(0, 0, 0, 0.8);
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
 * Finaliza pedido
 */
function checkoutFusion() {
    const total = fusionState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    MafiaUtils.showNotification(`Pedido de ${MafiaUtils.formatCurrency(total)} confirmado! Preparando sua marmita...`, 'success');
    
    // Simula notificação de preparo
    setTimeout(() => {
        MafiaUtils.showNotification('👨‍🍳 Seu prato está sendo preparado!', 'info');
    }, 3000);
    
    setTimeout(() => {
        MafiaUtils.showNotification('🚚 Pedido saiu para entrega!', 'info');
    }, 15000);
    
    // Limpa carrinho
    fusionState.cart = [];
    MafiaUtils.storage.remove('fusion_cart');
    updateCartUI();
    
    // Fecha modal
    document.querySelector('.cart-modal')?.remove();
    
    // Analytics
    console.log(`Pedido Fusion finalizado: ${MafiaUtils.formatCurrency(total)}`);
}

// Função global para checkout
window.checkoutFusion = checkoutFusion;

// Sistema de avaliação de pratos
function rateDish(dishId, rating) {
    const dish = fusionState.dishes.find(d => d.id === dishId);
    if (dish) {
        // Simula atualização de rating
        dish.rating = ((dish.rating * dish.orders) + rating) / (dish.orders + 1);
        dish.orders++;
        
        MafiaUtils.showNotification(`Obrigado pela avaliação! ⭐${rating}`, 'success');
        
        // Salva no localStorage
        MafiaUtils.storage.set('fusion_dishes', fusionState.dishes);
    }
}

// Recomendações personalizadas
function getPersonalizedRecommendations() {
    const favorites = fusionState.favorites;
    const orderHistory = MafiaUtils.storage.get('fusion_order_history') || [];
    
    // Lógica simples de recomendação baseada em favoritos e histórico
    const recommendations = fusionState.dishes.filter(dish => {
        return !favorites.includes(dish.id) && dish.rating >= 4.5;
    }).slice(0, 3);
    
    return recommendations;
}

// Notificações de promoções
function checkPromotions() {
    const now = new Date();
    const hour = now.getHours();
    
    // Promoção de happy hour
    if (hour >= 15 && hour <= 17) {
        MafiaUtils.showNotification('🎉 Happy Hour! 20% off em todos os pratos até 17h!', 'info');
    }
    
    // Promoção de fim de semana
    if (now.getDay() === 0 || now.getDay() === 6) {
        MafiaUtils.showNotification('🌟 Fim de semana! Frete grátis em pedidos acima de R$ 30!', 'info');
    }
}

// Verifica promoções ao carregar
setTimeout(checkPromotions, 2000);

console.log('🍛 30k Fusion - Scripts carregados com sucesso!');