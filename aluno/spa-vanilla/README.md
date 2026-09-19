# Single Page Application em JavaScript puro

Nessa atividade iremos desenvolver uma simplificação de um Single Page Application (`SPA`), ou seja, uma aplicação com um único documento HTML, utilizando JavaScript puro, o que se convenciounou a ser chamado de vanilla JS em inglês (por cultura linguística dos EUA, de se referenciar à baunilha como o sabor "padrão" de algo).

Para isso iremos seguir os passos à seguir:

## 1. Criação da base

Iremos criar o `index.html` com um menu de navegação entre páginas distintas (inicio, sobre e contato, por exemplo.).
Neste `index.html` iremos requisitar o JavaScript inicial da aplicação, o `app.js`. Podemos também criar um `style.css`, se quisermos estilizar a página.

- Nos links para as páginas distintas, iremos utilizar links de âncora (`#inicio`, `#sobre`, etc.)

## 2. Roteamento

Os frameworks JavaScript (e outros) trabalham com roteamento, para determinar como irão carregar novas páginas. Iremos utilizar métodos do JavaScript em navegadores para observar por mudanças na URL para escolher se e qual conteúdo queremos renderizar na página.

- Podemos criar uma função que será responsável pela exibição de cada página da nossa aplicação.
- Podemos mapear em um objeto qual endereço de URL está associado com qual função

### 2.1 Funções de exibição de página

Cada uma das funções serão responsáveis pela exibição de cada uma das páginas de nossa aplicação:

```js

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
```

### 2.2 Mapeamento de rotas

Para mapear, qual endereço utiliza qual função para renderização, podemos utilizar um objeto que tenha propriedades que representem os caminhos ou nomes das páginas, e armazenem em seus valores cada uma das funções, já que JavaScript nos permite lidar dessa forma com funções:

```js
const rotas = {
    '#': exibirInicio,
    '#sobre': exibirSobre,
    '#contato': exibirContato
};
```

## 3. Gerenciando navegação

Agora iremos gerenciar a navegação da nossa aplicação, para isso iremos utilizar o objeto `window.location` do navegador e suas propriedades. Acessando a propriedade `window.location.hash`, teremos acesso ao fragmento, ou falando de forma mais simples, acesso ao que está preenchido após o `#` no endereço do site. Vamos criar a função para gerenciar as rotas:

```js
function gerenciarRota() {
	// 1. Definimos como rota padrão, caso nenhuma definida
    let hash = window.location.hash || '#';
	
	// 2. Verificamos se existe rota mapeada para a hash, se sim, invocamos a função armazenada, senão retornamos página não encontrada
    let conteudp = rotas[hash] ? rotas[hash]() : '<h1>Página não encontrada</h1>';

	// 3. Atualizamos o DOM para inserir o conteudo retornado (ou não) pela nossa função
	document.getElementById('app').innerHTML = conteudo;
}
```

### 3.1 Escutando evento de troca de hash

Nossa função está definida, mas ainda não está fazendo nada. Precisamos adicionar um ouvinte (*listener*) de evento para que, quando a hash for alterada, nossa função seja invocada. A API de eventos dos navegadores oferecem ao JavaScript o evento `hashchange`, para isso.

```js
// Ouvinte para o evento hashchange
window.addEventListener('hashchange', gerenciarRota);
```

Podemos também ouvir o evento quando a página acaba de ser carregada, já que estamos deixando a cargo total do JavaScript a exibição de conteúdo e nossa página inicial a princípio não terá nada:

```js
window.addEventListener('load', gerenciarRota);
```

Pronto, você tem o mínimo de um SPA funcionando, mas ainda há muito mais que pode ser explorado. É possível fazer muitas outras coisas ainda em cima desse estudo, gerenciamento de estados, compartimentar o nosso código e pensar de fato na arquitetura da nossa aplicação, interagir com uma API e consumir conteúdo do back-end para renderização das páginas, e muito mais.

# 4. Melhorias

# 4.1 Consumindo dados via API Rest

Consuma dados da API https://jsonplaceholder.typicode.com/ para criar novas páginas. Crie as páginas:

- Usuários
- Posts
- Photos

Consumindo os respectivos `endpoints` especificados na API e manipulando o DOM para inserção dos novos elementos na página a partir do JSON retornado na requisição.

Exemplos de uso: https://jsonplaceholder.typicode.com/guide/

Utilize `fetch`, `then` ou `async`/`await`.

# 4.2 Modularização

Separe o código em diferentes scripts para melhor modularizá-lo, separando em diferentes responsabilidade (roteamento, páginas, etc).
Utilize os módulos nativos do navegador ou inclua um sistema de empacotamento (*bundle*), como o (esbuild)[https://esbuild.github.io/].
