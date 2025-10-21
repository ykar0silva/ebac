document.getElementById('cep').addEventListener('blur', (evento) => {
    let cep = evento.target.value;
    

    if (!(cep.length === 8)) 
        return;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(data => {
            if(!data.erro) {
            document.getElementById('logradouro').value = data.logradouro;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('cidade').value = data.localidade;
            document.getElementById('estado').value = data.uf;
            document.getElementById('numero').focus();
            }
            else {
                console.log('CEP não encontrado');
            } 
        })
        .catch(e => console.log('Deu erro: ' + e, message));
});

document.addEventListener('DOMContentLoaded', function() {

    const form = document.querySelector('form');
    const cepInput = document.getElementById('cep');
    const logradouroInput = document.getElementById('logradouro');
    const bairroInput = document.getElementById('bairro');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');
    const numeroInput = document.getElementById('numero');
    
    const STORAGE_KEY = 'cadastroUsuarioData';

    function salvarDados() {
       
        const dados = {
            cep: cepInput.value,
            logradouro: logradouroInput.value,
            bairro: bairroInput.value,
            cidade: cidadeInput.value,
            estado: estadoInput.value,
            numero: numeroInput.value,
        };
        

        localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
        console.log('Dados salvos no Local Storage.');
    }


    function carregarDados() {

        const dadosSalvos = localStorage.getItem(STORAGE_KEY);
        
        if (dadosSalvos) {

            const dados = JSON.parse(dadosSalvos);
            cepInput.value = dados.cep || '';
            logradouroInput.value = dados.logradouro || '';
            bairroInput.value = dados.bairro || '';
            cidadeInput.value = dados.cidade || '';
            estadoInput.value = dados.estado || '';
            numeroInput.value = dados.numero || '';
            
            console.log('Dados restaurados do Local Storage.');
        }
    }
    carregarDados();

    form.addEventListener('input', salvarDados); 

});
