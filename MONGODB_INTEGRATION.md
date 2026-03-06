# Integracao MongoDB - Site +LUDUS

## Status

Concluido e funcionando.

## O que foi implementado

### Conexao com MongoDB

- Pacote `mongoose` adicionado no projeto.
- Conexao configurada em `config/conexao.js`.
- URI configurada para usar o banco `ludus`.

### Modelos

- `models/jogos.js` ajustado para o mesmo formato usado no admin.
- `models/categoria.js` criado para permitir `populate('categorias')`.

Campos principais usados em `jogos`:

- `nome`
- `descricao`
- `identificacao_unity`
- `link_jogar`
- `video_demo_url`
- `github_url`
- `icone_url`
- `categorias`
- `total_niveis`
- `xp_maxima`

### Rotas atualizadas

- `GET /jogos`: busca jogos no banco `ludus` e popula categorias.
- `GET /jogo/:id`: mostra detalhes do jogo e lista relacionados.

### Views atualizadas

- `views/jogos.ejs`: renderiza nome, descricao, categorias e icone por URL.
- `views/jogo-detalhes.ejs`: renderiza dados completos e links externos.

## Validacao

- Servidor inicia sem erro.
- Conexao com MongoDB esta ok.
- Jogos cadastrados no administrativo aparecem em `/jogos`.
- Pagina de detalhes em `/jogo/:id` funciona.

## Como usar

1. Iniciar o servidor:

```bash
npm start
```

1. Abrir:

- `http://localhost:3000/jogos`
- `http://localhost:3000/jogo/<id>`

1. Cadastrar novos jogos pelo sistema administrativo (`-Ludus`).

## Arquivos alterados

- `config/conexao.js`
- `models/jogos.js`
- `models/categoria.js`
- `index.js`
- `views/jogos.ejs`
- `views/jogo-detalhes.ejs`

## Banco de dados

- Host: MongoDB Atlas
- Cluster: `cluster0`
- Database: `ludus`
- Colecao principal: `jogos`

---

Atualizado em 2026-03-06.
