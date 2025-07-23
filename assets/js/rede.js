/**
 * ===================================
 * MÁFIA 30K - JAVASCRIPT REDE SOCIAL
 * Funcionalidades do feed, missões e ranking
 * ===================================
 */

// Estado global da rede social
const redeState = {
    currentTab: 'feed',
    posts: [],
    missions: [],
    userStats: {
        xp: 4250,
        maxXp: 5000,
        recognitions: 1200,
        valuePerHour: 850
    }
};

document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeNewPost();
    loadFeedData();
    loadMissionsData();
    updateUserStats();
});

/**
 * Inicializa o sistema de tabs
 */
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active de todos os botões e conteúdos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adiciona active ao botão clicado e conteúdo correspondente
            this.classList.add('active');
            const targetContent = document.getElementById(`${targetTab}-content`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Atualiza estado
            redeState.currentTab = targetTab;
            
            // Carrega dados específicos da tab
            switch (targetTab) {
                case 'feed':
                    loadFeedData();
                    break;
                case 'missions':
                    loadMissionsData();
                    break;
                case 'ranking':
                    loadRankingData();
                    break;
            }
            
            // Analytics
            console.log(`Tab ativa: ${targetTab}`);
        });
    });
}

/**
 * Inicializa funcionalidades do novo post
 */
function initializeNewPost() {
    const newPostInput = document.querySelector('.new-post-input');
    const postButton = document.querySelector('.btn-post');
    const postOptions = document.querySelectorAll('.post-option');
    
    if (newPostInput && postButton) {
        // Auto-resize do textarea
        newPostInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
            
            // Habilita/desabilita botão baseado no conteúdo
            if (this.value.trim().length > 0) {
                postButton.disabled = false;
                postButton.style.opacity = '1';
            } else {
                postButton.disabled = true;
                postButton.style.opacity = '0.6';
            }
        });
        
        // Publicar post
        postButton.addEventListener('click', function() {
            const content = newPostInput.value.trim();
            if (content) {
                publishPost(content);
                newPostInput.value = '';
                newPostInput.style.height = 'auto';
                this.disabled = true;
                this.style.opacity = '0.6';
            }
        });
        
        // Atalho Ctrl+Enter para postar
        newPostInput.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'Enter') {
                postButton.click();
            }
        });
    }
    
    // Opções de mídia
    postOptions.forEach(option => {
        option.addEventListener('click', function() {
            const type = this.title;
            MafiaUtils.showNotification(`Funcionalidade "${type}" em desenvolvimento!`, 'info');
            
            // Animação de feedback
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

/**
 * Carrega dados do feed
 */
function loadFeedData() {
    const postsContainer = document.getElementById('posts-feed');
    if (!postsContainer) return;
    
    // Simula loading
    MafiaUtils.setLoadingState(postsContainer, true);
    
    // Dados mockados dos posts
    const mockPosts = [
        {
            id: 1,
            author: 'CyberMafia_Boss',
            avatar: 'CM',
            value: 'R$ 2.500/hora',
            xp: 8750,
            level: 'Lendário',
            content: 'Acabei de fechar um freela de R$ 15k. O segredo? Nunca aceitar menos do que você vale. A máfia ensinou isso. 💰',
            image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
            likes: 127,
            comments: 23,
            shares: 8,
            badges: ['🔥', '💎', '⚡'],
            timestamp: '2h ago'
        },
        {
            id: 2,
            author: 'NeonKing30k',
            avatar: 'NK',
            value: 'R$ 800/hora',
            xp: 4200,
            level: 'Respeitado',
            content: 'Nova identidade visual pronta! Quem disse que periferia não pode ser high-tech? #CyberFavela #Design30k',
            likes: 89,
            comments: 15,
            shares: 12,
            badges: ['🎨', '🚀'],
            timestamp: '4h ago'
        },
        {
            id: 3,
            author: 'CodeMafia_Dev',
            avatar: 'CD',
            value: 'R$ 1.200/hora',
            xp: 6100,
            level: 'Elite',
            content: 'Sistema de pagamento em crypto finalizado. A revolução financeira começa na periferia! 🔐',
            likes: 156,
            comments: 31,
            shares: 19,
            badges: ['💻', '🔐', '⚡'],
            timestamp: '6h ago'
        }
    ];
    
    setTimeout(() => {
        redeState.posts = mockPosts;
        renderPosts(mockPosts);
        MafiaUtils.setLoadingState(postsContainer, false);
    }, 1000);
}

/**
 * Renderiza os posts no feed
 */
function renderPosts(posts) {
    const postsContainer = document.getElementById('posts-feed');
    if (!postsContainer) return;
    
    postsContainer.innerHTML = '';
    
    posts.forEach((post, index) => {
        const postElement = createPostElement(post);
        postElement.style.animationDelay = `${index * 0.1}s`;
        postsContainer.appendChild(postElement);
    });
    
    // Reinicializa ícones
    lucide.createIcons();
}

/**
 * Cria elemento HTML de um post
 */
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post-card';
    postDiv.innerHTML = `
        <div class="post-header">
            <div class="post-author">
                <div class="author-info">
                    <div class="author-avatar">${post.avatar}</div>
                    <div class="author-details">
                        <h4>${post.author}</h4>
                        <div class="author-meta">
                            <span class="author-value">${post.value}</span>
                            <span class="meta-separator">•</span>
                            <span class="author-xp">${MafiaUtils.formatNumber(post.xp)} XP</span>
                            <span class="meta-separator">•</span>
                            <span class="author-level">${post.level}</span>
                        </div>
                    </div>
                </div>
                <div class="post-badges">
                    ${post.badges.map(badge => `<span>${badge}</span>`).join('')}
                </div>
            </div>
            
            <p class="post-content">${post.content}</p>
            
            ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
        </div>
        
        <div class="post-actions">
            <div class="actions-list">
                <button class="action-btn" data-action="recognize" data-post-id="${post.id}">
                    <i data-lucide="heart"></i>
                    <span>Reconhecer (${post.likes})</span>
                </button>
                <button class="action-btn respect" data-action="respect" data-post-id="${post.id}">
                    <i data-lucide="message-circle"></i>
                    <span>Respeitar (${post.comments})</span>
                </button>
                <button class="action-btn seal" data-action="seal" data-post-id="${post.id}">
                    <i data-lucide="share-2"></i>
                    <span>Selar (${post.shares})</span>
                </button>
            </div>
        </div>
    `;
    
    // Adiciona event listeners para as ações
    const actionButtons = postDiv.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const postId = this.getAttribute('data-post-id');
            handlePostAction(action, postId, this);
        });
    });
    
    return postDiv;
}

