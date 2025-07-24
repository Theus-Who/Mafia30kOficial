   feather.replace(); // Inicializa Feather Icons

        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const toggleLink = document.getElementById('toggleLink');
        const toggleText = document.getElementById('toggleText');
        let isLoginFormActive = true;

        // Função para alternar os formulários
        const toggleForms = () => {
            if (isLoginFormActive) {
                // Login para Cadastro
                loginForm.classList.remove('active');
                loginForm.classList.add('inactive-left');
                setTimeout(() => {
                    loginForm.style.display = 'none'; // Esconde o login após a transição
                    registerForm.style.display = 'block'; // Mostra o cadastro
                    registerForm.classList.add('active');
                    registerForm.classList.remove('inactive-right');
                    loginForm.classList.remove('inactive-left'); // Limpa classe para o próximo ciclo
                }, 400); // Tempo um pouco maior para a transição
                toggleText.innerHTML = 'Já tem acesso? <a href="" id="toggleLink">Entrar no sistema.</a>';
            } else {
                // Cadastro para Login
                registerForm.classList.remove('active');
                registerForm.classList.add('inactive-right');
                setTimeout(() => {
                    registerForm.style.display = 'none'; // Esconde o cadastro após a transição
                    loginForm.style.display = 'block'; // Mostra o login
                    loginForm.classList.add('active');
                    loginForm.classList.remove('inactive-left');
                    registerForm.classList.remove('inactive-right'); // Limpa classe
                }, 400);
                
            }
            isLoginFormActive = !isLoginFormActive;
            // Re-atribui o event listener ao novo link, já que o innerHTML foi alterado
            document.getElementById('toggleLink').removeEventListener('click', handleToggleClick); // Remove o antigo
            document.getElementById('toggleLink').addEventListener('click', handleToggleClick); // Adiciona o novo
        };

        // Handler para o clique no link de toggle
        const handleToggleClick = (e) => {
            e.preventDefault();
            toggleForms();
        };

        // Adiciona o event listener inicial
        toggleLink.addEventListener('click', handleToggleClick);

        // Configura o formulário inicial ao carregar a página
        document.addEventListener('DOMContentLoaded', () => {
            registerForm.style.display = 'none'; // Garante que o formulário de cadastro comece escondido
            loginForm.classList.add('active'); // Garante que o login esteja ativo ao carregar
        });

        // Simples prevenção de recarregamento para os formulários de exemplo
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Tentativa de Login no Sistema Máfia 30K. Autenticando credenciais...');
            // Lógica de autenticação real aqui
        });

        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Solicitação de Registro Enviada. Aguardando aprovação dos controladores...');
            // Lógica de registro real aqui
        });