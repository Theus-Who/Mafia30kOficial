/**
 * ===================================
 * MÁFIA 30K - JAVASCRIPT PERFIL
 * Funcionalidades da identidade digital
 * ===================================
 */

// Estado global do perfil
const perfilState = {
    currentTab: 'overview',
    userProfile: {
        name: 'Theus_Who30k',
        value: 20,
        level: 'Respeitado',
        xp: 4250,
        maxXp: 5000,
        rank: 23,
        joinDate: 'Jan 2024',
        totalEarnings: 15640,
        completedProjects: 28,
        rating: 4.7,
        followers: 342
    },
    skills: [],
    badges: [],
    missions: [],
    activities: []
};

document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeProfileEdit();
    loadProfileData();
    updateProfileStats();
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
            perfilState.currentTab = targetTab;
            
            // Carrega dados específicos da tab
            switch (targetTab) {
                case 'overview':
                    loadOverviewData();
                    break;
                case 'badges':
                    loadBadgesData();
                    break;
                case 'missions':
                    loadMissionsData();
                    break;
                case 'activity':
                    loadActivityData();
                    break;
            }
            
            // Analytics
            console.log(`Tab ativa: ${targetTab}`);
        });
    });
}

/**

    
    // Botões de ação rápida
    const quickActionBtns = document.querySelectorAll('.sidebar-btn');
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            handleQuickAction(action);
        });
    });
}

/**
 * Mostra modal de edição de perfil
 */
function showEditProfileModal() {
    const modal = document.createElement('div');
    modal.className = 'edit-profile-modal';
    modal.innerHTML = `
        <div class="edit-profile-modal-content">
            <div class="modal-header">
                <h3>✏️ Editar Perfil 30k</h3>
                <button class="modal-close" onclick="this.closest('.edit-profile-modal').remove()">
                    <i data-lucide="x"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <form class="edit-profile-form" onsubmit="saveProfile(event)">
                    <div class="form-group">
                        <label>Nome de Guerra</label>
                        <input type="text" value="${perfilState.userProfile.name}" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Valor por Hora (R$)</label>
                        <input type="number" value="${perfilState.userProfile.value}" min="1" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Bio/Descrição</label>
                        <textarea placeholder="Conte sua história na máfia..." rows="3"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Especialidades</label>
                        <input type="text" placeholder="Ex: UI/UX, Frontend, Design">
                        <small>Separe por vírgulas</small>
                    </div>
                    
                    <div class="form-group">
                        <label>Localização</label>
                        <input type="text" placeholder="Ex: São Paulo, SP">
                    </div>
                    
                    <div class="form-group">
                        <label>Portfolio/Site</label>
                        <input type="url" placeholder="https://seusite.com">
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn-cancel" onclick="this.closest('.edit-profile-modal').remove()">
                            Cancelar
                        </button>
                        <button type="submit" class="btn-save">
                            <i data-lucide="save"></i>
                            Salvar Alterações
                        </button>
                    </div>
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
 * Mostra modal de edição de avatar
 */
function showAvatarEditModal() {
    const modal = document.createElement('div');
    modal.className = 'avatar-edit-modal';
    modal.innerHTML = `
        <div class="avatar-edit-modal-content">
            <div class="modal-header">
                <h3>📸 Personalizar Avatar</h3>
                <button class="modal-close" onclick="this.closest('.avatar-edit-modal').remove()">
                    <i data-lucide="x"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <div class="avatar-options">
                    <h4>Escolha seu estilo:</h4>
                    <div class="avatar-grid">
                        ${generateAvatarOptions()}
                    </div>
                </div>
                
                <div class="avatar-colors">
                    <h4>Esquema de cores:</h4>
                    <div class="color-grid">
                        <div class="color-option" data-gradient="linear-gradient(135deg, #10b981, #06b6d4)" style="background: linear-gradient(135deg, #10b981, #06b6d4)"></div>
                        <div class="color-option" data-gradient="linear-gradient(135deg, #f59e0b, #ef4444)" style="background: linear-gradient(135deg, #f59e0b, #ef4444)"></div>
                        <div class="color-option" data-gradient="linear-gradient(135deg, #8b5cf6, #ec4899)" style="background: linear-gradient(135deg, #8b5cf6, #ec4899)"></div>
                        <div class="color-option" data-gradient="linear-gradient(135deg, #39ff14, #00ffff)" style="background: linear-gradient(135deg, #39ff14, #00ffff)"></div>
                        <div class="color-option" data-gradient="linear-gradient(135deg, #ff0080, #ff6b35)" style="background: linear-gradient(135deg, #ff0080, #ff6b35)"></div>
                    </div>
                </div>
                
                <div class="avatar-preview">
                    <h4>Preview:</h4>
                    <div class="preview-avatar" id="preview-avatar">CR</div>
                </div>
                
                <div class="modal-actions">
                    <button class="btn-save-avatar" onclick="saveAvatar()">
                        <i data-lucide="check"></i>
                        Aplicar Avatar
                    </button>
                </div>
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
    
    // Event listeners para as opções
    const colorOptions = modal.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            const gradient = this.getAttribute('data-gradient');
            const preview = document.getElementById('preview-avatar');
            if (preview) {
                preview.style.background = gradient;
            }
        });
    });
    
    lucide.createIcons();
}

