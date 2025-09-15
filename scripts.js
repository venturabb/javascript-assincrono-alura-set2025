const botaoUpload = document.getElementById("botao-upload");
const imagemParaUpload = document.getElementById("imagem-para-upload");

const containerImagem = document.querySelector(".container-imagem");

botaoUpload.addEventListener("click", () => {
  imagemParaUpload.click();
});

containerImagem.addEventListener("click", () => {
  imagemParaUpload.click();
});

imagemParaUpload.addEventListener("change", (evento) => {
  var file = evento.target.files[0];
  if (!file.type.match("image/png") && !file.type.match("image/jpeg")) {
    alert("Por favor, selecione uma imagem JPEG ou PNG.");
    evento.target.value = "";
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    alert("A imagem deve ter no máximo 2 MB.");
    evento.target.value = "";
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
const listaDeTags = document.querySelector(".lista-tags");

listaDeTags.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("remover-tag")) {
    const tagASerRemovida = evento.target.parentElement;
    console.log(tagASerRemovida);
    listaDeTags.removeChild(tagASerRemovida);
  }
});

const tagsDisponiveis = ["Front-end", "Back-end", "Cloud", "IA", "Analytics", "Segurança", "teste"];

async function verificaTagsDisponiveis(tag) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tagsDisponiveis.includes(tag));
    }, 500);
  });
}

tagASerCriada.addEventListener("keypress", async (evento) => {
  if (evento.code === "Enter" || evento.code === "NumpadEnter") {
    evento.preventDefault();
    const textoDaTag = tagASerCriada.value.trim();
    if (textoDaTag) {
      try {
        const tagExiste = await verificaTagsDisponiveis(textoDaTag);
        console.log(tagExiste);
        if (tagExiste) {
          const novaTag = document.createElement("li");
          novaTag.innerHTML = `<p>${tagASerCriada.value}</p> <img src="./img/close-black.svg" class="remover-tag">`;
          listaDeTags.appendChild(novaTag);
          tagASerCriada.value = "";
        } else {
          alert("Tag não encontrada.");
        }
      } catch (error) {
        console.error("Erro ao verificar a existência da tag.");
      }
    }
  }
});
