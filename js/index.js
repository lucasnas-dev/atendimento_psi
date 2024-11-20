document.getElementById('loginButton').addEventListener('click', function () {
    const login = document.getElementById('login').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (!login || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('users')) || [];
    const usuario = usuarios.find(user => (user.cpf === login || user.email === login) && user.senha === senha);

    if (usuario) {
        localStorage.setItem('loggedUser', usuario.nomeCompleto); // Salva o nome completo do usuário no localStorage
        alert(`Bem-vindo, ${usuario.nomeCompleto}!`);
        window.location.href = 'dashboard.html'; // Redireciona para o painel principal
    } else {
        alert('Usuário ou senha inválidos.');
    }
});
