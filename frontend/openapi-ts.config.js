/** @type {import('@hey-api/openapi-ts').UserConfig} */
module.exports = {
    input: 'http://localhost:8000/api/openapi.json', // Caminho para o arquivo gerado no passo 1
    output: {
      path: 'src/client', // Diretório onde os arquivos gerados serão salvos
      format: 'prettier', // Opcional: formata o código gerado com Prettier
    },
    plugins: ['@hey-api/client-fetch'], // Plugin para gerar cliente utilizando Fetch API
  };
  