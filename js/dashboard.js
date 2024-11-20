document.addEventListener('DOMContentLoaded', function () {
    const userMenuElement = document.getElementById('userMenu');
    const userName = localStorage.getItem('loggedUser');

    // Exibe o nome do usuário ou redireciona para login
    if (userName) {
        userMenuElement.textContent = userName;
    } else {
        alert('Usuário não logado!');
        window.location.href = 'index.html';
    }

    // Configura o botão de logout
    document.getElementById('logoutButton').addEventListener('click', function () {
        localStorage.removeItem('loggedUser');
        alert('Você foi desconectado.');
        window.location.href = 'index.html';
    });

    // Configura links do menu para carregar conteúdo dinâmico
    document.querySelectorAll('.menu-superior a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const page = this.getAttribute('data-page'); // Obtém o valor do atributo data-page
            carregarPagina(page);
        });
    });
});

// Função para carregar o conteúdo dinamicamente
function carregarPagina(page) {
    const conteudoDinamico = document.getElementById('conteudoDinamico');
    conteudoDinamico.innerHTML = '<p>Carregando...</p>';

    fetch(page)
        .then(response => {
            if (!response.ok) throw new Error('Erro ao carregar a página');
            return response.text();
        })
        .then(html => {
            conteudoDinamico.innerHTML = html;
        })
        .catch(error => {
            console.error('Erro ao carregar conteúdo:', error);
            conteudoDinamico.innerHTML = '<p>Erro ao carregar a página. Tente novamente.</p>';
        });
}
