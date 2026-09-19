function exibirInicio() {
    return `
		<h1>Bem-vindo</h1>
		<p>Esta é a página inicial do nosso SPA</p>
	`;
}

function exibirSobre() {
    return `
		<h1>Sobre</h1>
		<p>Esta é nossa aula de Programação Dinâmica para Web e estamos aprendendo sobre SPAs</p>
	`;
}

function exibirContato() {
    return `
		<h1>Contato</h1>
		<p>Entre em contato conosco: (11) 0000-0000</p>
	`;
}

async function exibirUsuarios() {

    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const result = await response.json()
    
    let html = '<h1>Lista de Usuários</h1>'

    result.forEach(element => {
        html += `
		<p>${element.name}</p>
	    `
    });

    return html
}

const rotas = {
    '#': exibirInicio,
    '#sobre': exibirSobre,
    '#contato': exibirContato,
    '#usuario': exibirUsuarios
};

async function gerenciarRota() {
	// 1. Definimos como rota padrão, caso nenhuma definida
    let hash = window.location.hash || '#';
	
	// 2. Verificamos se existe rota mapeada para a hash, se sim, invocamos a função armazenada, senão retornamos página não encontrada
    let conteudo = rotas[hash] ? await rotas[hash]() : '<h1>Página não encontrada</h1>';

	// 3. Atualizamos o DOM para inserir o conteudo retornado (ou não) pela nossa função
	document.getElementById('app').innerHTML = conteudo;
}

// Ouvinte para o evento hashchange
window.addEventListener('hashchange', gerenciarRota);

window.addEventListener('load', gerenciarRota);