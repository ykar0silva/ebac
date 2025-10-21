const botaoTema = document.getElementById('botaoTema');

botaoTema.addEventListener('click', () => {
    const temaAtual = localStorage.getItem('tema');

    const novoTema = temaAtual === 'dark' ? 'light' : 'dark';

    document.body.classList.toggle(novoTema);

    localStorage.setItem('tema', novoTema);

    botaoTema.textContent = novoTema === 'dark' ? 'Modo Claro' : 'Modo Escuro'; 
});

document.addEventListener('DOMContentLoaded', () => {
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'dark') {
        document.body.classList.add('dark');

    } else {
        document.body.classList.add('light');
    }

});