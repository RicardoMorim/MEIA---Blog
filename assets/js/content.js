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
        photo: 'assets/img/dinis-laranjeira.jpg',
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
          'Brainstorming AI security and expert-system approaches',
          'Defining the project direction and confirming the domain expert'
        ],
        paragraphs: [
          'During the first week, we had the opportunity to meet as a team and get to know each other better. We discussed each member\'s professional background, areas of expertise and interests.',
          'Cybersecurity was assigned to our team because of the background of several members. Within this area, we wanted to address a modern and relevant problem, so we focused our initial brainstorming on the security of AI systems, particularly LLM-based agents. We explored how an expert system could use expert knowledge to identify threats associated with an agent\'s data sources, tools, permissions and external capabilities.',
          'Throughout the week, we refined the idea towards an expert system for AI threat modelling and compliance assessment. The proposed system will analyse a structured description of an AI system to identify potential security threats and recommend suitable controls and security tests. It may also identify compliance requirements that could be relevant to the system being assessed.',
          'We also confirmed Diogo Gomes, Product Security Engineer at Blip, as the project\'s domain expert.'
        ]
      },
      {
        id: 'week-02',
        title: 'Week 2 - Defining the Direction',
        period: 'Week 02',
        status: 'Published',
        excerpt: 'The team defined the project\'s scope, explored core expert-system functionalities and met with the domain expert to prepare for knowledge acquisition.',
        summary: [
          'Formal definition and communication of the project topic',
          'Brainstorming the core functionalities of the expert system',
          'First meeting with the domain expert and planning for knowledge acquisition'
        ],
        paragraphs: [
          'During the second week, we took an important step towards consolidating our project. After the initial brainstorming and exploration of different approaches, we formally defined and communicated the topic that will guide the development of our expert system.',
          'Our project will focus on developing an expert system for assessing security risks in AI systems, particularly LLM-based agents. Based on information about an agent\'s architecture, capabilities, data access and existing security controls, the system will use expert knowledge, implemented through Prolog and Drools, to identify potential threats, detect risky data and access paths, recommend appropriate security controls and mitigations, and indicate potentially applicable EU AI Act compliance requirements. A key aspect of the system will be explainability: the system should not only provide conclusions, but also explain the reasoning behind them, including cases where the available information is incomplete or unknown.',
          'With the project scope now established, we started brainstorming possible core functionalities among the team members. We discussed how the different components of the system could interact and what information would be required to support meaningful security assessments. This initial work helped us start translating the project concept into concrete capabilities and provided a clearer foundation for the next stages of development.',
          'This week also marked our first meeting with Diogo Gomes, our domain expert. During the meeting, we presented the defined project topic and discussed some of our initial ideas for the system. Although the discussion was deliberately kept at a high level, it provided an important first opportunity to validate our direction and introduce the expert to the objectives and scope of the project.',
          'Given the central role of the expert in the development of a knowledge-based expert system, we agreed that a deeper knowledge acquisition process will be necessary. The value of the system depends significantly on incorporating domain knowledge that goes beyond what can be derived from general or non-expert knowledge. For this reason, we scheduled a second meeting with Diogo for the following week, with the objective of exploring the domain in greater depth, understanding how security professionals approach the assessment of AI systems, and gathering the knowledge required to define the system\'s rules, reasoning processes and recommendations.',
          'Overall, this week allowed us to move from an initial project idea towards a clearly defined problem and development direction. We now have a concrete scope, an identified technological approach and a domain expert who will play a key role in grounding the knowledge base of the system in real-world cybersecurity expertise.'
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
        short: 'An expert system for AI threat modelling and compliance assessment.',
        long: 'We are developing an expert system that analyses AI systems, identifies potential security threats and recommends suitable controls and security tests.',
        weeks: [
          {
            title: 'Week 1 - Hello World',
            date: 'Week 01',
            excerpt: 'Team introductions, initial exploration of AI security and definition of the project direction.',
            tags: ['AI security', 'Project exploration'],
            href: '#/reports/week-01'
          },
          {
            title: 'Week 2 - Defining the Direction',
            date: 'Week 02',
            excerpt: 'The team defined the project\'s scope, explored core expert-system functionalities and met with the domain expert to prepare for knowledge acquisition.',
            tags: ['AI security', 'Expert system', 'Knowledge acquisition'],
            href: '#/reports/week-02'
          }
        ]
      }
    ]
  };
})();
