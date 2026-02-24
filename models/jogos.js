const jogos = [
    {
        id: 1,
        nome: 'Mundo das Cores',
        descricao: 'Aprenda sobre cores de forma divertida e interativa. Ideal para desenvolver habilidades visuais e cognitivas.',
        descricaoCompleta: 'O aplicativo "Mundo das Cores" é desenvolvido para auxiliar crianças no estudo das cores de forma lúdica e interativa. Utilizando recursos visuais, vídeos e atividades práticas, o app permite benefícios como acessibilização de forma pedagógica e interativa.',
        tags: ['Arte', 'Linguagens'],
        icon: '🎨',
        background: '#FFE4E1',
        relacionados: [3, 4, 6]
    },
    {
        id: 2,
        nome: 'Aventura dos Números',
        descricao: 'Explore o mundo dos números com atividades lúdicas e acessíveis para todas as crianças.',
        descricaoCompleta: 'A "Aventura dos Números" proporciona uma jornada educacional através dos dígitos e operações matemáticas básicas. Com interfaces simples e feedback claro, as crianças desenvolvem conceitos numéricos de forma segura e estimulante.',
        tags: ['Matemática'],
        icon: '🔢',
        background: '#E0F2FE',
        relacionados: [5, 1, 3]
    },
    {
        id: 3,
        nome: 'Reino Animal',
        descricao: 'Conheça os animais e seus habitats através de jogos educacionais e ilustrações amigáveis.',
        descricaoCompleta: 'O "Reino Animal" oferece uma experiência de aprendizado sobre biodiversidade. Com imagens detalhadas, sons naturais e atividades interativas, as crianças exploram características de diversos animais e seus ecossistemas.',
        tags: ['Ciências da Natureza'],
        icon: '🦁',
        background: '#E8F5E9',
        relacionados: [2, 4, 5]
    },
    {
        id: 4,
        nome: 'Alfabeto Divertido',
        descricao: 'Aprenda as letras do alfabeto com imagens e atividades interativas.',
        descricaoCompleta: 'O "Alfabeto Divertido" é um jogo educacional que ensina o alfabeto de forma dinâmica. Com ilustrações visuais, pronúncia clara e atividades de reconhecimento, favorece o aprendizado inicial da leitura e escrita.',
        tags: ['Língua Portuguesa', 'Linguagens'],
        icon: '🔤',
        background: '#FFF9C4',
        relacionados: [1, 5, 6]
    },
    {
        id: 5,
        nome: 'Formas Geométricas',
        descricao: 'Descubra as formas geométricas básicas através de quebra-cabeças e desafios acessórios.',
        descricaoCompleta: 'As "Formas Geométricas" apresentam conceitos de geometria básica através de jogos interativos. Os usuários aprendem a identificar, nomear e trabalhar com diferentes formas de maneira inclusiva e divertida.',
        tags: ['Matemática'],
        icon: '✨',
        background: '#F3E5F5',
        relacionados: [2, 3, 4]
    },
    {
        id: 6,
        nome: 'Minhas Emoções',
        descricao: 'Aprenda a identificar e expressar emoções de forma clara e divertida.',
        descricaoCompleta: 'O aplicativo "Minhas Emoções" foi desenvolvido para auxiliar crianças na compreensão e expressão de sentimentos. Com recursos visuais e atividades inclusivas, promove inteligência emocional e autorregulação.',
        tags: ['Ciências Humanas'],
        icon: '😊',
        background: '#FCE4EC',
        relacionados: [1, 4, 2]
    }
];

module.exports = jogos;
