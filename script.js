function entrar() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const message = document.getElementById('message');

    // Verificação dos campos de usuário e senha
    if (!usuario || !senha) {
        message.textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.usuario === usuario && user.senha === senha);

    if (user) {
        localStorage.setItem('loggedUser', usuario); // Armazena o nome do usuário logado
        alert(`Entrando como: ${usuario}`);
        window.location.href = 'dashboard.html';
    } else {
        message.textContent = 'Usuário ou senha inválidos.';
    }
}
function cadastrar() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const message = document.getElementById('message');

    // Verificação dos campos de usuário e senha
    if (!usuario || !senha) {
        message.textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    if (senha.length < 6) {
        message.textContent = 'A senha deve ter pelo menos 6 caracteres.';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.usuario === usuario);

    if (userExists) {
        message.textContent = 'Usuário já existe. Tente outro.';
        return;
    }

    users.push({ usuario, senha });
    localStorage.setItem('users', JSON.stringify(users));
    message.textContent = 'Cadastro realizado com sucesso! Você pode fazer login.';

}
function buscarConsultasDoDia() {
    const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    const hoje = new Date();
    const diaHoje = hoje.getDate().toString().padStart(2, '0');
    const mesHoje = (hoje.getMonth() + 1).toString().padStart(2, '0'); // Janeiro é 0
    const anoHoje = hoje.getFullYear();
    const dataHoje = `${anoHoje}-${mesHoje}-${diaHoje}`;
    return consultas.filter(consulta => consulta.dataConsulta === dataHoje);

}
function mostrarAgendaDia() {
    const consultasHoje = buscarConsultasDoDia();
    const agendaUl = document.getElementById('agendaDia');
    agendaUl.innerHTML = '';

    if (consultasHoje.length > 0) {
        consultasHoje.forEach(consulta => {
            const li = document.createElement('li');
            li.textContent = `${consulta.horaConsulta} - Consulta com ${consulta.pacienteNome}`;
            agendaUl.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'Não há consultas para hoje.';
        agendaUl.appendChild(li);
    }
}


function listarConsultas() {
    const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    const listaUl = document.getElementById('listaConsultas');
    listaUl.innerHTML = '';

    if (consultas.length > 0) {
        consultas.forEach(consulta => {
            const li = document.createElement('li');
            li.textContent = `${consulta.dataConsulta} - ${consulta.horaConsulta} - Consulta com ${consulta.pacienteNome}`;
            listaUl.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'Não há consultas agendadas.';
        listaUl.appendChild(li);
    }
}

function cadastrarConsulta() {
    const pacienteNome = document.getElementById('paciente_nome').value;
    const dataConsulta = document.getElementById('data_consulta').value;
    const horaConsulta = document.getElementById('hora_consulta').value;

    if (pacienteNome && dataConsulta && horaConsulta) {
        const consultas = JSON.parse(localStorage.getItem('consultas')) || [];

        consultas.push({ pacienteNome, dataConsulta, horaConsulta });

        localStorage.setItem('consultas', JSON.stringify(consultas));

        alert(`Consulta cadastrada para: ${pacienteNome} em ${dataConsulta} às ${horaConsulta}`);
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function carregarConteudo(pagina) {
    fetch(pagina)
        .then(response => response.text())
        .then(html => {
            document.getElementById('conteudo').innerHTML = html;
            if (pagina === 'perfil.html') {
                mostrarAgendaDia(); // Chama a função para mostrar a agenda
            }
            if (pagina === 'listar_consultas.html') {
                listarConsultas(); // Chama a função para listar todas as consultas
            }
        })
        .catch(error => {
            console.error('Erro ao carregar conteúdo:', error);
            document.getElementById('conteudo').innerHTML = '<p>Erro ao carregar conteúdo. Tente novamente mais tarde.</p>';
        });
}

document.addEventListener("DOMContentLoaded", function() {
    const usuarioLogado = localStorage.getItem('loggedUser');
    if (usuarioLogado) {
        const usuarioLogadoElement = document.getElementById('usuarioLogado');
        if (usuarioLogadoElement) {
            usuarioLogadoElement.textContent = `Usuário: ${usuarioLogado}`;
        }
    }

    // Mostrar agenda quando o perfil é carregado
    const agendaDiaElement = document.getElementById('agendaDia');
    if (agendaDiaElement) {
        mostrarAgendaDia();
    }

    // Mostrar consultas quando a página de listar consultas é carregada
    const listaConsultasElement = document.getElementById('listaConsultas');
    if (listaConsultasElement) {
        listarConsultas();
    }
});


function logout() {
    alert("Você foi deslogado.");
    window.location.href = "index.html"; // Certifique-se de que "index.html" é o nome da sua página de login
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) return false;
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}

function cadastrar() {
    const nomeCompleto = document.getElementById('nome_completo').value;
    const senhaCadastro = document.getElementById('senhaCadastro').value;
    const cpfCadastro = document.getElementById('cpfCadastro').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('messageCadastro');

    if (!nomeCompleto || !senhaCadastro || !cpfCadastro || !email) {
        message.textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    if (senhaCadastro.length < 6) {
        message.textContent = 'A senha deve ter pelo menos 6 caracteres.';
        return;
    }

    if (!validarCPF(cpfCadastro)) {
        message.textContent = 'CPF inválido.';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.cpf === cpfCadastro || user.email === email);

    if (userExists) {
        message.textContent = 'CPF ou Email já cadastrado. Tente outro.';
        return;
    }

    users.push({ nomeCompleto, senha: senhaCadastro, cpf: cpfCadastro, email });
    localStorage.setItem('users', JSON.stringify(users));
    message.textContent = 'Cadastro realizado com sucesso! Você pode fazer login.';
}

function entrar() {
    const cpfLogin = document.getElementById('cpfLogin').value;
    const senhaLogin = document.getElementById('senhaLogin').value;
    const message = document.getElementById('message');

    if (!cpfLogin || !senhaLogin) {
        message.textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.cpf === cpfLogin && user.senha === senhaLogin);

    if (user) {
        localStorage.setItem('loggedUser', user.nomeCompleto); // Armazena o nome do usuário logado
        alert(`Entrando como: ${user.nomeCompleto}`);
        window.location.href = 'dashboard.html';
    } else {
        message.textContent = 'CPF ou senha inválidos.';
    }
}
function mostrarFormularioCadastro() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
}
function fecharFormularioCadastro() {
    window.location.href = 'index.html'; // Redireciona de volta para a página de login
}
