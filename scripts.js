const botaoUpload = document.getElementById("botao-upload");
const imagemParaUpload = document.getElementById("imagem-para-upload");

botaoUpload.addEventListener("click", () => {
  imagemParaUpload.click();
});

imagemParaUpload.addEventListener("change", (evento) => {
  var file = evento.target.files[0];
  if (!file.type.match("image/png") && !file.type.match("image/jpeg")) {
    alert("Por favor, selecione uma imagem JPEG ou PNG.");
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    alert("A imagem deve ter no máximo 2 MB.");
    return;
  }
});

function lerConteudoDoArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => {
      resolve({ url: leitor.result, nome: arquivo.name });
    };
    leitor.onerror = () => {
      reject(`Erro na leitura do arquivo.`);
    };

    leitor.readAsDataURL(arquivo);
  });
}

const imagemPrincipal = document.querySelector(".imagem-principal");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

imagemParaUpload.addEventListener("change", async (evento) => {
  const arquivo = evento.target.files[0];
  if (arquivo) {
    try {
      const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
      imagemPrincipal.src = conteudoDoArquivo.url;
      nomeDaImagem.textContent = conteudoDoArquivo.nome;
    } catch (erro) {
      console.error("Erro na leitura do arquivo");
    }
  }
});

const tagASerCriada = document.getElementById("tags");

console.log(tagASerCriada);
tagASerCriada.addEventListener("keypress", (evento) => {
  if (evento.code === "Enter" || evento.code === "NumpadEnter") {
    evento.preventDefault();
    const textoDaTag = tagASerCriada.value.trim();
    if (textoDaTag) {
      const novaTag = document.createElement("li");
      novaTag.innerHTML = `<p>${tagASerCriada.value}</p> <img src="./img/close-black.svg" class="remover-tag">`;
      const listaDeTags = document.querySelector(".lista-tags");
      listaDeTags.appendChild(novaTag);
      tagASerCriada.value = "";
    }
  }
});
