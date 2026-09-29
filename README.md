# Site +LUDUS

Site da plataforma de jogos educacionais acessíveis para crianças autistas.

## 📋 Requisitos

- Node.js 14+
- npm ou yarn

## 🚀 Instalação e Uso

1. **Instale as dependências:**
```bash
npm install
```

2. **Inicie o servidor:**
```bash
npm start
```

Para desenvolvimento com auto-reload:
```bash
npm run dev
```

3. **Acesse o site:**
Abra o navegador e acesse `http://localhost:3000`

## 📁 Estrutura do Projeto

```
├── index.js              # Arquivo principal do servidor
├── package.json          # Dependências do projeto
├── public/               # Arquivos estáticos
│   ├── logo-ludus.png   # Logo do projeto
│   └── styles/          # Arquivos CSS
│       └── style.css    # Estilos principais
├── views/               # Templates EJS
│   └── index.ejs       # Página inicial
├── api/                # Rotas de API (futuro)
├── config/             # Configurações (futuro)
└── models/             # Modelos de dados (futuro)
```

## 🎨 Cores Principais

- **Rosa/Magenta:** #E91E8C
- **Azul:** #00A3E0
- **Roxo:** #7B3FF2
- **Fundo Claro:** #E8F4F8

## Prévia do perfil na navbar

O botão **Meu perfil** abre um painel na própria página. Para experimentar, informe
um nome ou apelido e escolha **Entrar na demonstração**. O acesso aos jogos continua
livre, inclusive após sair do perfil.

O painel mostra imagens de seis patentes, XP total de exemplo, nível geral,
progresso para a próxima patente e último jogo. O último jogo aberto é atualizado
localmente quando o player carrega ou quando se usa **Abrir em Nova Guia**.
O nome e o último jogo ficam somente no `localStorage` do navegador, na chave
`ludus.profile.demo.v1`. Não há autenticação real, envio de credenciais, gravação
de XP ou integração deste perfil com o banco de dados.

Os dados demonstrativos e os limites de XP estão em
`public/scripts/user-profile.js`; a interface, em `views/user-profile.ejs`; e os
emblemas SVG, em `public/images/ranks/`. A prévia soma 2.450 XP, correspondentes ao
nível 5 e à patente Prata. As patentes usam o XP acumulado de todos os jogos.

## 🔧 Próximas Funcionalidades

- [ ] Páginas de jogos
- [ ] Sistema de autenticação
- [ ] Banco de dados para usuários
- [ ] Dashboard do usuário
- [ ] Gerenciamento de pontuações

## 📝 Licença

MIT
