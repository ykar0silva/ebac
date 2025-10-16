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
