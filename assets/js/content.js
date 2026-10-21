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
      },
      {
        id: 'week-03',
        title: 'Week 3 - Building the Knowledge Base',
        period: 'Week 03',
        status: 'Published',
        excerpt: 'The team divided the research work into themes, validated the rules gathered so far with the domain expert and started the preliminary knowledge acquisition report.',
        summary: [
          'Dividing the research work into three thematic areas',
          'Meeting with the domain expert to validate the rules gathered so far',
          'Starting the preliminary knowledge acquisition report'
        ],
        paragraphs: [
          'During the third week, we focused on organising the research needed to build the system\'s knowledge base. To make this work more structured and efficient, we divided the research into three thematic areas and distributed them among the team members.',
          'The first area focuses on gathering the information needed to characterise the profile of an AI agent, such as its architecture, capabilities, data access, tools and permissions. The second area focuses on researching threats and security controls specific to AI agents. The third area addresses risk assessment and compliance requirements, including the obligations that may apply to the system being assessed. Together, these areas cover the main inputs and conclusions that the expert system will need to reason about.',
          'This week we also held a new meeting with Diogo Gomes, our domain expert. The main goal of the meeting was to validate the rules we had gathered up to that point. His feedback helped us confirm which rules reflect how security professionals actually assess AI systems, and gave us direction for refining the knowledge base in the following stages.',
          'Finally, we started writing the preliminary knowledge acquisition report. This report will document the knowledge gathered from our research and from the meetings with the domain expert, and will serve as the foundation for defining the rules and reasoning processes of the expert system.'
        ]
      },
      {
        id: 'week-04',
        title: 'Week 4 - From Research to Rules',
        period: 'Week 04',
        status: 'Published',
        excerpt: 'The team settled the rules by modelling them as decision flowcharts, completed the preliminary knowledge acquisition report and prepared its presentation.',
        summary: [
          'Modelling the gathered knowledge as decision flowcharts',
          'Completing the preliminary knowledge acquisition report',
          'Preparing the presentation of the project objectives'
        ],
        paragraphs: [
          'During the fourth week, the research carried out in the previous weeks was consolidated into a definitive set of rules. Instead of keeping that knowledge as prose, we represented it as decision flowcharts, which proved to be the form that both the team and the domain expert could read and correct directly.',
          'Each flowchart starts from the description of an agent and asks a sequence of questions about its profile. Every decision point is one question, and the answers determine the paths to analyse, the resulting risk level, and the controls and tests to recommend. Answers that are unknown are deliberately treated as the worst case, so that missing information never produces a false sense of safety.',
          'Five flowcharts were produced. Four of them cover threats: the agent\'s access to sensitive data, memory and context poisoning, prompt injection, and unexpected code execution. The fifth covers compliance with the transparency obligations of the EU AI Act, and differs from the others in that it does not assign a risk level. Each of its branches ends instead in whether an obligation is applicable, not applicable, or undetermined for the system being assessed.',
          'With the rules settled, we completed the preliminary knowledge acquisition report. It documents the sources used, the sessions held with the domain expert, and the representation of the knowledge gathered so far. We also prepared a presentation of the project objectives for the class and the course lecturer.',
          'The knowledge is now in a form that can be formalised. The next stage moves from diagrams to an inference engine, where the rules will be implemented, checked for consistency and refined against what the system actually concludes.'
        ]
      },
      {
        id: 'week-05',
        title: 'Week 5 - From Diagrams to a Working System',
        period: 'Week 05',
        status: 'Published',
        excerpt: 'The team turned the flowcharts into a single shared specification, implemented the same knowledge twice in Prolog and Drools, and built the interface that runs both.',
        summary: [
          'Writing the flowcharts as one shared specification of the rules',
          'Implementing the same knowledge independently in Prolog and in Drools',
          'Revisiting how the system should treat unknown answers'
        ],
        paragraphs: [
          'During the fifth week we moved from diagrams to a working system. The first step was to write the flowcharts as a single shared specification: every question, every decision, every conclusion and every recommendation was given a stable identifier, so that both implementations would describe the same thing and could later be compared element by element.',
          'With that specification in place, the same knowledge was implemented twice, independently. One implementation uses Prolog, where the decision trees are described as facts and the reasoning searches for a proof. The other uses Drools, where each decision and each branch becomes a rule that fires when the conditions hold. Neither implementation reads the shared specification to reach its conclusions, and neither sees the result of the other. Writing the knowledge twice is deliberate: if the two reach the same conclusion by different routes, we have reason to trust it.',
          'Implementing the rules made us revisit one of the decisions taken the week before. We had planned to treat an unknown answer as the worst case, but once the rules were written we saw that this hides the difference between a risk we identified and a risk we simply could not rule out. The system now explores every possibility an unknown answer allows. When they all lead to the same conclusion, it states it. When they do not, the result is reported as inconclusive, with the worst case shown separately and the missing information named.',
          'We also built the interface. It asks about the agent, hides the questions that no longer apply, and presents the two opinions side by side, each with the reasoning that produced it. The system never picks a winner between the two and never merges them.',
          'By the end of the week the system was running end to end. The next stage is to show that it is right, not only that it works.'
        ]
      },
      {
        id: 'week-06',
        title: 'Week 6 - Validation and Delivery',
        period: 'Week 06',
        status: 'Published',
        excerpt: 'The team finished and validated the system, wrote the final report, prepared the pitch, and delivered both the project and the report.',
        summary: [
          'Completing the comparison and the explanations shown to the user',
          'Validating the system against reference scenarios reviewed with the domain expert',
          'Delivering the final project and the final report, and preparing the pitch'
        ],
        paragraphs: [
          'The sixth week was about finishing the system, being able to stand behind it, and delivering it. We completed the part that compares the two opinions and the part that explains them. For every conclusion, the system now shows the path it followed, what to do about it, and what information is missing when an answer was unknown.',
          'Validation was the main effort. We built a set of reference scenarios describing different agents, each with the result we expected for every assessment, and reviewed them with our domain expert. Two different things then had to be checked, and it is worth separating them: whether the two implementations agree with each other, and whether they agree with the expected result. Agreement alone proves nothing: both could share the same mistake. Only the second check tells us the system is right.',
          'Running the scenarios confirmed both: the two implementations reached identical conclusions in every case, and every conclusion matched what we expected. That gave us the confidence to consider the implementation closed and to submit the project.',
          'In parallel, we wrote and delivered the final report, documenting the knowledge gathered, how it was represented, the decisions taken during implementation and what the system deliberately does not do. We were explicit about its limits: it assesses the answers it is given, it does not observe the agent, and it is not a substitute for a formal compliance assessment.',
          'With the project and the report delivered, the remaining work was the pitch. The challenge there is different from writing a report: in a few minutes we have to show why the problem matters, what the system concludes about a real agent, and why the explanation behind the conclusion is as important as the conclusion itself.'
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
          },
          {
            title: 'Week 3 - Building the Knowledge Base',
            date: 'Week 03',
            excerpt: 'The team divided the research work into themes, validated the rules gathered so far with the domain expert and started the preliminary knowledge acquisition report.',
            tags: ['Expert system', 'Knowledge acquisition', 'Rule validation'],
            href: '#/reports/week-03'
          },
          {
            title: 'Week 4 - From Research to Rules',
            date: 'Week 04',
            excerpt: 'The team settled the rules by modelling them as decision flowcharts, completed the preliminary knowledge acquisition report and prepared its presentation.',
            tags: ['Expert system', 'Knowledge representation', 'Decision flowcharts'],
            href: '#/reports/week-04'
          },
          {
            title: 'Week 5 - From Diagrams to a Working System',
            date: 'Week 05',
            excerpt: 'The team turned the flowcharts into a single shared specification, implemented the same knowledge twice in Prolog and Drools, and built the interface that runs both.',
            tags: ['Expert system', 'Prolog', 'Drools'],
            href: '#/reports/week-05'
          },
          {
            title: 'Week 6 - Validation and Delivery',
            date: 'Week 06',
            excerpt: 'The team finished and validated the system, wrote the final report, prepared the pitch, and delivered both the project and the report.',
            tags: ['Validation', 'Final report', 'Delivery', 'Pitch'],
            href: '#/reports/week-06'
          }
        ]
      }
    ]
  };
})();