/**
 * Gera opções de avatar
 */
function generateAvatarOptions() {
    const styles = [
        { text: 'CR', label: 'Iniciais' },
        { text: '🤖', label: 'Cyber' },
        { text: '👑', label: 'Boss' },
        { text: '⚡', label: 'Energy' },
        { text: '🔥', label: 'Fire' },
        { text: '💎', label: 'Diamond' }
    ];
    
    return styles.map(style => `
        <div class="avatar-style-option" data-text="${style.text}">
            <div class="style-preview">${style.text}</div>
            <span class="style-label">${style.label}</span>
        </div>
    `).join('');
}

/**
 * Salva perfil editado
 */
function saveProfile(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const updatedProfile = {
        ...perfilState.userProfile,
        name: formData.get('name') || perfilState.userProfile.name,
        value: parseInt(formData.get('value')) || perfilState.userProfile.value
    };
    
    // Simula salvamento
    const saveBtn = event.target.querySelector('.btn-save');
    MafiaUtils.setLoadingState(saveBtn, true);
    
    setTimeout(() => {
        perfilState.userProfile = updatedProfile;
        MafiaUtils.storage.set('user_profile', updatedProfile);
        
        // Atualiza UI
        updateProfileDisplay();
        
        MafiaUtils.showNotification('✅ Perfil atualizado com sucesso!', 'success');
        
        // Fecha modal
        document.querySelector('.edit-profile-modal')?.remove();
        
        // Analytics
        console.log('Perfil atualizado:', updatedProfile);
    }, 1500);
}

/**
 * Salva avatar personalizado
 */
function saveAvatar() {
    const selectedColor = document.querySelector('.color-option.selected');
    const selectedStyle = document.querySelector('.avatar-style-option.selected');
    
    if (selectedColor) {
        const gradient = selectedColor.getAttribute('data-gradient');
        const avatar = document.querySelector('.avatar');
        
        if (avatar) {
            avatar.style.background = gradient;
        }
        
        // Salva no localStorage
        MafiaUtils.storage.set('user_avatar_style', {
            gradient: gradient,
            text: selectedStyle?.getAttribute('data-text') || 'CR'
        });
        
        MafiaUtils.showNotification('🎨 Avatar atualizado!', 'success');
    }
    
    // Fecha modal
    document.querySelector('.avatar-edit-modal')?.remove();
}

// Funções globais para os modais
window.saveProfile = saveProfile;
window.saveAvatar = saveAvatar;

/**
 * Manipula ações rápidas
 */
function handleQuickAction(action) {
    switch (action) {
        case 'Atualizar Valor/Hora':
            showValueUpdateModal();
            break;
        case 'Buscar Projetos':
            window.location.href = 'valores.html';
            break;
        case 'Conectar Talentos':
            MafiaUtils.showNotification('🤝 Funcionalidade de networking em desenvolvimento!', 'info');
            break;
        default:
            console.log(`Ação: ${action}`);
    }
}

/**
 * Mostra modal de atualização de valor
 */
