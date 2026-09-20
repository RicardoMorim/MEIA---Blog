/* Cairn — conteúdo do blogue.
 *
 * O site é escrito em inglês; os comentários do código ficam em português.
 * Os challenges e relatórios publicados devem ser substituídos por conteúdo
 * real à medida que o trabalho da equipa avança.
 */
(function () {
  'use strict';

  window.CAIRN = {
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
        role: 'Software Engineer',
        bio: 'I completed my Bachelor\'s degree in Informatics Engineering in 2019 and currently work as a Software Engineer, with experience in developing scalable solutions, managing projects, and leading teams. I also have experience in Business Intelligence and data analysis. I joined MEIA to deepen my knowledge of Artificial Intelligence and explore new ways of applying AI to solve real-world problems.',
        user: 'JoaoAlmeida147',
        photo: 'assets/img/joao-almeida.jpg',
        email: '1260435@isep.ipp.pt',
        linkedin: 'https://www.linkedin.com/in/joaopgalmeida-dev/'
      },
      {
        name: 'Dinis Laranjeira',
        role: 'Evaluation & Visualization',
        bio: 'Builds the dashboards and the metrics — and is the one who asks whether the pretty number means anything.',
        user: 'dinislaranjeira'
      }
    ],

    reports: [
      {
        title: 'Weekly Report 01',
        period: 'Week 01',
        status: 'Placeholder',
        summary: 'The first weekly report will be published here once it has been completed and reviewed by the team.'
      }
    ],

    projects: [
      {
        id: 'challenge-01',
        name: 'Challenge 01',
        course: 'MEIA · 2026/27',
        period: '2026/27',
        status: 'In progress',
        short: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        long: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        weeks: []
      }
    ]
  };
})();