/**
 * Manipula ações dos posts (reconhecer, respeitar, selar)
 */
function handlePostAction(action, postId, buttonElement) {
    const post = redeState.posts.find(p => p.id == postId);
    if (!post) return;
    
    // Animação de feedback
    buttonElement.style.transform = 'scale(0.95)';
    setTimeout(() => {
        buttonElement.style.transform = '';
    }, 150);
    
    switch (action) {
        case 'recognize':
            post.likes++;
            buttonElement.querySelector('span').textContent = `Reconhecer (${post.likes})`;
            MafiaUtils.showNotification('Post reconhecido! +5 XP', 'success');
            updateUserXP(5);
            break;
            
        case 'respect':
            MafiaUtils.showNotification('Funcionalidade de comentários em desenvolvimento!', 'info');
            break;
            
        case 'seal':
            post.shares++;
            buttonElement.querySelector('span').textContent = `Selar (${post.shares})`;
            MafiaUtils.showNotification('Post selado! +10 XP', 'success');
            updateUserXP(10);
            break;
    }
}

/**
 * Publica um novo post
 */
function publishPost(content) {
    const newPost = {
        id: Date.now(),
        author: 'CyberRebel_30k',
        avatar: 'CR',
        value: 'R$ 850/hora',
        xp: redeState.userStats.xp,
        level: 'Respeitado',
        content: content,
        likes: 0,
        comments: 0,
        shares: 0,
        badges: ['🔥'],
        timestamp: 'agora'
    };
    
    redeState.posts.unshift(newPost);
    renderPosts(redeState.posts);
    
    MafiaUtils.showNotification('Post publicado com sucesso! +25 XP', 'success');
    updateUserXP(25);
}

/**
 * Carrega dados das missões
 */
function loadMissionsData() {
    const missionsContainer = document.getElementById('missions-list');
    if (!missionsContainer) return;
    
    const mockMissions = [
        {
            title: 'Postar por 7 dias seguidos',
            progress: 4,
            total: 7,
            reward: '500 XP + Badge Disciplina',
            status: 'progress'
        },
        {
            title: 'Receber 50 "Respeitars"',
            progress: 23,
            total: 50,
            reward: '300 XP',
            status: 'progress'
        },
        {
            title: 'Completar primeiro freela',
            progress: 1,
            total: 1,
            reward: '1000 XP + Badge Pioneer',
            status: 'completed'
        },
        {
            title: 'Mentoria de 3 membros',
            progress: 0,
            total: 3,
            reward: '2000 XP + Título Mentor',
            status: 'available'
        }
    ];
    
    redeState.missions = mockMissions;
    renderMissions(mockMissions);
}

/**
 * Renderiza as missões
 */
