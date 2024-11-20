document.addEventListener('DOMContentLoaded', () => {
    const editarPerfilButton = document.getElementById('editarPerfilButton');
    const editarPerfilFormContainer = document.getElementById('editarPerfilFormContainer');
    const cancelarEdicaoButton = document.getElementById('cancelarEdicao');

    // Função para carregar informações do perfil
    function carregarPerfil() {
        const perfil = JSON.parse(localStorage.getItem('perfil')) || {
            nome: 'Usuário',
            cpf: '---',
            crp: '---',
            email: '---'
        };

        document.getElementById('perfilNome').textContent = perfil.nome;
        document.getElementById('perfilCPF').textContent = perfil.cpf;
        document.getElementById('perfilCRP').textContent = perfil.crp;
        document.getElementById('perfilEmail').textContent = perfil.email;

        // Preencher o formulário com os dados existentes
        document.getElementById('nomeCompleto').value = perfil.nome;
        document.getElementById('cpf').value = perfil.cpf;
        document.getElementById('crp').value = perfil.crp;
        document.getElementById('email').value = perfil.email;
    }

    // Mostrar formulário de edição
    editarPerfilButton.addEventListener('click', () => {
        editarPerfilFormContainer.classList.add('visible');
    });

    // Cancelar edição
    cancelarEdicaoButton.addEventListener('click', () => {
        editarPerfilFormContainer.classList.remove('visible');
    });

    // Salvar alterações no perfil
    document.getElementById('salvarPerfil').addEventListener('click', () => {
        const nomeCompleto = document.getElementById('nomeCompleto').value.trim();
        const crp = document.getElementById('crp').value.trim();
        const email = document.getElementById('email').value.trim();

        if (!nomeCompleto || !crp || !email) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const perfil = {
            nome: nomeCompleto,
            cpf: document.getElementById('cpf').value, // CPF não pode ser alterado
            crp,
            email
        };

        // Salvar no localStorage
        localStorage.setItem('perfil', JSON.stringify(perfil));

        // Atualizar a exibição
        carregarPerfil();

        alert('Perfil atualizado com sucesso!');
        editarPerfilFormContainer.classList.remove('visible');
    });

    // Carregar perfil ao iniciar
    carregarPerfil();
});
