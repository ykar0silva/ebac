# Eventos no JavaScript: Tornando a Web Interativa

Eventos são a maneira como o JavaScript detecta e reage a ações que acontecem em uma página web. Eles são o coração da interatividade, permitindo que a página mude em resposta ao usuário (cliques, digitação) ou ao próprio navegador (carregamento, erros).

---

## 1. Como os Eventos Funcionam (Dispatcher e Listener)

Um evento é basicamente uma comunicação que ocorre entre dois lados, como mostrado no diagrama:

1.  **Dispatcher (Quem Dispara o Evento):** É a fonte da ação. Na web, geralmente é o usuário (clicando, movendo o mouse) ou o navegador (carregando um recurso).
2.  **Evento:** A mensagem enviada (ex: "clique aconteceu").
3.  **Listener (Quem Está Ouvindo):** É o código JavaScript que foi "registrado" para esperar por um tipo específico de evento. Quando o evento chega, o código dentro do Listener é executado.

<img width="1159" height="649" alt="image" src="https://github.com/user-attachments/assets/ed7d62ce-1e98-4c6c-8bbe-f1b8b89db9f3" />

---

## 2. Adicionando Ouvintes de Eventos (Event Listeners)

O método principal para fazer o JavaScript "ouvir" uma ação é o `addEventListener()`.

**Sintaxe Básica:**

```javascript
elemento.addEventListener("tipoDoEvento", funçãoAExecutar);
```
## Exemplo Prático
```Javascript
// 1. Seleciona o elemento
const btn = document.getElementById("btn"); 
//2. Adiciona o ouvinte para o evento "click"
btn.addEventListener("click", () => { 
    alert("Eu ouvi que você clicou."); // 
});
```
*Em comparação, o código ```onclick="minhaFuncao()"``` no HTML é uma forma mais antiga e menos flexível de lidar com eventos.* 

<img width="1159" height="649" alt="image" src="https://github.com/user-attachments/assets/41ab3ef7-e2ed-4df8-9cb2-70c07e89af10" />

## 3. Manipulando Eventos: O Objeto event
Quando um evento é disparado, o JavaScript cria automaticamente um objeto chamado event (ou qualquer nome que você dê ao parâmetro da função). 
Este objeto carrega informações importantes sobre o que acabou de acontecer.

### Propriedades Comuns do Objeto ```event```:

```event.target:``` O elemento HTML exato onde o evento foi disparado (útil para saber qual item de uma lista foi clicado, por exemplo).

```event.type:``` O tipo de evento que ocorreu (exemplo: ```"click"```, ```"submit"```, ```"keydown"```).

### Exemplo
```Javascript
btn.addEventListener("click", function(event) {
    console.log('Elemento clicado:', event.target); // Mostra o elemento <button>
    console.log('Tipo de evento:', event.type);     // Mostra "click"
});
```
<img width="1159" height="649" alt="image" src="https://github.com/user-attachments/assets/12c82d6e-46ac-4c39-b9b0-476f221b389a" />

### 4. Prevenindo Ações Padrões
Muitos elementos HTML vêm com um comportamento padrão do navegador. O exemplo mais comum é o formulário. Quando você clica em um botão submit (enviar), o navegador tenta, por padrão, recarregar a página para enviar os dados.

Para executar o JavaScript e impedir esse comportamento nativo, usamos o método ```event.preventDefault()```.
### Exemplo:
```Javascript
const meuFormulario = document.getElementById("meuFormulario");

meuFormulario.addEventListener("submit", function(event) {
    // ESSENCIAL: Impede o comportamento padrão de recarregar a página
    event.preventDefault(); 
    
    console.log("Formulário não enviado! (Ação padrão bloqueada)");
    // Aqui você adicionaria sua lógica de validação ou envio via AJAX/Fetch
});
```
<img width="1159" height="649" alt="image" src="https://github.com/user-attachments/assets/f4a2c1d5-44f1-46bd-9ad6-c42e47176613" />

### 5. Eventos Customizados (Personalizados)
Em projetos maiores, é útil criar seus próprios eventos para que partes diferentes do seu código possam se comunicar sem estarem diretamente ligadas.
### Passos para Criar um Evento Customizado
<img width="1024" height="576" alt="image" src="https://github.com/user-attachments/assets/37a67d3f-a36f-41a0-b5a0-ffb1c8406eee" />

1. #### Criar o Evento:
Crie uma nova instância do objeto ```Event```.
```Javascript
const eventoFormularioEnviado = new Event("formularioEnviado");
```
2. #### Adicionar um Listener:
Crie um ouvinte para o seu novo tipo de evento.
```Javascript
meuFormulario.addEventListener("formularioEnviado", function () {
    console.log("Formulário foi enviado com sucesso!");
});
```
3. #### Disparar o Evento (```dispatchEvent```):
No seu código principal, após a lógica de processamento, você dispara o evento.
```Javascript
// Simula o processamento
console.log("Processando envio..."); 

// Dispara o evento customizado
meuFormulario.dispatchEvent(eventoFormularioEnviado);
```
Isso significa que, sempre que o código principal dispara (```dispatchEvent```), o Listener customizado reage, separando a lógica de "processamento" da lógica de "notificação".

## As 3 Fases da Propagação de Eventos
Imagine que a página é uma cebola com várias camadas (os elementos HTML). Quando você clica no centro (o botão), o evento precisa atravessar todas as camadas, de fora para dentro e de dentro para fora.
<img width="1156" height="651" alt="image" src="https://github.com/user-attachments/assets/79113284-3849-4665-b027-d01ff8c5599b" />

### 1. Capturing Phase (Fase de Captura)
Direção: De cima para baixo (da Raiz ao Alvo).

O que acontece: O navegador começa no topo do DOM (no objeto ```Document``` e ```html```) e desce, procurando o elemento onde o evento realmente aconteceu.

No diagrama: Você vê as setas de "click" descendo do ```Document``` até o ```button```.

### 2. Target Phase (Fase de Alvo)
O que acontece: O evento finalmente atinge o elemento que foi clicado.

No diagrama: É o momento em que o cursor clica no ```button```. Se houver um ```event listener``` diretamente anexado a esse botão, ele é executado agora.

### 3. Bubbling Phase (Fase de Borbulhamento)
Direção: De baixo para cima (do Alvo à Raiz).

O que acontece: Depois de atingir o alvo, o evento começa a "subir" de volta pela hierarquia do DOM, como uma bolha de ar na água.

Importância: Se você tiver um ```event listener``` no elemento pai (```form```), no avô (```body```) ou em qualquer ancestral, ele também será acionado. Isso é crucial para a técnica de Delegação de Eventos.

No diagrama: Você vê as setas de "```click```" subindo do button de volta ao ```Document```.

## Por Que Isso É Importante?
O entendimento dessas fases permite que os desenvolvedores otimizem o código:

### Delegação de Eventos: 
Em vez de adicionar um listener a cada um dos 100 itens de uma lista, você pode adicionar apenas um listener ao elemento pai (```ul```). Graças ao Bubbling, o clique em qualquer item da lista subirá e será capturado pelo elemento pai, economizando memória e tornando o código mais limpo.

### Parar a Propagação:
Você pode usar ```event.stopPropagation()``` para impedir que o evento continue nas fases de Bubbling ou Capturing, caso queira que apenas o elemento alvo seja afetado.