function renderMissions(missions) {
    const missionsContainer = document.getElementById('missions-list');
    if (!missionsContainer) return;
    
    missionsContainer.innerHTML = '';
    
    missions.forEach((mission, index) => {
        const missionElement = createMissionElement(mission);
        missionElement.style.animationDelay = `${index * 0.1}s`;
        missionsContainer.appendChild(missionElement);
    });
}

/**
 * Cria elemento HTML de uma missão
 */
function createMissionElement(mission) {
    const missionDiv = document.createElement('div');
    missionDiv.className = `mission-card ${mission.status}`;
    
    const statusLabels = {
        completed: 'CONCLUÍDA',
        progress: 'EM PROGRESSO',
        available: 'DISPONÍVEL',
        locked: 'BLOQUEADA'
    };
    
    missionDiv.innerHTML = `
        <div class="mission-header">
            <div>
                <h4 class="mission-title">${mission.title}</h4>
                <p class="mission-reward">Recompensa: ${mission.reward}</p>
            </div>
            <div class="mission-status ${mission.status}">
                ${statusLabels[mission.status]}
            </div>
        </div>
        
        ${mission.status === 'progress' ? `
            <div class="mission-progress">
                <div class="progress-info">
                    <span>Progresso</span>
                    <span>${mission.progress}/${mission.total}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(mission.progress / mission.total) * 100}%"></div>
                </div>
            </div>
        ` : ''}
    `;
    
    return missionDiv;
}

/**
 * Carrega dados do ranking
 */
function loadRankingData() {
    const rankingContainer = document.getElementById('ranking-list');
    if (!rankingContainer) return;
    
    const mockRanking = [
        { position: 1, name: 'CyberBoss_Legend', xp: 12450, avatar: 'CB' },
        { position: 2, name: 'NeonQueen_30k', xp: 11200, avatar: 'NQ' },
        { position: 3, name: 'CodeMaster_Elite', xp: 9800, avatar: 'CM' },
        { position: 23, name: 'Você', xp: 4250, avatar: 'CR', isCurrentUser: true }
    ];
    
    renderRanking(mockRanking);
}

/**
 * Renderiza o ranking
 */
function renderRanking(ranking) {
    const rankingContainer = document.getElementById('ranking-list');
    if (!rankingContainer) return;
    
    rankingContainer.innerHTML = '';
    
    ranking.forEach((user, index) => {
        const userElement = document.createElement('div');
        userElement.className = `ranking-item ${user.isCurrentUser ? 'current-user' : ''}`;
        userElement.innerHTML = `
            <div class="ranking-user">
                <div class="ranking-avatar">${user.avatar}</div>
                <div class="ranking-info">
                    <span class="ranking-position">#${user.position}</span>
                    <span class="ranking-name">${user.name}</span>
                </div>
            </div>
            <div class="ranking-xp">${MafiaUtils.formatNumber(user.xp)} XP</div>
        `;
        
        userElement.style.animationDelay = `${index * 0.1}s`;
        rankingContainer.appendChild(userElement);
    });
}

/**
 * Atualiza estatísticas do usuário
 */
function updateUserStats() {
    const xpProgress = document.querySelector('.progress-fill');
    const recognitionsValue = document.querySelector('.stat-value');
    
    if (xpProgress) {
        const percentage = (redeState.userStats.xp / redeState.userStats.maxXp) * 100;
        xpProgress.style.width = `${percentage}%`;
    }
    
    // Atualiza outros stats se necessário
}

/**
 * Atualiza XP do usuário
 */
function updateUserXP(amount) {
    redeState.userStats.xp += amount;
    
    // Verifica se subiu de nível
    if (redeState.userStats.xp >= redeState.userStats.maxXp) {
        levelUp();
    }
    
    updateUserStats();
}

/**
 * Lógica de subir de nível
 */
function levelUp() {
    MafiaUtils.showNotification('🎉 LEVEL UP! Você subiu de nível na Máfia 30k!', 'success');
    
    // Efeito visual de level up
    document.body.style.animation = 'levelUpGlow 2s ease';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 2000);
    
    // Atualiza stats
    redeState.userStats.maxXp += 1000;
    redeState.userStats.valuePerHour += 50;
}

// Adiciona CSS para animação de level up
const levelUpStyle = document.createElement('style');
levelUpStyle.textContent = `
    @keyframes levelUpGlow {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.2) hue-rotate(90deg); }
    }
`;
document.head.appendChild(levelUpStyle);

// Auto-refresh do feed a cada 30 segundos
setInterval(() => {
    if (redeState.currentTab === 'feed') {
        console.log('🔄 Auto-refresh do feed');
        // loadFeedData(); // Descomentado em produção
    }
}, 30000);

console.log('👥 Rede Social 30k - Scripts carregados com sucesso!');