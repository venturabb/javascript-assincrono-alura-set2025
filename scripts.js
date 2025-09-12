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
