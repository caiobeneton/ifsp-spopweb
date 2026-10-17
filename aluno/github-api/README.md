# Consumo de API com programação assíncrona (Promises/async function)

Nessa atividade iremos consumir a API pública do GitHub para praticar o uso de Promises e funções assíncrona em JavaScript.

## Links Úteis
- https://docs.github.com/en/rest
- https://docs.github.com/en/rest/users/users?apiVersion=2026-03-10#get-a-user

# Passo a passo

## 1. EventListener

Adicione o EventListener adequado ao elemento input onde o usuário deve inserir o nome de usuário do GitHub a ser consultado. Como callback, uma função que irá fazer a requisição à API com fetch deve ser chamada.

## 2. Prealoader (Pending)

Utilize fetch para realizar uma requisição à API, utilizando o usuário digitado para consulta.
Enquanto fetch, que é uma função assíncrona, não se resolve, adicione um preloader, um indicador de que a execução está ocorrendo para sinalizar ao usuário na interface.

- Existem diversos repositórios, projetos, de preloaders prontos (em gif, svg, animação CSS) que pode utilizar, alguns:
	- https://loading.io/
	- https://lottiefiles.com/pt/free-animations/preloader

## 3. Exibir usuário (Fulfilled)

Quando a requisição for concluída, exiba um cartão com dados do usuário (nome, avatar, número de repositórios, etc), usando a DOM API para criação de um novo elemento a ser inserido na `<main>`.

## 4. Exibir erro (Rejected)

Quando a requisição for resolvida como falha, registre no console uma mensagem de erro, e exiba uma mensagem amigável ao usuário, após o `<input>`, comunicando que não foi possível concluir a busca por usuário.

- **Obs:** lembre-se de remover o preloader, tanto em caso de sucesso, quanto em caso de erro.

# Dicas

## Fetch e responses

Por padrão, o método `fetch` do JavaScript não rejeita a `Promise` em caso de erros HTTP como 404 (`Not Found`) ou 500 (`Internal Server Error`). Ele apenas rejeita se houver uma falha de rede (ex: sem internet). Se digitar um usuário inexistente, o fetch cairá no bloco de sucesso, mas com a propriedade `response.ok === false`.

Vale a pena checar o response.ok:

```js
if ( !resposta.ok ) {
  throw new Error("Usuário não encontrado.");
}
```

## Evento input e debounce

Para uma busca mais fluida, podemos alterar nosso EventListener de change para input, para que a busca seja realizada tão logo o usuário tenha digitado o valor no campo. Entretanto, precisamos tomar certos cuidados para impedir que o callback seja executado diversas vezes.

Nesse caso, podemos usar a técnica de debounce. O debounce adia a execução de uma função até que o usuário termine de fazer a ação (ou seja, ele espera passar um tempo específico de inatividade antes de executar).

No contexto da nossa busca do GitHub, se o usuário digitar "marcos", em vez de fazer uma requisição para cada letra digitada (m, ma, mar, marc, marco, marcos), o debounce espera o usuário parar de digitar por X milissegundos (ex: 500ms) e faz apenas uma requisição com o valor final ("marcos").

Podemos utilizar `setTimeout()` e closures para alcançar esse resultado.

```js
function callbackComAdiamento(funcaoParaExecutar, tempoEspera) {
  let temporizador; // Variável que armazena a referência do setTimeout

  return function () {
    // 1. Se o usuário digitar algo novo antes do tempo acabar, cancelamos o temporizador anterior
    clearTimeout(temporizador);

    // 2. Criamos um novo temporizador que vai rodar a função somente após o tempo de espera acabar.
    temporizador = setTimeout(() => {
      funcaoParaExecutar.apply();
    }, tempoEspera);
  };
}

let input = document.querySelector(".meu-input");
meuInput.addEventListener("input", callbackComAdiamento(pegaUsuarioGitHub, 5000));
```