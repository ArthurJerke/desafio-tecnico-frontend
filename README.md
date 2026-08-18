# Desafio Técnico Frontend

Esta é uma aplicação frontend desenvolvida com **React** e **TypeScript**, para demonstração de integração de APIs, gerenciamento de estados e operações CRUD. Ela interage com a API backend desenvolvida, hospedada na porta 3000 (`http://localhost:3000/noticias`) e a 
api (`https://viacep.com.br`).

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:
- [Node.js](https://nodejs.org/en/) (Versão 18 ou superior)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (opcional, apenas se desejar rodar a aplicação via contêiner)

---

## Executando o Projeto Localmente

### 1. Instalação das Dependências
Na raiz do projeto, abra o seu terminal e execute:
```bash
npm install
```

### 2. Rodar o Servidor de Desenvolvimento
Ainda no terminal, execute o comando abaixo para iniciar o Vite:
```bash
npm run dev
```
A aplicação ficará disponível em [http://localhost:5173](http://localhost:5173).

### 3. Build de Produção
Para gerar a versão otimizada (minificada) para produção:
```bash
npm run build
```
Os arquivos estáticos finais serão gerados dentro da pasta `dist/`.

### 4. Linter
Para executar a análise estática do código (ESLint) e garantir que as regras de formatação estão sendo seguidas:
```bash
npm run lint
```

---

## Executando o Projeto com Docker (Produção)

A aplicação conta com um Dockerfile, que realiza a construção do Vite na primeira etapa, e hospeda os arquivos finais em um servidor Nginx.

### 1. Construir a Imagem Docker
Na raiz do projeto, execute:
```bash
docker build -t frontend-vaga .
```

### 2. Rodar o Contêiner
Uma vez construída a imagem, você pode subir a aplicação apontando para a porta de sua preferência (ex: 5173):
```bash
docker run -d --rm -p 5173:80 --name frontend-app frontend-vaga
```

A aplicação ficará disponível em [http://localhost:5173](http://localhost:5173).

### 3. Parar a Aplicação
Para derrubar o contêiner:
```bash
docker stop frontend-app
```

---

## Configuração da API
Atualmente a base de URLs para realizar as requisições (como listar, criar e excluir notícias) está configurada em `src/services/noticiaService.ts` apontando para o servidor:
`http://localhost:3000/noticias`

**Importante:** Certifique-se de que a API/Backend esteja rodando localmente nesta porta antes de testar a listagem, caso contrário as listagens de notícias irão falhar por falta de conexão.
