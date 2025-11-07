// --- CONFIGURAÇÃO ---
// Substitua esta URL pela sua ID única do CrudCrud
// Lembre-se de adicionar "/clientes" ao final da sua URL
const API_URL = 'https://crudcrud.com/api/f6dbfbc030fd4d5d8cba4c06d88e5645/clientes';

// --- ELEMENTOS DO DOM ---
const form = document.getElementById('formCliente');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const listaClientes = document.getElementById('listaClientes');

// --- FUNÇÕES DE LÓGICA (API & DOM) ---

/**
 * Função 1: BUSCAR Clientes (GET)
 * Busca todos os clientes na API e os exibe na tela.
 */
async function fetchClientes() {
    console.log('Buscando clientes...');
    try {
        const response = await fetch(API_URL);
        
        // Verifica se a resposta da requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const clientes = await response.json();
        console.log('Clientes encontrados:', clientes);
        
        // Chama a função para renderizar os clientes na tela
        renderizarLista(clientes);

    } catch (error) {
        console.error('Falha ao buscar clientes:', error);
        alert('Não foi possível carregar os clientes.');
    }
}

/**
 * Função 2: RENDERIZAR Lista (Manipulação DOM)
 * Limpa a lista atual e exibe os clientes na tela (UL).
 */
function renderizarLista(clientes) {
    // Limpa a lista antes de adicionar os novos itens
    listaClientes.innerHTML = '';

    if (clientes.length === 0) {
        listaClientes.innerHTML = '<li>Nenhum cliente cadastrado.</li>';
        return;
    }

    clientes.forEach(cliente => {
        const li = document.createElement('li');
        
        // Conteúdo do item da lista (Nome e Email)
        const info = document.createElement('div');
        info.innerHTML = `
            <strong>${cliente.nome}</strong><br>
            <span>${cliente.email}</span>
        `;
        
        // Botão de Excluir
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.className = 'btn-excluir';
        
        // Adiciona o evento de clique para excluir
        // O CrudCrud usa a propriedade "_id"
        btnExcluir.onclick = () => excluirCliente(cliente._id); 
        
        li.appendChild(info);
        li.appendChild(btnExcluir);
        listaClientes.appendChild(li);
    });
}

/**
 * Função 3: CADASTRAR Cliente (POST)
 * Pega os dados do formulário e envia para a API.
 */
async function cadastrarCliente(event) {
    // Impede o comportamento padrão do formulário (recarregar a página)
    event.preventDefault();

    const nome = nomeInput.value;
    const email = emailInput.value;

    // Objeto que será enviado para a API
    const novoCliente = {
        nome: nome,
        email: email
    };

    console.log('Enviando novo cliente:', novoCliente);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoCliente) // Converte o objeto JS em string JSON
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        console.log('Cliente cadastrado com sucesso!');
        
        // Limpa os campos do formulário
        nomeInput.value = '';
        emailInput.value = '';

        // Atualiza a lista de clientes na tela
        fetchClientes();

    } catch (error) {
        console.error('Falha ao cadastrar cliente:', error);
        alert('Não foi possível cadastrar o cliente.');
    }
}

/**
 * Função 4: EXCLUIR Cliente (DELETE)
 * Recebe um ID e envia uma requisição DELETE para a API.
 */
async function excluirCliente(id) {
    console.log('Excluindo cliente ID:', id);

    // Confirmação simples
    if (!confirm('Tem certeza que deseja excluir este cliente?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            // O CrudCrud retorna um body vazio no DELETE, 
            // então só precisamos checar o 'ok'
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        console.log('Cliente excluído com sucesso!');
        
        // Atualiza a lista de clientes na tela
        fetchClientes();

    } catch (error) {
        console.error('Falha ao excluir cliente:', error);
        alert('Não foi possível excluir o cliente.');
    }
}


// --- INICIALIZAÇÃO E EVENT LISTENERS ---

// 1. Carrega os clientes assim que a página é carregada
document.addEventListener('DOMContentLoaded', fetchClientes);

// 2. Adiciona o evento de 'submit' ao formulário
form.addEventListener('submit', cadastrarCliente);