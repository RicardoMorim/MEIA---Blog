/* Cairn — conteúdo do blogue.
 *
 * Este é o único ficheiro que precisa de ser editado para publicar. Para
 * acrescentar uma entrada semanal, junta um objeto ao array `weeks` do projeto
 * respetivo — o número da semana, o rótulo de entradas e o intervalo de datas
 * são calculados automaticamente em app.js.
 *
 * O site é escrito em inglês; os comentários do código ficam em português.
 *
 * Blocos de uma entrada:
 *   T(titulo, texto)             — um parágrafo
 *   L(titulo, [itens])           — uma lista
 *   F(slot, legenda, alt)        — uma figura (imagem em assets/img/<slot>.png)
 *   F(slot, legenda, alt, src)   — o mesmo, com caminho de imagem à escolha
 *
 * Cada pessoa tem `user` (GitHub) e, se o email não for esse nome, `email`.
 * A fotografia é assets/img/membro-N.jpg, pela ordem do array, ou o campo
 * `photo` com um caminho à escolha.
 *
 * As imagens são opcionais: quando o ficheiro não existe fica a moldura vazia,
 * não um ícone de imagem partida. Ver assets/img/README.md.
 */
(function () {
  'use strict';

  var T = function (title, text) { return { kind: 'text', title: title, text: text }; };
  var L = function (title, items) { return { kind: 'list', title: title, items: items }; };
  var F = function (slot, caption, alt, src) {
    /* `src` é opcional: sem ele a imagem é assets/img/<slot>.png */
    return { kind: 'figure', title: 'Figure', slot: slot, caption: caption, alt: alt, src: src };
  };

  window.CAIRN = {
    /* A organização no GitHub. Os repositórios de cada projeto são construídos a
       partir daqui, pelo que mudar esta linha muda todas as ligações. */
    githubOrg: 'isep-meia',

    members: [
      {
        name: 'Ricardo Morim',
        role: 'Data & MLOps',
        bio: 'Builds the ingestion pipeline and keeps the experiments reproducible — if it cannot be run again, it does not count.',
        user: 'ricardomorim'
      },
      {
        name: 'Pedro Campos',
        role: 'Software Engineer - AI Security',
        bio: 'I completed my Bachelor\'s degree in Informatics Engineering in 2024. After working in application security, I joined Snyk, where I am now a Software Engineer focused on AI security. I decided to join MEIA to strengthen my foundations in artificial intelligence.',
        user: 'mlw157',
        email: '1211511@isep.ipp.pt',
        photo: 'assets/img/pedro-campos.jpg',
        photoClean: true,
        linkedin: 'https://www.linkedin.com/in/pedro-m-campos/'
      },
      {
        name: 'Pedro Vieira',
        role: 'Software Engineer - Fullstack Developer',
        bio: 'I completed my Bachelor\'s degree in Informatics Engineering in 2025 and work as a fullstack developer at Agile Cloud Solutions, building software for industrial clients. Before that I worked with networks, systems and information security. I joined MEIA to strengthen my foundations in artificial intelligence.',
        user: 'pedrovieira975',
        photo: 'assets/img/pedro-vieira.jpg',
        email: '1260442@isep.ipp.pt',
        linkedin: 'https://www.linkedin.com/in/pedro-vieira-aaba991a1'
      },
      {
        name: 'João Almeida',
        role: 'Features & Engineering',
        bio: 'Lives inside the raw data. Turns whatever the machine spits out into features a model can actually learn from.',
        user: 'joaoalmeida'
      },
      {
        name: 'Dinis Laranjeira',
        role: 'Evaluation & Visualization',
        bio: 'Builds the dashboards and the metrics — and is the one who asks whether the pretty number means anything.',
        user: 'dinislaranjeira'
      }
    ],

    projects: [
      {
        id: 'cairn-ids',
        name: 'Cybersecurity with AI',
        course: 'Integrative Project · 1st semester',
        period: 'Aug — Dec 2026',
        status: 'In progress',
        repo: 'isep-meia/cairn-ids',
        short: 'Intrusion detection on network flows with machine learning, evaluated against false positives and evasion attacks.',
        long: 'An intrusion detection system that learns from real network traffic. We start from a supervised baseline, measure everything against false positives — a SOC drowning in alerts is a blind SOC — and push towards anomaly detection and adversarial robustness.',
        weeks: [
          {
            title: 'Kickoff, scope and a three-hour argument',
            date: '3 Aug 2026',
            author: 'Ricardo Morim',
            tags: ['scope', 'team'],
            excerpt: 'First meeting, first healthy disagreement: detect everything or detect well? We settled the problem and what stays out of it.',
            lead: 'We started with a list of ideas that was far too long and left with a single sentence — the best possible outcome for week one.',
            blocks: [
              T('Summary', 'We met on Tuesday afternoon to close the scope and walked out almost three hours later. The initial temptation was to build a full SOC platform, with event correlation and automated response. We cut it. The project is now one thing only: detect malicious traffic in network flows using machine learning models, and evaluate that honestly, including against attacks that try to fool the detector itself.'),
              L('Goals', [
                'Settle on a scope sentence that fits in one line',
                'Choose the starting dataset',
                'Set up the repository, folder structure and commit conventions',
                'Split the work across the five of us'
              ]),
              L('Technical decisions', [
                'Python and scikit-learn for the baseline; PyTorch only when genuinely needed',
                'CIC-IDS2017 as the reference dataset, because it is documented and comparable with the literature',
                'Notebooks for exploration only — anything that counts lives in modules'
              ]),
              L('Next steps', [
                'Literature review split across pairs',
                'First read of the dataset and a class count'
              ])
            ]
          },
          {
            title: 'State of the art: plenty published, little reproducible',
            date: '10 Aug 2026',
            author: 'Pedro Campos',
            tags: ['literature', 'evaluation'],
            excerpt: 'We read fourteen papers. Half report 99% accuracy on the same dataset and almost none show the false positive rate.',
            lead: 'We found out early that the impressive numbers in the literature are nearly all on the same dataset, with the same information leaks.',
            blocks: [
              T('Summary', 'We split the reading across pairs and brought fourteen papers to the table. The pattern repeats: very high accuracy, imbalanced classes handled with oversampling before the train/test split, and almost nobody reporting false positives per hour of traffic, which is the metric a real analyst feels. This changed how we evaluate before we even had a model.'),
              L('Goals', [
                'Map the approaches: supervised, anomaly detection, hybrids',
                'Work out which metrics are reported — and which are hidden',
                'Pick the two or three papers worth comparing against'
              ]),
              T('What went wrong', 'We lost a full day trying to reproduce the results of a paper that published neither the code nor the seed. We gave up halfway. The lesson went into the repository: any comparison we make has to be against something we can run ourselves.'),
              L('Technical decisions', [
                'Per-class F1 and false positives per hour become the headline metrics; accuracy is a footnote',
                'Train/test splits are always temporal, never random across flows from the same attack'
              ]),
              L('Next steps', [
                'Load the dataset properly and look at the distributions'
              ])
            ]
          },
          {
            title: 'The data is dirtier than the paper says',
            date: '17 Aug 2026',
            author: 'João Almeida',
            tags: ['data', 'features'],
            excerpt: 'Duplicate columns, inconsistent timestamps, one feature that predicted the attack on its own. A week of cleaning.',
            lead: 'One feature had 0.99 correlation with the target. For two hours we thought we were geniuses; then we realised it was the destination port of the traffic generator.',
            blocks: [
              T('Summary', 'First week with our hands in the data. CIC-IDS2017 ships around eighty flow-derived features, and a good share of them do not survive a serious inspection: exact duplicates, constant columns, infinite values from divisions by zero, and information leaks that are obvious the moment you look at the correlation matrix. We wrote the cleaning module and left it tested.'),
              L('Goals', [
                'Write a deterministic dataset loader',
                'Document and remove information leaks',
                'Define the starting feature set'
              ]),
              F('diagrama-ids-s3', 'Data pipeline: capture → flow normalisation → features → train/validation/test sets.', 'Diagram of the data pipeline'),
              T('What went wrong', 'The "Destination Port" feature treated as a number gave us a perfect and useless model. It became categorical with grouping, and a large note went into the README: any metric above 0.98 is suspect until proven otherwise.'),
              L('Technical decisions', [
                'Parquet instead of CSV — reading went from minutes to seconds',
                'Preprocessing wrapped in a scikit-learn Pipeline, fitted on the training split only'
              ]),
              L('Next steps', [
                'Train the first baseline and log everything'
              ])
            ]
          },
          {
            title: 'Baseline: the simple model nobody wants to publish',
            date: '24 Aug 2026',
            author: 'Pedro Campos',
            tags: ['baseline', 'models'],
            excerpt: 'Random forest and gradient boosting against a logistic regression. The simple baseline landed far closer than we expected.',
            lead: 'The gap between the simplest model and the most complicated one was four points of F1 — and forty minutes of training.',
            blocks: [
              T('Summary', 'We trained three models on the same pipeline and compared them using the temporal split. Gradient boosting wins, as expected, but logistic regression with the right features gets close enough to serve as a permanent reference. It became our floor: anything we invent has to beat it, and has to justify the cost.'),
              L('Goals', [
                'Train and log three models on the same split',
                'Set up the experiment tracking',
                'Analyse the errors, not just the averages'
              ]),
              F('diagrama-ids-s4', 'Confusion matrix of the baseline — the rare classes hold almost all of the error.', 'Confusion matrix of the baseline'),
              L('Technical decisions', [
                'Local MLflow to log parameters, metrics and artefacts for every run',
                'One fixed seed per experiment, stored in the configuration file'
              ]),
              L('Next steps', [
                'Attack the rare classes',
                'Start the adversarial work'
              ])
            ]
          },
          {
            title: 'Trying to fool our own detector',
            date: '31 Aug 2026',
            author: 'Pedro Vieira',
            tags: ['adversarial', 'robustness'],
            excerpt: 'Small perturbations in inter-packet timing were enough to bring down detection of an entire attack.',
            lead: 'Delaying packets by a few milliseconds was enough for the model to stop seeing a port scan. The most uncomfortable week so far.',
            blocks: [
              T('Summary', 'We implemented a perturbation generator that respects the constraints of the domain — you do not get to change features an attacker does not control. Even so, with plausible changes to inter-packet intervals and payload padding, scan detection dropped clearly. In other words: the baseline learned rhythm, not intent.'),
              L('Goals', [
                'Define which features an attacker can actually manipulate',
                'Generate realistic evasion samples',
                'Measure the degradation per attack type'
              ]),
              T('What went wrong', 'The first version of the generator produced impossible flows — negative durations, more bytes received than sent on one-way connections. The initial results were exciting and completely false. We rewrote it with constraint validation before every sample.'),
              L('Technical decisions', [
                'Only features under the attacker\'s control are perturbed, listed explicitly',
                'Adversarial training goes in as an experiment, not as an automatic fix'
              ]),
              L('Next steps', [
                'Retrain with adversarial samples and measure the cost in false positives'
              ])
            ]
          },
          {
            title: 'Dashboard: making the model readable for whoever decides',
            date: '7 Sep 2026',
            author: 'Dinis Laranjeira',
            tags: ['dashboard', 'evaluation'],
            excerpt: 'An alert without an explanation is noise. This week went into showing why the model distrusts a flow.',
            lead: 'We showed the dashboard to a colleague who did not know the project. He understood everything except the part we thought was clearest.',
            blocks: [
              T('Summary', 'We built the first version of the analysis interface: an alert queue ordered by confidence, the flow detail, and the contribution of each feature to the decision. The hard part was not technical — it was deciding what not to show. The current version hides by default anything that does not change the analyst\'s decision.'),
              L('Goals', [
                'Alert queue ordered by risk',
                'Per-alert explanation with feature contributions',
                'Informal usability test with someone from outside'
              ]),
              F('diagrama-ids-s6', 'Alert detail screen: the flow, the verdict, and the five features that weighed most.', 'Screenshot of the dashboard'),
              T('What went wrong', 'The 0 to 1 confidence scale was read as a percentage of absolute certainty. It will become three levels with text, because that is how the decision is made in practice.'),
              L('Next steps', [
                'Connect the dashboard to the model retrained on adversarial data',
                'Prepare the mid-term presentation'
              ])
            ]
          }
        ]
      },
      {
        id: 'visao-industrial',
        name: 'Computer Vision on the Production Line',
        course: 'Intelligent Systems · 1st semester',
        period: 'Oct — Dec 2026',
        status: 'Starting soon',
        repo: 'isep-meia/visao-industrial',
        short: 'Visual defect inspection with few labelled samples, in a real industrial setting.',
        long: 'Second project of the semester: detecting defects in parts from images, with the usual problem of not having enough examples of what goes wrong. The diary starts with the first week of work.',
        weeks: []
      },
      {
        id: 'agentes-llm',
        name: 'LLM Agents for Decision Support',
        course: 'Dissertation Project · 2nd semester',
        period: 'Feb — Jun 2027',
        status: 'Planned',
        repo: 'isep-meia/agentes-llm',
        short: 'Tool-using agents supporting operational decisions — and how to evaluate whether they actually help.',
        long: 'Second-semester project, still at the proposal stage. It sits here already with its own repository and diary so we can start writing from day one.',
        weeks: []
      }
    ]
  };
})();
