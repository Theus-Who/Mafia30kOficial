/**
 * ===================================
 * MÁFIA 30K - JAVASCRIPT DRINKS
 * Funcionalidades do bar virtual
 * ===================================
 */

// Estado global dos drinks
const drinksState = {
    currentCategory: 'autorais',
    drinks: [],
    cart: [],
    favorites: MafiaUtils.storage.get('drinks_favorites') || []
};

document.addEventListener('DOMContentLoaded', function() {
    initializeCategories();
    loadDrinksData();
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
            
            // Atualiza estado e filtra drinks
            drinksState.currentCategory = category;
            filterDrinks(category);
            
            // Analytics
            console.log(`Categoria selecionada: ${category}`);
        });
    });
}

/**
 * Carrega dados dos drinks
 */
function loadDrinksData() {
    const drinksContainer = document.getElementById('drinks-grid');
    if (!drinksContainer) return;
    
    // Simula loading
    MafiaUtils.setLoadingState(drinksContainer, true);
    
    // Dados mockados dos drinks
    const mockDrinks = [
        {
            id: 1,
            name: 'Cyber Punch',
            description: 'Vodka premium com energia de neon. Para quem programa até de madrugada.',
            price: 45,
            alcohol: '42%',
            impact: 'Alto',
            image: 'https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg?auto=compress&cs=tinysrgb&w=800',
            ingredients: ['Vodka artesanal', 'Red Bull orgânico', 'Gelo seco', 'Essência cítrica'],
            rating: 4.8,
            orders: 127,
            category: 'autorais',
            badge: '🔥'
        },
        {
            id: 2,
            name: 'Matrix Green',
            description: 'Absinto com toques digitais. Para ver além da realidade.',
            price: 65,
            alcohol: '60%',
            impact: 'Extremo',
            image: 'https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=800',
            ingredients: ['Absinto premium', 'Menta digital', 'Açúcar cristal', 'LED comestível'],
            rating: 4.9,
            orders: 89,
            category: 'autorais',
            badge: '💎'
        },
        {
            id: 3,
            name: 'Favela Gold',
            description: 'Cachaça artesanal com ouro em folha. Luxo de periferia.',
            price: 38,
            alcohol: '38%',
            impact: 'Médio',
            image: 'https://images.pexels.com/photos/1839320/pexels-photo-1839320.jpeg?auto=compress&cs=tinysrgb&w=800',
            ingredients: ['Cachaça premium', 'Ouro em folha', 'Mel da Amazônia', 'Canela'],
            rating: 4.7,
            orders: 203,
            category: 'classicos',
            badge: '👑'
        },
        {
            id: 4,
            name: 'Underground Cola',
            description: 'Refrigerante artesanal com segredos da máfia.',
            price: 18,
            alcohol: '0%',
            impact: 'Leve',
            image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=800',
            ingredients: ['Cola artesanal', 'Cafeína natural', 'Açúcar mascavo', 'Gás natural'],
            rating: 4.5,
            orders: 156,
            category: 'sem-alcool',
            badge: '⚡'
        },
        {
            id: 5,
            name: 'Diamond Martini',
            description: 'Gin premium com cristais comestíveis. Elegância underground.',
            price: 85,
            alcohol: '45%',
            impact: 'Alto',
            image: 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=800',
            ingredients: ['Gin artesanal', 'Vermute seco', 'Cristais comestíveis', 'Azeitona negra'],
            rating: 4.9,
            orders: 67,
            category: 'premium',
            badge: '💎'
        }
    ];
    
    setTimeout(() => {
        drinksState.drinks = mockDrinks;
        renderDrinks(mockDrinks);
        filterDrinks(drinksState.currentCategory);
        MafiaUtils.setLoadingState(drinksContainer, false);
    }, 1000);
}

/**
 * Renderiza os drinks
 */