function showValueUpdateModal() {
    const modal = document.createElement('div');
    modal.className = 'value-update-modal';
    modal.innerHTML = `
        <div class="value-update-modal-content">
            <div class="modal-header">
                <h3>💰 Atualizar Valor/Hora</h3>
                <button class="modal-close" onclick="this.closest('.value-update-modal').remove()">
                    <i data-lucide="x"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <div class="current-value">
                    <h4>Valor Atual:</h4>
                    <div class="value-display">R$ ${perfilState.userProfile.value}/hora</div>
                </div>
                
                <div class="value-suggestions">
                    <h4>Sugestões baseadas no seu nível:</h4>
                    <div class="suggestions-grid">
                        <div class="suggestion-card" data-value="900">
                            <div class="suggestion-value">R$ 900/h</div>
                            <div class="suggestion-label">Conservador (+6%)</div>
                        </div>
                        <div class="suggestion-card recommended" data-value="1000">
                            <div class="suggestion-value">R$ 1.000/h</div>
                            <div class="suggestion-label">Recomendado (+18%)</div>
                            <div class="suggestion-badge">💡</div>
                        </div>
                        <div class="suggestion-card" data-value="1200">
                            <div class="suggestion-value">R$ 1.200/h</div>
                            <div class="suggestion-label">Ousado (+41%)</div>
                        </div>
                    </div>
                </div>
                
                <div class="custom-value">
                    <h4>Ou defina um valor personalizado:</h4>
                    <div class="value-input-group">
                        <span class="currency-symbol">R$</span>
                        <input type="number" id="custom-value" min="1" placeholder="${perfilState.userProfile.value}">
                        <span class="hour-label">/hora</span>
                    </div>
                </div>
                
                <div class="value-tips">
                    <h4>💡 Dicas da Máfia 30k:</h4>
                    <ul>
                        <li>Considere sua experiência e resultados entregues</li>
                        <li>Pesquise valores de mercado na sua área</li>
                        <li>Lembre-se: você define seu próprio valor</li>
                        <li>Aumente gradualmente conforme ganha experiência</li>
                    </ul>
                </div>
                
                <div class="modal-actions">
                    <button class="btn-update-value" onclick="updateValue()">
                        <i data-lucide="trending-up"></i>
                        Atualizar Valor
                    </button>
                </div>
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
    
    // Event listeners para sugestões
    const suggestionCards = modal.querySelectorAll('.suggestion-card');
    suggestionCards.forEach(card => {
        card.addEventListener('click', function() {
            suggestionCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            const value = this.getAttribute('data-value');
            document.getElementById('custom-value').value = value;
        });
    });
    
    lucide.createIcons();
}

/**
 * Atualiza valor por hora
 */
function updateValue() {
    const customValue = document.getElementById('custom-value').value;
    const selectedSuggestion = document.querySelector('.suggestion-card.selected');
    
    let newValue = customValue || (selectedSuggestion ? selectedSuggestion.getAttribute('data-value') : null);
    
    if (!newValue || newValue <= 0) {
        MafiaUtils.showNotification('❌ Por favor, selecione ou digite um valor válido', 'error');
        return;
    }
    
    newValue = parseInt(newValue);
    const oldValue = perfilState.userProfile.value;
    const increase = ((newValue - oldValue) / oldValue * 100).toFixed(1);
    
    // Atualiza perfil
    perfilState.userProfile.value = newValue;
    MafiaUtils.storage.set('user_profile', perfilState.userProfile);
    
    // Atualiza UI
    updateProfileDisplay();
    
    // Feedback baseado no aumento
    if (newValue > oldValue) {
        MafiaUtils.showNotification(`🚀 Valor atualizado! Aumento de ${increase}% - você merece!`, 'success');
        
        // XP bonus por aumentar valor
        updateUserXP(50);
    } else if (newValue < oldValue) {
        MafiaUtils.showNotification(`📉 Valor reduzido. Lembre-se: você define seu próprio valor!`, 'info');
    } else {
        MafiaUtils.showNotification(`✅ Valor mantido em R$ ${newValue}/hora`, 'info');
    }
    
    // Fecha modal
    document.querySelector('.value-update-modal')?.remove();
    
    // Analytics
    console.log(`Valor atualizado: R$ ${oldValue} → R$ ${newValue} (${increase}%)`);
}

// Função global para atualizar valor
window.updateValue = updateValue;

/**
 * Carrega dados do perfil
 */
function loadProfileData() {
    // Carrega perfil salvo
    const savedProfile = MafiaUtils.storage.get('user_profile');
    if (savedProfile) {
        perfilState.userProfile = { ...perfilState.userProfile, ...savedProfile };
    }
    
    // Carrega avatar personalizado
    const savedAvatar = MafiaUtils.storage.get('user_avatar_style');
    if (savedAvatar) {
        const avatar = document.querySelector('.avatar');
        if (avatar) {
            avatar.style.background = savedAvatar.gradient;
            avatar.textContent = savedAvatar.text;
        }
    }
    
    // Carrega dados das tabs
    loadOverviewData();
}

/**
 * Carrega dados da tab Overview
 */
function loadOverviewData() {
    loadSkillsData();
    loadToolsData();
}

/**
 * Carrega dados de habilidades
 */
function loadSkillsData() {
    const skillsList = document.getElementById('skills-list');
    if (!skillsList) return;
    
    const mockSkills = [
        { name: 'UI/UX Design', level: 4 },
        { name: 'Identidade Visual', level: 5 },
        { name: 'Motion Graphics', level: 3 },
        { name: 'Frontend', level: 4 }
    ];
    
    perfilState.skills = mockSkills;
    
    skillsList.innerHTML = mockSkills.map(skill => `
        <div class="skill-item">
            <span class="skill-name">${skill.name}</span>
            <div class="skill-rating">
                ${[...Array(5)].map((_, i) => `
                    <div class="skill-dot ${i < skill.level ? 'filled' : ''}"></div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

/**
 * Carrega dados de ferramentas
 */
function loadToolsData() {
    const toolsList = document.getElementById('tools-list');
    if (!toolsList) return;
    
    const mockTools = ['Figma', 'Adobe XD', 'React', 'Tailwind', 'After Effects'];
    
    toolsList.innerHTML = mockTools.map(tool => `
        <span class="tool-tag">${tool}</span>
    `).join('');
}

/**
 * Carrega dados de badges
 */
function loadBadgesData() {
    const badgesGrid = document.getElementById('badges-grid');
    if (!badgesGrid) return;
    
    const mockBadges = [
        { id: 1, name: 'Primeiro Post', emoji: '🔥', earned: true },
        { id: 2, name: '100 Reconhecimentos', emoji: '💯', earned: true },
        { id: 3, name: 'Mentor da Máfia', emoji: '👑', earned: true },
        { id: 4, name: 'Freela Legend', emoji: '💎', earned: false },
        { id: 5, name: 'Cyber Influencer', emoji: '⚡', earned: false },
        { id: 6, name: 'Underground Boss', emoji: '🛡️', earned: false }
    ];
    
    perfilState.badges = mockBadges;
    
    badgesGrid.innerHTML = mockBadges.map(badge => `
        <div class="badge-card ${badge.earned ? 'earned' : 'not-earned'}">
            <div class="badge-emoji">${badge.emoji}</div>
            <h4 class="badge-name">${badge.name}</h4>
            <p class="badge-status">${badge.earned ? 'Conquistado!' : 'Não conquistado'}</p>
        </div>
    `).join('');
}

/**
 * Carrega dados de missões
 */
function loadMissionsData() {
    const missionsList = document.getElementById('missions-list');
    if (!missionsList) return;
    
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
    
    perfilState.missions = mockMissions;
    
    const statusLabels = {
        completed: 'CONCLUÍDA',
        progress: 'EM PROGRESSO',
        available: 'DISPONÍVEL',
        locked: 'BLOQUEADA'
    };
    
    missionsList.innerHTML = mockMissions.map(mission => `
        <div class="mission-card ${mission.status}">
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
        </div>
    `).join('');
}

/**
 * Carrega dados de atividade
 */
function loadActivityData() {
    const activityList = document.getElementById('activity-list');
    if (!activityList) return;
    
    const mockActivities = [
        { type: 'post', content: 'Novo projeto de identidade visual finalizado! 🎨', time: '2h ago', interactions: 45 },
        { type: 'achievement', content: 'Conquistou badge "100 Reconhecimentos"', time: '1d ago', interactions: 0 },
        { type: 'project', content: 'Projeto "Logo Cyber Startup" aprovado', time: '3d ago', interactions: 12 },
        { type: 'level', content: 'Subiu para nível "Respeitado"', time: '1w ago', interactions: 89 }
    ];
    
    perfilState.activities = mockActivities;
    
    const getActivityIcon = (type) => {
        switch (type) {
            case 'post': return '📝';
            case 'achievement': return '🏆';
            case 'project': return '💼';
            case 'level': return '⬆️';
            default: return '📌';
        }
    };
    
    activityList.innerHTML = mockActivities.map(activity => `
        <div class="activity-card">
            <div class="activity-content">
                <div class="activity-icon">${getActivityIcon(activity.type)}</div>
                <div class="activity-details">
                    <p class="activity-text">${activity.content}</p>
                    <div class="activity-meta">
                        <span class="activity-time">${activity.time}</span>
                        ${activity.interactions > 0 ? `<span class="activity-interactions">${activity.interactions} interações</span>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Atualiza display do perfil
 */
function updateProfileDisplay() {
    // Atualiza nome
    const userName = document.querySelector('.user-name');
    if (userName) {
        userName.textContent = perfilState.userProfile.name;
    }
    
    // Atualiza valor
    const userValue = document.querySelector('.user-value');
    if (userValue) {
        userValue.innerHTML = `R$ ${perfilState.userProfile.value}<span class="value-unit">/hora</span>`;
    }
    
    // Atualiza outros stats se necessário
    updateProfileStats();
}

/**
 * Atualiza estatísticas do perfil
 */
function updateProfileStats() {
    const xpProgress = document.querySelector('.xp-progress');
    if (xpProgress) {
        const percentage = (perfilState.userProfile.xp / perfilState.userProfile.maxXp) * 100;
        xpProgress.style.width = `${percentage}%`;
    }
    
    // Atualiza números XP
    const xpNumbers = document.querySelector('.xp-numbers');
    if (xpNumbers) {
        xpNumbers.textContent = `${perfilState.userProfile.xp}/${perfilState.userProfile.maxXp}`;
    }
}

/**
 * Atualiza XP do usuário
 */
function updateUserXP(amount) {
    perfilState.userProfile.xp += amount;
    
    // Verifica se subiu de nível
    if (perfilState.userProfile.xp >= perfilState.userProfile.maxXp) {
        levelUp();
    }
    
    updateProfileStats();
    
    // Salva no localStorage
    MafiaUtils.storage.set('user_profile', perfilState.userProfile);
}

/**
 * Lógica de subir de nível
 */
function levelUp() {
    MafiaUtils.showNotification('🎉 LEVEL UP! Você evoluiu na Máfia 30k!', 'success');
    
    // Efeito visual de level up
    document.body.style.animation = 'levelUpGlow 2s ease';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 2000);
    
    // Atualiza stats
    perfilState.userProfile.maxXp += 1000;
    
    // Determina novo nível baseado no XP
    const totalXp = perfilState.userProfile.xp;
    if (totalXp >= 10000) {
        perfilState.userProfile.level = 'Lendário';
    } else if (totalXp >= 7500) {
        perfilState.userProfile.level = 'Elite';
    } else if (totalXp >= 5000) {
        perfilState.userProfile.level = 'Respeitado';
    }
    
    // Atualiza display
    updateProfileDisplay();
}

// Sistema de conquistas automáticas
function checkAchievements() {
    const profile = perfilState.userProfile;
    
    // Verifica conquistas baseadas em stats
    if (profile.completedProjects >= 50 && !hasEarnedBadge('Freela Legend')) {
        earnBadge('Freela Legend', '💎');
    }
    
    if (profile.followers >= 500 && !hasEarnedBadge('Cyber Influencer')) {
        earnBadge('Cyber Influencer', '⚡');
    }
    
    if (profile.totalEarnings >= 50000 && !hasEarnedBadge('Underground Boss')) {
        earnBadge('Underground Boss', '🛡️');
    }
}

/**
 * Verifica se tem badge específico
 */
function hasEarnedBadge(badgeName) {
    return perfilState.badges.some(badge => badge.name === badgeName && badge.earned);
}

/**
 * Conquista um badge
 */
function earnBadge(badgeName, emoji) {
    const badge = perfilState.badges.find(b => b.name === badgeName);
    if (badge && !badge.earned) {
        badge.earned = true;
        MafiaUtils.showNotification(`🏆 Badge conquistado: ${emoji} ${badgeName}!`, 'success');
        
        // Atualiza display se estiver na tab badges
        if (perfilState.currentTab === 'badges') {
            loadBadgesData();
        }
        
        // XP bonus
        updateUserXP(100);
    }
}

// Verifica conquistas periodicamente
setInterval(checkAchievements, 30000); // A cada 30 segundos

// Sistema de backup automático
setInterval(() => {
    MafiaUtils.storage.set('profile_backup', {
        profile: perfilState.userProfile,
        skills: perfilState.skills,
        badges: perfilState.badges,
        timestamp: Date.now()
    });
}, 60000); // A cada minuto

console.log('🛡️ Perfil 30k - Scripts carregados com sucesso!');