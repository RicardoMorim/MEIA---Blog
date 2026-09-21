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
        role: 'AI Security & AppSec',
        bio: 'I completed my bachelor\u2019s degree in Informatics Engineering (LEI) at ISEP in 2026 and joined MEIA at ISEP right after. I have professional experience in Application Security and AI Security at Celfocus. In October I moved to Critical Manufacturing as an AI Software Engineer, where I will gain more experience in AI.',
        user: 'ricardomorim',
        photo: 'assets/img/Ricardo.jpeg'
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
        role: 'Software Engineer - Fullstack Developer',
        bio: 'I completed my Bachelor\'s degree in Informatics and Computer Engineering in 2023. I currently work as a fullstack developer, building applications mostly for government institutions. I joined MEIA to strengthen my foundations in artificial intelligence.',
        user: 'Dinis-Laranjeira',
        email: '1260428@isep.ipp.pt',
        linkedin: 'https://www.linkedin.com/in/dinis-laranjeira-140678251/'
      }
    ],

    reports: [
      {
        id: 'week-01',
        title: 'Week 1 - Hello World',
        period: 'Week 01',
        status: 'Published',
        excerpt: 'The team got to know one another, explored AI security challenges and defined the initial direction of the project.',
        summary: [
          'Team introductions and background sharing',
          'Brainstorming AI security and knowledge-based approaches',
          'Defining the project direction and confirming the domain expert'
        ],
        paragraphs: [
          'During the first week, we had the opportunity to meet as a team and get to know each other better. We discussed each member\'s professional background, areas of expertise and interests.',
          'Cybersecurity was assigned to our team because of the background of several members. Within this area, we wanted to address a modern and relevant problem, so we focused our initial brainstorming on the security of AI systems, particularly LLM-based agents. We explored how a knowledge-based system could use expert knowledge to identify threats associated with an agent\'s data sources, tools, permissions and external capabilities.',
          'Throughout the week, we refined the idea towards a knowledge-based system for AI threat modelling and compliance assessment. The proposed system will analyse a structured description of an AI system to identify potential security threats and recommend suitable controls and security tests. It may also identify compliance requirements that could be relevant to the system being assessed.',
          'We also confirmed Diogo Gomes, Product Security Engineer at Blip, as the project\'s domain expert.'
        ]
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