function renderDrinks(drinks) {
    const drinksContainer = document.getElementById('drinks-grid');
    if (!drinksContainer) return;
    
    drinksContainer.innerHTML = '';
    
    drinks.forEach((drink, index) => {
        const drinkElement = createDrinkElement(drink);
        drinkElement.style.animationDelay = `${index * 0.1}s`;
        drinksContainer.appendChild(drinkElement);
    });
    
    // Reinicializa ícones
    lucide.createIcons();
}

/**
 * Cria elemento HTML de um drink
 */
function createDrinkElement(drink) {
    const drinkDiv = document.createElement('div');
    drinkDiv.className = 'drink-card';
    drinkDiv.setAttribute('data-category', drink.category);
    
    const isFavorite = drinksState.favorites.includes(drink.id);
    
    drinkDiv.innerHTML = `
        <div class="drink-badge">
            <span class="drink-emoji">${drink.badge}</span>
            <span class="drink-rating">${drink.rating}</span>
        </div>
        
        <div class="drink-image-container">
            <img src="${drink.image}" alt="${drink.name}" class="drink-image">
            <div class="drink-image-overlay"></div>
        </div>
        
        <div class="drink-content">
            <div class="drink-header">
                <h3 class="drink-name">${drink.name}</h3>
                <span class="drink-price">R$ ${drink.price}</span>
            </div>
            
            <p class="drink-description">${drink.description}</p>
            
            <div class="drink-stats">
                <div class="drink-stat">
                    <div class="stat-value">${drink.alcohol}</div>
                    <div class="stat-label">Álcool</div>
                </div>
                <div class="drink-stat">
                    <div class="stat-value">${drink.impact}</div>
                    <div class="stat-label">Impacto</div>
                </div>
                <div class="drink-stat">
                    <div class="stat-value">${drink.orders}</div>
                    <div class="stat-label">Pedidos</div>
                </div>
            </div>
            
            <div class="drink-ingredients">
                <h4 class="ingredients-title">INGREDIENTES:</h4>
                <div class="ingredients-list">
                    ${drink.ingredients.map(ingredient => 
                        `<span class="ingredient-tag">${ingredient}</span>`
                    ).join('')}
                </div>
            </div>
            
            <div class="drink-actions">
                <button class="drink-order-btn" data-drink-id="${drink.id}">
                    <i data-lucide="shopping-cart"></i>
                    PEDIR AGORA
                    <i data-lucide="arrow-right" class="btn-arrow"></i>
                </button>
                <button class="drink-favorite-btn ${isFavorite ? 'active' : ''}" data-drink-id="${drink.id}">
                    <i data-lucide="${isFavorite ? 'heart' : 'heart'}"></i>
                </button>
            </div>
        </div>
    `;
    
    // Event listeners
    const orderBtn = drinkDiv.querySelector('.drink-order-btn');
    const favoriteBtn = drinkDiv.querySelector('.drink-favorite-btn');
    
    orderBtn.addEventListener('click', function() {
        addToCart(drink);
    });
    
    favoriteBtn.addEventListener('click', function() {
        toggleFavorite(drink.id, this);
    });
    
    // Efeito hover no card
    drinkDiv.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    drinkDiv.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
    
    return drinkDiv;
}

/**
 * Filtra drinks por categoria
 */
