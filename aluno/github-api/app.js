const campoUsuario = document.querySelector("#username");
const mensagemErro = document.querySelector("#erro");
const conteudoPrincipal = document.querySelector("main");

let numeroDaBusca = 0;

campoUsuario.addEventListener("change", buscarUsuario);

async function buscarUsuario() {

	const nomeUsuario = campoUsuario.value.trim();
	const buscaAtual = ++numeroDaBusca;

	conteudoPrincipal.replaceChildren();
	mensagemErro.textContent = "";
	mensagemErro.hidden = true;

	if (nomeUsuario === "") {
		return;
	}

	try {
		// fetch() faz a requisição. await espera a resposta sem travar a página.
		// encodeURIComponent() permite colocar o texto digitado na URL com segurança.
		const resposta = await fetch("https://api.github.com/users/" + encodeURIComponent(nomeUsuario));

		// fetch() não considera um status HTTP como 404 um erro automaticamente.
		// Por isso, verificamos ok e lançamos um erro para entrar no catch.
		if (!resposta.ok) {
			throw new Error("A API do GitHub respondeu com o status " + resposta.status);
		}

		// O corpo da resposta vem em JSON. json() o transforma em um objeto JS.
		const usuario = await resposta.json();

		if (buscaAtual !== numeroDaBusca) {
			return;
		}

		// PASSO 3: a requisição deu certo, então mostramos os dados recebidos.
		exibirUsuario(usuario);
	} catch (erro) {
		// PASSO 4: catch recebe tanto os erros de rede quanto o erro lançado acima.
		console.error("Não foi possível buscar o usuário do GitHub:", erro);

		if (buscaAtual !== numeroDaBusca) {
			return;
		}

		mensagemErro.textContent = "Não foi possível concluir a busca. Confira o nome do usuário e sua conexão e tente novamente.";
		mensagemErro.hidden = false;
	}
}

function exibirUsuario(usuario) {
	// createElement() cria elementos que ainda não estão visíveis na página.
	const cartao = document.createElement("article");
	const avatar = document.createElement("img");
	const informacoes = document.createElement("div");
	const nome = document.createElement("h2");
	const login = document.createElement("p");
	const repositorios = document.createElement("p");
	const seguidores = document.createElement("p");
	const perfil = document.createElement("a");

	// Preenchemos os elementos com as propriedades do objeto retornado pela API.
	avatar.src = usuario.avatar_url;
	avatar.alt = "Avatar de " + usuario.login;

	// Alguns usuários não cadastram um nome. Nesse caso, mostramos o login.
	nome.textContent = usuario.name || usuario.login;
	login.textContent = "@" + usuario.login;
	repositorios.textContent = "Repositórios públicos: " + usuario.public_repos;
	seguidores.textContent = "Seguidores: " + usuario.followers;
	perfil.textContent = "Ver perfil no GitHub";
	perfil.href = usuario.html_url;

	// textContent trata os valores como texto, sem interpretá-los como HTML.
	// append() coloca os elementos dentro de seus respectivos elementos pais.
	informacoes.append(nome, login, repositorios, seguidores, perfil);
	cartao.append(avatar, informacoes);
	conteudoPrincipal.append(cartao);
}
