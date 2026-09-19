/* Cifra — conteúdo do blogue.
 *
 * Este é o único ficheiro que precisa de ser editado para publicar. Para
 * acrescentar uma entrada semanal, junta um objeto ao array `weeks` do projeto
 * respetivo — o número da semana, o rótulo de entradas e o intervalo de datas
 * são calculados automaticamente em app.js.
 *
 * Blocos de uma entrada:
 *   T(titulo, texto)             — um parágrafo
 *   L(titulo, [itens])           — uma lista
 *   F(slot, legenda, alt)        — uma figura (imagem em assets/img/<slot>.png)
 *   F(slot, legenda, alt, src)   — o mesmo, com caminho de imagem à escolha
 *
 * As imagens são opcionais: quando o ficheiro não existe fica a caixa de papel
 * do próprio design, não um ícone de imagem partida. Ver assets/img/README.md.
 */
(function () {
  'use strict';

  var T = function (title, text) { return { kind: 'text', title: title, text: text }; };
  var L = function (title, items) { return { kind: 'list', title: title, items: items }; };
  var F = function (slot, caption, alt, src) {
    /* `src` é opcional: sem ele a imagem é assets/img/<slot>.png */
    return { kind: 'figure', title: 'Diagrama', slot: slot, caption: caption, alt: alt, src: src };
  };

  window.CIFRA = {
    /* A organização no GitHub. Os repositórios de cada projeto são construídos a
       partir daqui, pelo que mudar esta linha muda todas as ligações. */
    githubOrg: 'isep-meia',

    members: [
      {
        name: 'Ricardo Morim',
        role: 'Dados & MLOps',
        bio: 'Monta o pipeline de ingestão e mantém as experiências reprodutíveis — se não dá para correr outra vez, não conta.',
        user: 'ricardomorim'
      },
      {
        name: 'Pedro Campos',
        role: 'Software Engineer - AI Security',
        bio: 'I completed my Bachelor\'s degree in Informatics Engineering in 2024. After working in application security, I joined Snyk, where I am now a Software Engineer focused on AI security. I decided to join MEIA to strengthen my foundations in artificial intelligence.',
        user: 'pedrocampos',
        photo: 'assets/img/pedro-campos.jpg',
        photoClean: true,
        linkedin: 'https://www.linkedin.com/in/pedro-m-campos/'
      },
      {
        name: 'Pedro Vieira',
        role: 'Adversarial / Red team',
        bio: 'Tenta partir o que os outros constroem: gera casos de evasão e mede até onde o sistema aguenta.',
        user: 'pedrovieira'
      },
      {
        name: 'João Almeida',
        role: 'Features & engenharia',
        bio: 'Vive dentro dos dados em bruto. Traduz o que a máquina cospe em features que um modelo consegue mesmo aprender.',
        user: 'joaoalmeida'
      },
      {
        name: 'Dinis Laranjeira',
        role: 'Avaliação & visualização',
        bio: 'Constrói os dashboards e as métricas — e é quem pergunta se o número bonito quer dizer alguma coisa.',
        user: 'dinislaranjeira'
      }
    ],

    projects: [
      {
        id: 'cifra-ids',
        name: 'Cibersegurança com IA',
        course: 'Projeto Integrador · 1.º semestre',
        period: 'ago — dez 2026',
        status: 'A decorrer',
        repo: 'isep-meia/cifra-ids',
        short: 'Deteção de intrusões em fluxos de rede com machine learning, avaliada contra falsos positivos e ataques de evasão.',
        long: 'Um sistema de deteção de intrusões que aprende com tráfego de rede real. Partimos de um baseline supervisionado, medimos tudo contra falsos positivos — um SOC afogado em alertas é um SOC cego — e empurramos para deteção de anomalias e robustez adversarial.',
        weeks: [
          {
            title: 'Arranque, âmbito e uma discussão de três horas',
            date: '3 ago 2026',
            author: 'Ricardo Morim',
            tags: ['âmbito', 'equipa'],
            excerpt: 'Primeira reunião, primeiro desacordo saudável: detetar tudo ou detetar bem? Ficou definido o problema e o que fica de fora.',
            lead: 'Começámos com uma lista de ideias grande demais e acabámos com uma frase só — e foi o melhor resultado possível para a primeira semana.',
            blocks: [
              T('Resumo', 'Juntámo-nos na terça à tarde para fechar o âmbito e saímos de lá quase três horas depois. A tentação inicial era fazer uma plataforma completa de SOC, com correlação de eventos e resposta automática. Cortámos. O projeto passa a ser uma coisa só: detetar tráfego malicioso em fluxos de rede com modelos de machine learning, e avaliar isso de forma honesta, incluindo contra ataques que tentem enganar o próprio detetor.'),
              L('Objetivos', [
                'Fechar uma frase de âmbito que caiba numa linha',
                'Escolher o dataset de partida',
                'Criar repositório, estrutura de pastas e convenções de commits',
                'Distribuir frentes de trabalho pelos cinco'
              ]),
              L('Decisões técnicas', [
                'Python + scikit-learn para o baseline; PyTorch só quando for mesmo preciso',
                'CIC-IDS2017 como dataset de referência, por ser documentado e comparável com a literatura',
                'Tudo em notebooks só para exploração — o que conta vive em módulos'
              ]),
              L('Próximos passos', [
                'Revisão de literatura repartida por pares',
                'Primeira leitura do dataset e contagem de classes'
              ])
            ]
          },
          {
            title: 'Estado da arte: muita coisa publicada, pouca coisa reprodutível',
            date: '10 ago 2026',
            author: 'Pedro Campos',
            tags: ['literatura', 'avaliação'],
            excerpt: 'Lemos catorze artigos. Metade reporta 99% de accuracy no mesmo dataset e quase nenhum mostra a taxa de falsos positivos.',
            lead: 'Descobrimos cedo que os números impressionantes da literatura são quase todos sobre o mesmo conjunto de dados, com as mesmas fugas de informação.',
            blocks: [
              T('Resumo', 'Dividimos a leitura em pares e trouxemos catorze artigos para a mesa. O padrão repete-se: accuracy altíssima, classes desequilibradas tratadas com oversampling antes da divisão treino/teste, e quase nenhum reporta falsos positivos por hora de tráfego, que é a métrica que um analista real sente. Isto mudou a nossa forma de avaliar antes sequer de termos modelo.'),
              L('Objetivos', [
                'Mapear abordagens: supervisionado, deteção de anomalias, híbridos',
                'Perceber que métricas são usadas — e quais são escondidas',
                'Escolher os dois ou três trabalhos que servem de comparação'
              ]),
              T('O que correu mal', 'Perdemos um dia inteiro a tentar reproduzir os resultados de um artigo que não publicava o código nem a seed. Ficámos pelo caminho. A lição foi registada no repositório: qualquer comparação que façamos tem de ser contra algo que consigamos correr nós.'),
              L('Decisões técnicas', [
                'F1 por classe e falsos positivos por hora passam a ser as métricas principais; accuracy fica como nota de rodapé',
                'Divisão treino/teste sempre temporal, nunca aleatória sobre fluxos do mesmo ataque'
              ]),
              L('Próximos passos', [
                'Carregar o dataset a sério e olhar para as distribuições'
              ])
            ]
          },
          {
            title: 'Os dados são mais sujos do que o paper diz',
            date: '17 ago 2026',
            author: 'João Almeida',
            tags: ['dados', 'features'],
            excerpt: 'Colunas duplicadas, timestamps inconsistentes, uma feature que sozinha previa o ataque. Semana de limpeza.',
            lead: 'Uma feature tinha 0.99 de correlação com o alvo. Durante duas horas achámos que éramos génios; depois percebemos que era o identificador da porta de destino do gerador de tráfego.',
            blocks: [
              T('Resumo', 'Primeira semana com as mãos nos dados. O CIC-IDS2017 vem com oitenta e tal features derivadas de fluxos, e boa parte delas não sobrevive a uma inspeção séria: duplicados exatos, colunas constantes, valores infinitos em divisões por zero, e fugas de informação óbvias assim que se olha para a matriz de correlação. Escrevemos o módulo de limpeza e deixámo-lo testado.'),
              L('Objetivos', [
                'Escrever um loader determinístico do dataset',
                'Documentar e remover fugas de informação',
                'Definir o conjunto de features de partida'
              ]),
              F('diagrama-ids-s3', 'Pipeline de dados: captura → normalização de fluxos → features → conjuntos de treino/validação/teste.', 'Diagrama do pipeline de dados'),
              T('O que correu mal', 'A feature "Destination Port" tratada como número deu-nos um modelo perfeito e inútil. Passou a ser categórica com agrupamento, e ficou uma nota grande no README: qualquer métrica acima de 0.98 é suspeita até prova em contrário.'),
              L('Decisões técnicas', [
                'Parquet em vez de CSV — a leitura passou de minutos a segundos',
                'Pré-processamento fechado num Pipeline do scikit-learn, ajustado só no treino'
              ]),
              L('Próximos passos', [
                'Treinar o primeiro baseline e registar tudo'
              ])
            ]
          },
          {
            title: 'Baseline: o modelo simples que ninguém quer publicar',
            date: '24 ago 2026',
            author: 'Pedro Campos',
            tags: ['baseline', 'modelos'],
            excerpt: 'Random forest e gradient boosting contra uma regressão logística. O baseline simples ficou muito mais perto do que esperávamos.',
            lead: 'A diferença entre o modelo mais simples e o mais complicado foi de quatro pontos de F1 — e de quarenta minutos de treino.',
            blocks: [
              T('Resumo', 'Treinámos três modelos sobre o mesmo pipeline e comparámos com a divisão temporal. O gradient boosting ganha, como se esperava, mas a regressão logística com as features certas chega perto o suficiente para servir de referência permanente. Passou a ser o nosso chão: qualquer coisa que inventemos tem de bater isto, e tem de justificar o custo.'),
              L('Objetivos', [
                'Treinar e registar três modelos com a mesma divisão',
                'Montar o registo de experiências',
                'Analisar os erros, não só as médias'
              ]),
              F('diagrama-ids-s4', 'Matriz de confusão do baseline — as classes raras concentram quase todo o erro.', 'Matriz de confusão do baseline'),
              L('Decisões técnicas', [
                'MLflow local para registar parâmetros, métricas e artefactos de cada corrida',
                'Uma seed fixa por experiência, guardada no ficheiro de configuração'
              ]),
              L('Próximos passos', [
                'Atacar as classes raras',
                'Começar a parte adversarial'
              ])
            ]
          },
          {
            title: 'A tentar enganar o nosso próprio detetor',
            date: '31 ago 2026',
            author: 'Pedro Vieira',
            tags: ['adversarial', 'robustez'],
            excerpt: 'Pequenas perturbações nos tempos entre pacotes chegaram para derrubar a deteção de um ataque inteiro.',
            lead: 'Bastou atrasar pacotes alguns milissegundos para o modelo deixar de ver um port scan. Foi a semana mais desconfortável até agora.',
            blocks: [
              T('Resumo', 'Implementámos um gerador de perturbações que respeita as restrições do domínio — não vale mudar features que um atacante não controla. Mesmo assim, com alterações plausíveis nos intervalos entre pacotes e no enchimento de payload, a deteção de varrimento caiu de forma clara. Ou seja: o baseline aprendeu ritmo, não intenção.'),
              L('Objetivos', [
                'Definir que features são realmente manipuláveis por um atacante',
                'Gerar amostras de evasão realistas',
                'Medir a degradação por tipo de ataque'
              ]),
              T('O que correu mal', 'A primeira versão do gerador produzia fluxos impossíveis — durações negativas, mais bytes recebidos do que enviados em ligações unidirecionais. Os resultados iniciais eram entusiasmantes e completamente falsos. Reescrevemos com validação de restrições antes de cada amostra.'),
              L('Decisões técnicas', [
                'Só se perturbam features sob controlo do atacante, listadas explicitamente',
                'Treino adversarial entra como experiência, não como correção automática'
              ]),
              L('Próximos passos', [
                'Retreinar com amostras adversariais e ver o custo em falsos positivos'
              ])
            ]
          },
          {
            title: 'Dashboard: tornar o modelo legível para quem decide',
            date: '7 set 2026',
            author: 'Dinis Laranjeira',
            tags: ['dashboard', 'avaliação'],
            excerpt: 'Um alerta sem explicação é ruído. Esta semana foi passada a mostrar porque é que o modelo desconfia de um fluxo.',
            lead: 'Mostrámos o dashboard a um colega que não conhecia o projeto. Percebeu tudo menos a parte que achávamos mais clara.',
            blocks: [
              T('Resumo', 'Construímos a primeira versão da interface de análise: fila de alertas ordenada por confiança, detalhe do fluxo e contribuição das features para a decisão. A parte difícil não foi técnica — foi decidir o que não mostrar. A versão atual esconde por omissão tudo o que não muda a decisão do analista.'),
              L('Objetivos', [
                'Fila de alertas com ordenação por risco',
                'Explicação por alerta com contribuição de features',
                'Teste informal de usabilidade com alguém de fora'
              ]),
              F('diagrama-ids-s6', 'Ecrã de detalhe do alerta: fluxo, veredito e as cinco features que mais pesaram.', 'Captura do dashboard'),
              T('O que correu mal', 'A escala de confiança de 0 a 1 foi lida como percentagem de certeza absoluta. Vai passar a três níveis com texto, porque é assim que a decisão é tomada na prática.'),
              L('Próximos passos', [
                'Ligar o dashboard ao modelo retreinado com dados adversariais',
                'Preparar a apresentação intercalar'
              ])
            ]
          }
        ]
      },
      {
        id: 'visao-industrial',
        name: 'Visão computacional em linha de produção',
        course: 'Sistemas Inteligentes · 1.º semestre',
        period: 'out — dez 2026',
        status: 'Por arrancar',
        repo: 'isep-meia/visao-industrial',
        short: 'Inspeção visual de defeitos com poucas amostras rotuladas, num contexto industrial real.',
        long: 'Segundo projeto do semestre: deteção de defeitos em peças a partir de imagem, com o problema habitual de não haver exemplos suficientes do que corre mal. O diário arranca com a primeira semana de trabalho.',
        weeks: []
      },
      {
        id: 'agentes-llm',
        name: 'Agentes LLM para apoio à decisão',
        course: 'Projeto de Dissertação · 2.º semestre',
        period: 'fev — jun 2027',
        status: 'Planeado',
        repo: 'isep-meia/agentes-llm',
        short: 'Agentes com ferramentas a apoiar decisões operacionais — e a forma de avaliar se ajudam mesmo.',
        long: 'Projeto do segundo semestre, ainda em fase de proposta. Fica aqui já com repositório e diário próprios para começarmos a escrever desde o primeiro dia.',
        weeks: []
      }
    ]
  };
})();