function filterDrinks(category) {
    const drinkCards = document.querySelectorAll('.drink-card');
    
    drinkCards.forEach(card => {
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
    const visibleCards = document.querySelectorAll('.drink-card:not(.filtered-out)').length;
    console.log(`${visibleCards} drinks encontrados na categoria: ${category}`);
}

/**
 * Adiciona drink ao carrinho
 */
function addToCart(drink) {
    const existingItem = drinksState.cart.find(item => item.id === drink.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        drinksState.cart.push({
            ...drink,
            quantity: 1
        });
    }
    
    updateCartUI();
    MafiaUtils.showNotification(`${drink.name} adicionado ao carrinho!`, 'success');
    
    // Salva no localStorage
    MafiaUtils.storage.set('drinks_cart', drinksState.cart);
    
    // Analytics
    console.log(`Drink adicionado ao carrinho: ${drink.name}`);
}

/**
 * Toggle favorito
 */
function toggleFavorite(drinkId, buttonElement) {
    const index = drinksState.favorites.indexOf(drinkId);
    
    if (index > -1) {
        drinksState.favorites.splice(index, 1);
        buttonElement.classList.remove('active');
        MafiaUtils.showNotification('Removido dos favoritos', 'info');
    } else {
        drinksState.favorites.push(drinkId);
        buttonElement.classList.add('active');
        MafiaUtils.showNotification('Adicionado aos favoritos!', 'success');
    }
    
    // Salva no localStorage
    MafiaUtils.storage.set('drinks_favorites', drinksState.favorites);
    
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
    const savedCart = MafiaUtils.storage.get('drinks_cart');
    if (savedCart) {
        drinksState.cart = savedCart;
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
            <i data-lucide="shopping-cart"></i>
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
        background: linear-gradient(135deg, #39ff14, #00ffff);
        border: none;
        color: black;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(57, 255, 20, 0.4);
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
        this.style.boxShadow = '0 6px 30px rgba(57, 255, 20, 0.6)';
    });
    
    cartBtn.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '0 4px 20px rgba(57, 255, 20, 0.4)';
    });
    
    lucide.createIcons();
}

/**
 * Atualiza UI do carrinho
 */
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = drinksState.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

/**
 * Mostra modal do carrinho
 */
function showCartModal() {
    if (drinksState.cart.length === 0) {
        MafiaUtils.showNotification('Seu carrinho está vazio!', 'info');
        return;
    }
    
    const total = drinksState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const modal = document.createElement('div');
    modal.className = 'cart-modal';
    modal.innerHTML = `
        <div class="cart-modal-content">
            <div class="cart-header">
                <h3>🍹 Seu Pedido 30k</h3>
                <button class="cart-close" onclick="this.closest('.cart-modal').remove()">
                    <i data-lucide="x"></i>
                </button>
            </div>
            
            <div class="cart-items">
                ${drinksState.cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <p>R$ ${item.price} x ${item.quantity}</p>
                        </div>
                        <div class="cart-item-total">
                            R$ ${item.price * item.quantity}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="cart-footer">
                <div class="cart-total">
                    <strong>Total: ${MafiaUtils.formatCurrency(total)}</strong>
                </div>
                <button class="btn-checkout" onclick="checkout()">
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
    `;
    
    document.body.appendChild(modal);
    lucide.createIcons();
}

/**
 * Finaliza pedido
 */
function checkout() {
    const total = drinksState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    MafiaUtils.showNotification(`Pedido de ${MafiaUtils.formatCurrency(total)} enviado! Entrega em 30-45 min.`, 'success');
    
    // Limpa carrinho
    drinksState.cart = [];
    MafiaUtils.storage.remove('drinks_cart');
    updateCartUI();
    
    // Fecha modal
    document.querySelector('.cart-modal')?.remove();
    
    // Analytics
    console.log(`Pedido finalizado: ${MafiaUtils.formatCurrency(total)}`);
}

// Função global para checkout (chamada pelo modal)
window.checkout = checkout;

// Busca em tempo real (se implementada)
function initializeSearch() {
    const searchInput = document.getElementById('drinks-search');
    if (searchInput) {
        searchInput.addEventListener('input', MafiaUtils.debounce(function() {
            const query = this.value.toLowerCase();
            searchDrinks(query);
        }, 300));
    }
}

/**
 * Busca drinks por nome ou ingrediente
 */
function searchDrinks(query) {
    const drinkCards = document.querySelectorAll('.drink-card');
    
    drinkCards.forEach(card => {
        const drinkName = card.querySelector('.drink-name').textContent.toLowerCase();
        const drinkDescription = card.querySelector('.drink-description').textContent.toLowerCase();
        
        if (drinkName.includes(query) || drinkDescription.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Efeitos sonoros (opcional)
function playSound(soundName) {
    // Implementar sons se necessário
    console.log(`🔊 Som: ${soundName}`);
}

console.log('🍹 30k Drinks - Scripts carregados com sucesso!');