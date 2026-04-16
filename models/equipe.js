const secoes = [
    {
        id: 'professores-pesquisadores',
        titulo: 'Professores e Pesquisadores',
        tema: 'azul',
        icone: '/icone formatura roxo.png',
        // Dica: coloque as imagens em public/equipe/<grupo>/ e ajuste o caminho abaixo.
        integrantes: [
            {
                id: 1,
                nome: 'Marcelo Siedler',
                cargo: 'Professor da Área de Informática',
                instituicao: 'Instituto Federal de Educação, Ciência e Tecnologia Sul-rio-grandense (IFSul) - Câmpus Bagé',
                foto: '/equipe/professores-pesquisadores/marcelo-siedler.jpg.png?v=2',
                bio: 'Coordenador do projeto +LUDUS'
            },
            {
                id: 2,
                nome: 'Rafael Cardoso',
                cargo: 'Professor da Área de Informática',
                instituicao: 'Instituto Federal de Educação, Ciência e Tecnologia Sul-rio-grandense (IFSul) - Câmpus Pelotas',
                foto: '/equipe/professores-pesquisadores/rafael-cardoso.jpg.png?v=2',
                bio: 'Coordenador do projeto +LUDUS'
            },
            {
                id: 3,
                nome: 'Michelle Schmidt',
                cargo: 'Professora da Área de Informática',
                instituicao: 'Instituto Federal de Educação, Ciência e Tecnologia Sul-rio-grandense (IFSul) - Câmpus Pelotas',
                foto: '/equipe/professores-pesquisadores/michelle-schmidt.jpg.png?v=2',
                bio: 'Coordenadora do projeto +LUDUS'
            }
        ]
    },
    {
        id: 'alunos-bolsistas',
        titulo: 'Alunos e Bolsistas',
        tema: 'rosa',
        icone: '/icone equipe rosa.png',
        integrantes: [
            {
                id: 4,
                nome: 'Pedro Brião',
                cargo: 'Bolsista e Aluno do Curso Técnico em Informática',
                instituicao: 'Instituto Federal de Educação, Ciência e Tecnologia Sul-rio-grandense (IFSul) - Câmpus Bagé',
                foto: '/equipe/alunos-bolsistas/pedro-briao.jpg',
                bio: 'Desenvolvedor das Plataformas Web'
            },
            {
                id: 5,
                nome: 'Bruna Bichet',
                cargo: 'Bolsista e Aluna do Curso Técnico em Design Gráfico',
                instituicao: 'Instituto Federal de Educação, Ciência e Tecnologia Sul-rio-grandense (IFSul) - Câmpus Pelotas',
                foto: '/equipe/alunos-bolsistas/bruna-bichet.jpg.png',
                bio: 'Designer do Projeto'
            },
            {
                id: 6,
                nome: 'Gabriel da Silva',
                cargo: 'Voluntário e Aluno do Curso Técnico em Análise e Desenvolvimento de Sistemas',
                instituicao: 'Instituto Federal de Educação, Ciência e Tecnologia Sul-rio-grandense (IFSul) - Câmpus Bagé',
                foto: '/equipe/alunos-bolsistas/gabriel-da-silva.jpg.png',
                bio: 'Desenvolvedor de Jogos com Unity'
            },
            {
                id: 7,
                nome: 'João Ferreira',
                cargo: 'Bolsista e Aluno do Curso Técnico em Análise e Desenvolvimento de Sistemas',
                instituicao: 'Instituto Federal de Educação, Ciência e Tecnologia Sul-rio-grandense (IFSul) - Câmpus Bagé',
                foto: '/equipe/alunos-bolsistas/joao-ferreira.jpg.png',
                bio: 'Desenvolvedor de Jogos com Unity'
            },
            {
                id: 8,
                nome: 'Lucas Kosby',
                cargo: 'Bolsista e Aluno do Curso Técnico em Informática',
                instituicao: 'Instituto Federal de Educação, Ciência e Tecnologia Sul-rio-grandense (IFSul) - Câmpus Pelotas',
                foto: '/equipe/alunos-bolsistas/lucas-kosby.jpg.png',
                bio: 'Desenvolvedor de Jogos com Unity'
            },
            {
                id: 9,
                nome: 'Brenda Tuche',
                cargo: 'Bolsista e Aluna do Curso Técnico em Design Gráfico',
                instituicao: 'Instituto Federal de Educação, Ciência e Tecnologia Sul-rio-grandense (IFSul) - Câmpus Pelotas',
                foto: '/equipe/alunos-bolsistas/brenda-tuche.jpg.png',
                bio: 'Analista de Acessibilidade e Testes de Usabilidade'
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
                id: 10,
                nome: 'Rodrigo Bichet',
                cargo: 'Aluno de mestrado',
                instituicao: 'Fundação Universidade Federal de Pelotas (UFPel)',
                foto: '/equipe/colaboradores-externos/rodrigo-bichet.jpg.png',
                bio: 'Consultor e Colaborador externo'
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
