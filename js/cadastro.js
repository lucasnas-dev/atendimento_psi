document.getElementById('cadastrarButton').addEventListener('click', function () {
    const nomeCompleto = document.getElementById('nomeCompleto').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const confirmarSenha = document.getElementById('confirmarSenha').value.trim();

    if (!nomeCompleto || !cpf || !email || !senha || !confirmarSenha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem.');
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('users')) || [];
    if (usuarios.some(user => user.cpf === cpf || user.email === email)) {
        alert('Usuário já cadastrado com esse CPF ou Email.');
        return;
    }

    usuarios.push({ nomeCompleto, cpf, email, senha });
    localStorage.setItem('users', JSON.stringify(usuarios));
    localStorage.setItem('loggedUser', nomeCompleto); // Salva o nome completo do usuário
    alert('Cadastro realizado com sucesso! Faça login para acessar o sistema.');
    window.location.href = 'dashboard.html'; // Redireciona para o painel principal
});
