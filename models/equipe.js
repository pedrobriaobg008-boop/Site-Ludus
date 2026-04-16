const secoes = [
    {
        id: 'professores-pesquisadores',
        titulo: 'Professores e Pesquisadores',
        tema: 'azul',
        icone: '/icone olho rosa.png',
        // Dica: coloque as imagens em public/equipe/<grupo>/ e ajuste o caminho abaixo.
        integrantes: [
            {
                id: 1,
                nome: 'Marcelo Siedler',
                cargo: 'Docente do Curso de Computação',
                instituicao: 'IFSul',
                foto: '/equipe/professores-pesquisadores/marcelo-siedler.jpg',
                bio: 'Coordenador do projeto +LUDUS'
            },
            {
                id: 2,
                nome: 'Rafael Cardoso',
                cargo: 'Docente da Área de Computação',
                instituicao: 'IFSul',
                foto: '/equipe/professores-pesquisadores/rafael-cardoso.jpg',
                bio: 'Pesquisador em Tecnologias Educacionais'
            },
            {
                id: 3,
                nome: 'Michelle Schmidt',
                cargo: 'Pesquisadora em Educação Inclusiva',
                instituicao: 'IFSul',
                foto: '/equipe/professores-pesquisadores/michelle-schmidt.jpg',
                bio: 'Especialista em Design Acessível para UTI'
            }
        ]
    },
    {
        id: 'alunos-bolsistas',
        titulo: 'Alunos e Bolsistas',
        tema: 'rosa',
        icone: '/icone formatura roxo.png',
        integrantes: [
            {
                id: 4,
                nome: 'Pedro Almeida',
                cargo: 'Bolsista de Desenvolvimento',
                instituicao: 'IFSul',
                foto: '/equipe/alunos-bolsistas/pedro-almeida.jpg',
                bio: 'Desenvolvedor de Jogos Educacionais'
            },
            {
                id: 5,
                nome: 'Julia Martins',
                cargo: 'Bolsista de Design',
                instituicao: 'IFSul',
                foto: '/equipe/alunos-bolsistas/julia-martins.jpg',
                bio: 'Designer UX/UI do Projeto'
            },
            {
                id: 6,
                nome: 'Lucas Siqueira',
                cargo: 'Pesquisador - Bolsa CNPq',
                instituicao: 'IFSul',
                foto: '/equipe/alunos-bolsistas/lucas-siqueira.jpg',
                bio: 'Análise de Acessibilidade'
            },
            {
                id: 7,
                nome: 'Mariana Lima',
                cargo: 'Estagiária de Educação',
                instituicao: 'Universidade Federal',
                foto: '/equipe/alunos-bolsistas/mariana-lima.jpg',
                bio: 'Metodologia Educacional'
            }
        ]
    },
    {
        id: 'colaboradores-externos',
        titulo: 'Colaboradores Externos',
        tema: 'azul',
        icone: '/ícone livro azul.png',
        integrantes: [
            {
                id: 8,
                nome: 'Marcelo Siedler',
                cargo: 'Especialista em Acessibilidade',
                instituicao: 'Consultoria para Inclusão Digital',
                foto: '/equipe/colaboradores-externos/marcelo-siedler.jpg',
                bio: 'Consultor WCAG 2.1 e GAIA'
            },
            {
                id: 9,
                nome: 'Rafael Cardoso',
                cargo: 'Consultor de Tecnologia',
                instituicao: 'Inovação & Tecnologia',
                foto: '/equipe/colaboradores-externos/rafael-cardoso.jpg',
                bio: 'Especialista em Arquitetura de Software'
            },
            {
                id: 10,
                nome: 'Michelle Schmidt',
                cargo: 'Consultora Psicopedagógica',
                instituicao: 'Instituto de Educação Inclusiva',
                foto: '/equipe/colaboradores-externos/michelle-schmidt.jpg',
                bio: 'Metodologia para Educação Especial'
            }
        ]
    }
];

const equipe = {
    descricao: 'Uma equipe multidisciplinar dedicada a criar soluções inclusivas e inovadoras em educação digital',

    // Edite membros e títulos diretamente neste array para atualizar toda a seção de equipe.
    secoes,

    // Mantidos por compatibilidade com estruturas antigas do projeto.
    professoresePesquisadores: secoes[0].integrantes,
    alunoseBolsistas: secoes[1].integrantes,
    colaboradoresExternos: secoes[2].integrantes
};

module.exports = equipe;
