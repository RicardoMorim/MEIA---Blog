/* Cifra — router e renderização.
 *
 * O protótipo de design era um único ecrã com estado interno e ligações a "#".
 * Aqui as vistas passam a ter URL próprio, para que uma entrada do diário possa
 * ser partilhada:
 *
 *   #/                                  início
 *   #/projetos                          lista de projetos
 *   #/projetos/:projeto                 diário de um projeto
 *   #/projetos/:projeto/semana-01       uma entrada
 *   #/contactos                         contactos
 *
 * O encaminhamento é por fragmento (e não por caminho) para que o site funcione
 * no GitHub Pages sem regras de reescrita nem 404.html.
 */
(function () {
  'use strict';

  var DATA = window.CIFRA;
  var IMG_DIR = 'assets/img/';

  /* Classe de etiqueta por estado do projeto (o mapa `tagFor` do design). */
  var TAG_FOR = {
    'A decorrer': 'tag tag-accent',
    'Por arrancar': 'tag tag-outline',
    'Planeado': 'tag tag-neutral'
  };

  /* ---------------------------------------------------------------- helpers */

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function pad2(n) {
    return String(n).length < 2 ? '0' + n : String(n);
  }

  /* As construções de chapa (.cmyk-head, .cmyk-num) repetem o mesmo texto quatro
     vezes: o papel, que é o que a leitura assistiva encontra, e três chapas de
     processo escondidas. */
  function plates(className, text, style) {
    var t = esc(text);
    return '<span class="' + className + '"' + (style ? ' style="' + style + '"' : '') + '>' +
      '<span class="paper">' + t + '</span>' +
      '<span class="plate plate-c" aria-hidden="true">' + t + '</span>' +
      '<span class="plate plate-m" aria-hidden="true">' + t + '</span>' +
      '<span class="plate plate-y" aria-hidden="true">' + t + '</span>' +
      '</span>';
  }

  /* Uma imagem que desaparece quando o ficheiro não existe, deixando à vista a
     caixa de papel que o design já desenha por baixo. */
  function image(src, alt) {
    return '<img data-optional src="' + esc(src) + '" alt="' + esc(alt) + '" ' +
      'loading="lazy" style="width:100%;height:100%;object-fit:cover">';
  }

  function memberPhoto(member, index) {
    return member.photo || IMG_DIR + 'membro-' + (index + 1) + '.jpg';
  }

  function figureImage(block) {
    return block.src || IMG_DIR + block.slot + '.png';
  }

  /* ------------------------------------------------------------- derivação */

  /* Porta de `renderVals()` do design: tudo o que as vistas mostram é calculado
     aqui uma vez, a partir do conteúdo em bruto. */
  function derive() {
    var org = DATA.githubOrg;

    var projects = DATA.projects.map(function (p, pi) {
      var repoName = p.repo.split('/')[1];
      var repoLabel = org + '/' + repoName;
      var repoUrl = 'https://github.com/' + repoLabel;

      var weeks = p.weeks.map(function (w, i) {
        var n = pad2(i + 1);
        return Object.assign({}, w, {
          num: n,
          kicker: 'Semana ' + n,
          commits: repoUrl + '/commits/main',
          href: '#/projetos/' + p.id + '/semana-' + n
        });
      });

      return Object.assign({}, p, {
        weeks: weeks,
        repoLabel: repoLabel,
        repoUrl: repoUrl,
        num: pad2(pi + 1),
        tagClass: TAG_FOR[p.status] || 'tag tag-neutral',
        isEmpty: weeks.length === 0,
        entriesLabel: weeks.length === 0
          ? 'Sem entradas'
          : weeks.length + (weeks.length === 1 ? ' entrada' : ' entradas'),
        range: weeks.length === 0
          ? p.period
          : weeks[0].date + ' — ' + weeks[weeks.length - 1].date,
        href: '#/projetos/' + p.id
      });
    });

    var current = projects.filter(function (p) { return p.status === 'A decorrer'; })[0] || projects[0];

    var members = DATA.members.map(function (m, i) {
      return Object.assign({}, m, {
        photo: memberPhoto(m, i),
        photoAlt: 'Foto de ' + m.name.split(' ')[0],
        email: m.user + '@isep.ipp.pt',
        mailto: 'mailto:' + m.user + '@isep.ipp.pt',
        gh: 'https://github.com/' + m.user,
        ghLabel: 'github.com/' + m.user
      });
    });

    return {
      projects: projects,
      members: members,
      currentProject: current,
      projectCount: projects.length,
      entryCount: projects.reduce(function (n, p) { return n + p.weeks.length; }, 0),
      edition: 'Atualizado a ' + (current.weeks.length
        ? current.weeks[current.weeks.length - 1].date
        : current.period)
    };
  }

  var MODEL = derive();

  /* ------------------------------------------------------------------ rotas */

  function parseRoute(hash) {
    var path = String(hash || '').replace(/^#/, '').replace(/^\/*/, '').replace(/\/+$/, '');
    if (path === '') return { view: 'home' };
    if (path === 'contactos') return { view: 'contact' };

    var parts = path.split('/');
    if (parts[0] !== 'projetos') return { view: 'notFound' };
    if (parts.length === 1) return { view: 'projects' };

    var project = MODEL.projects.filter(function (p) { return p.id === parts[1]; })[0];
    if (!project) return { view: 'notFound' };
    if (parts.length === 2) return { view: 'project', project: project };

    var m = /^semana-(\d+)$/.exec(parts[2]);
    if (!m || parts.length > 3) return { view: 'notFound' };
    var entry = project.weeks[Number(m[1]) - 1];
    /* Ao contrário do protótipo, uma semana inexistente não cai em silêncio para
       a primeira — num URL partilhado isso esconderia o erro. */
    if (!entry) return { view: 'notFound' };
    return { view: 'entry', project: project, entry: entry };
  }

  /* ------------------------------------------------------------------ vistas */

  function viewHome() {
    var stat = function (label, value, small) {
      return '<div>' +
        '<dt style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:color-mix(in srgb, var(--color-text) 55%, transparent);margin-bottom:4px">' + label + '</dt>' +
        '<dd style="margin:0;' + (small
          ? 'font-size:15px;line-height:1.35'
          : 'font-family:var(--font-heading);font-size:34px;line-height:1') + '">' + value + '</dd>' +
        '</div>';
    };

    return '<div class="cifra-view">' +
      '<section style="display:flex;flex-wrap:wrap;gap:clamp(24px,5vw,64px);align-items:flex-end">' +
        '<div style="flex:1 1 420px;min-width:0">' +
          '<p style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--color-accent-700);margin:0 0 var(--space-3)">Cinco alunos · um ano · vários projetos</p>' +
          '<h1 class="cmyk-head" style="font-size:clamp(46px,7vw,86px);line-height:0.98;letter-spacing:-0.03em;margin:0 0 var(--space-4);max-width:11ch">' +
            '<span class="paper">Diário de bordo</span>' +
            '<span class="plate plate-c" aria-hidden="true">Diário de bordo</span>' +
            '<span class="plate plate-m" aria-hidden="true">Diário de bordo</span>' +
            '<span class="plate plate-y" aria-hidden="true">Diário de bordo</span>' +
          '</h1>' +
          '<p style="font-size:19px;line-height:1.5;max-width:56ch;margin:0 0 var(--space-4);text-wrap:pretty">' +
            'Somos cinco alunos do Mestrado em Engenharia de Inteligência Artificial do ISEP. Cada projeto que fazemos tem aqui o seu próprio diário — uma entrada por semana — e o seu próprio repositório no GitHub.' +
          '</p>' +
          '<div style="display:flex;gap:var(--space-2);flex-wrap:wrap">' +
            '<a class="btn btn-primary" href="#/projetos">Ver os projetos</a>' +
            '<a class="btn btn-secondary" href="' + esc(MODEL.currentProject.repoUrl) + '" target="_blank" rel="noreferrer">Projeto atual no GitHub ↗</a>' +
          '</div>' +
        '</div>' +
        '<dl style="margin:0;flex:1 1 260px;min-width:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:var(--space-4) var(--space-3);align-self:flex-end;padding-bottom:6px">' +
          stat('Projetos', MODEL.projectCount) +
          stat('Entradas escritas', MODEL.entryCount) +
          stat('A decorrer', esc(MODEL.currentProject.name), true) +
          stat('Ano letivo', '2025/26<br>DEI — ISEP', true) +
        '</dl>' +
      '</section>' +

      '<section style="margin-top:clamp(56px,8vw,104px)">' +
        '<div style="display:flex;align-items:baseline;gap:var(--space-3);margin-bottom:var(--space-6)">' +
          '<h2 style="font-size:clamp(28px,3.4vw,40px);margin:0;letter-spacing:-0.02em">A equipa</h2>' +
          '<span style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:color-mix(in srgb, var(--color-text) 50%, transparent)">cinco pessoas, cinco frentes</span>' +
        '</div>' +
        '<ul style="list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:clamp(20px,3vw,38px)">' +
          MODEL.members.map(function (m) {
            return '<li>' +
              '<figure class="' + (m.photoClean ? 'cifra-member-photo cifra-member-photo-clean' : 'halftone') + '" style="margin:0 0 var(--space-3);aspect-ratio:4/5;background:var(--color-surface)">' +
                image(m.photo, m.photoAlt) +
              '</figure>' +
              '<div style="display:flex;align-items:center;gap:var(--space-1);margin:0 0 2px">' +
                '<h3 style="font-size:19px;margin:0;letter-spacing:-0.01em">' + esc(m.name) + '</h3>' +
                (m.linkedin
                  ? '<a class="cifra-linkedin" href="' + esc(m.linkedin) + '" target="_blank" rel="noreferrer" aria-label="LinkedIn de ' + esc(m.name) + '" title="LinkedIn de ' + esc(m.name) + '"><span aria-hidden="true">in</span></a>'
                  : '') +
              '</div>' +
              '<p style="margin:0 0 6px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-accent-700)">' + esc(m.role) + '</p>' +
              '<p style="margin:0;font-size:14px;line-height:1.5;color:color-mix(in srgb, var(--color-text) 78%, transparent);text-wrap:pretty">' + esc(m.bio) + '</p>' +
            '</li>';
          }).join('') +
        '</ul>' +
      '</section>' +

      '<section style="margin-top:clamp(56px,8vw,104px)">' +
        '<div style="display:flex;align-items:baseline;gap:var(--space-3);margin-bottom:var(--space-4);flex-wrap:wrap">' +
          '<h2 style="font-size:clamp(28px,3.4vw,40px);margin:0;letter-spacing:-0.02em">Projetos</h2>' +
          '<a href="#/projetos" style="font-size:14px;margin-left:auto">Ver todos →</a>' +
        '</div>' +
        '<ul style="list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(18px,2.4vw,28px)">' +
          MODEL.projects.map(function (p) {
            return '<li>' +
              '<a class="card elev-sm cifra-card" href="' + p.href + '" style="text-decoration:none;color:inherit;height:100%;padding:var(--space-4);gap:var(--space-3)">' +
                '<span style="display:flex;align-items:center;justify-content:space-between;gap:var(--space-2)">' +
                  '<span class="' + p.tagClass + '">' + esc(p.status) + '</span>' +
                  '<span style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:color-mix(in srgb, var(--color-text) 50%, transparent)">' + esc(p.period) + '</span>' +
                '</span>' +
                '<span class="card-title cifra-card-title" style="font-size:23px;line-height:1.15;letter-spacing:-0.015em">' + esc(p.name) + '</span>' +
                '<p class="card-body" style="font-size:14px;line-height:1.55">' + esc(p.short) + '</p>' +
                '<span style="font-size:13px;color:var(--color-accent-700);font-family:var(--font-heading)">' + esc(p.entriesLabel) + ' →</span>' +
              '</a>' +
            '</li>';
          }).join('') +
        '</ul>' +
      '</section>' +
    '</div>';
  }

  function viewProjects() {
    return '<div class="cifra-view">' +
      '<section style="display:flex;flex-wrap:wrap;gap:clamp(20px,5vw,64px);align-items:flex-end;margin-bottom:clamp(36px,5vw,64px)">' +
        '<h1 style="font-size:clamp(40px,6vw,72px);line-height:1;letter-spacing:-0.03em;margin:0;flex:1 1 300px;min-width:0">Projetos</h1>' +
        '<p style="margin:0;flex:1 1 280px;min-width:0;font-size:16px;line-height:1.55;max-width:46ch;color:color-mix(in srgb, var(--color-text) 80%, transparent)">' +
          'Cada projeto tem o seu repositório e o seu diário semanal, independentes um do outro. Escolhe um para entrar no diário.' +
        '</p>' +
      '</section>' +
      '<ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column">' +
        MODEL.projects.map(function (p) {
          return '<li style="border-top:1px solid var(--color-divider)">' +
            '<a class="cifra-proj" href="' + p.href + '" style="display:flex;flex-wrap:wrap;gap:var(--space-3) clamp(16px,3vw,40px);align-items:baseline;padding:var(--space-4) var(--space-2);text-decoration:none;color:inherit">' +
              plates('cmyk-num', p.num, 'font-family:var(--font-heading);font-size:44px;flex:0 0 auto') +
              '<span style="flex:3 1 240px;min-width:0">' +
                '<span style="display:block;font-family:var(--font-heading);font-size:clamp(22px,2.6vw,30px);line-height:1.15;letter-spacing:-0.02em">' + esc(p.name) + '</span>' +
                '<span style="display:block;margin-top:6px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-accent-700)">' + esc(p.course) + '</span>' +
              '</span>' +
              '<span style="flex:2 1 220px;min-width:0;font-size:15px;line-height:1.5;color:color-mix(in srgb, var(--color-text) 78%, transparent)">' + esc(p.short) + '</span>' +
              '<span style="flex:0 0 auto;margin-left:auto;text-align:right;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;white-space:nowrap">' + esc(p.entriesLabel) + '<br>' +
                '<span style="color:color-mix(in srgb, var(--color-text) 50%, transparent)">' + esc(p.period) + '</span>' +
              '</span>' +
            '</a>' +
          '</li>';
        }).join('') +
      '</ul>' +
      '<div style="border-top:1px solid var(--color-text)"></div>' +
    '</div>';
  }

  function viewProject(p) {
    var empty = !p.isEmpty ? '' :
      '<div style="padding:clamp(32px,6vw,72px) 0;max-width:46ch">' +
        '<h2 style="font-size:26px;margin:0 0 var(--space-2);letter-spacing:-0.02em">Ainda sem entradas</h2>' +
        '<p style="margin:0 0 var(--space-4);font-size:16px;line-height:1.6;color:color-mix(in srgb, var(--color-text) 75%, transparent)">' +
          'O projeto arranca em ' + esc(p.period) + '. A primeira entrada aparece aqui no fim da primeira semana de trabalho.' +
        '</p>' +
        '<a class="btn btn-ghost" href="#/projetos">Ver os outros projetos</a>' +
      '</div>';

    return '<div class="cifra-view">' +
      '<a href="#/projetos" style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none">← Projetos</a>' +
      '<section style="display:flex;flex-wrap:wrap;gap:clamp(20px,5vw,64px);align-items:flex-end;margin:var(--space-4) 0 clamp(32px,5vw,56px)">' +
        '<div style="flex:2 1 420px;min-width:0">' +
          '<p style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--color-accent-700);margin:0 0 var(--space-2)">Diário · ' + esc(p.course) + '</p>' +
          '<h1 style="font-size:clamp(38px,5.6vw,70px);line-height:1;letter-spacing:-0.03em;margin:0 0 var(--space-3);max-width:16ch;text-wrap:balance">' + esc(p.name) + '</h1>' +
          '<p style="margin:0;font-size:18px;line-height:1.55;max-width:56ch;text-wrap:pretty">' + esc(p.long) + '</p>' +
        '</div>' +
        '<div style="flex:1 1 220px;min-width:0;display:flex;flex-direction:column;gap:var(--space-3);align-items:flex-start">' +
          '<span class="' + p.tagClass + '">' + esc(p.status) + '</span>' +
          '<a class="btn btn-secondary" href="' + esc(p.repoUrl) + '" target="_blank" rel="noreferrer">' + esc(p.repoLabel) + ' ↗</a>' +
        '</div>' +
      '</section>' +

      '<div style="display:flex;align-items:baseline;gap:var(--space-2);padding-bottom:6px;border-bottom:1px solid var(--color-text);margin-bottom:var(--space-6)">' +
        '<span style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase">' + esc(p.entriesLabel) + '</span>' +
        '<span style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:color-mix(in srgb, var(--color-text) 50%, transparent);margin-left:auto">' + esc(p.range) + '</span>' +
      '</div>' +

      empty +

      '<ul style="list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(18px,2.4vw,28px)">' +
        p.weeks.map(function (w) {
          return '<li>' +
            '<a class="card elev-sm cifra-card" href="' + w.href + '" style="text-decoration:none;color:inherit;height:100%;padding:var(--space-4);gap:var(--space-3)">' +
              '<span style="display:flex;align-items:baseline;justify-content:space-between;gap:var(--space-2)">' +
                /* A chapa numérica assenta sobre o cartão, não sobre o papel da
                   página: sem este fundo próprio ficaria com um halo branco. */
                plates('cmyk-num', w.num, 'font-family:var(--font-heading);font-size:40px;--cmyk-num-ground:var(--color-surface)') +
                '<span style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:color-mix(in srgb, var(--color-text) 50%, transparent)">' + esc(w.date) + '</span>' +
              '</span>' +
              '<span class="card-title cifra-card-title" style="font-size:23px;line-height:1.15;letter-spacing:-0.015em">' + esc(w.title) + '</span>' +
              '<p class="card-body" style="font-size:14px;line-height:1.55">' + esc(w.excerpt) + '</p>' +
              '<span style="display:flex;gap:6px;flex-wrap:wrap">' +
                w.tags.map(function (t) { return '<span class="tag tag-accent">' + esc(t) + '</span>'; }).join('') +
              '</span>' +
              '<span style="font-size:13px;color:var(--color-accent-700);font-family:var(--font-heading)">Ler a semana →</span>' +
            '</a>' +
          '</li>';
        }).join('') +
      '</ul>' +
    '</div>';
  }

  function entryBlock(b) {
    var body;
    if (b.kind === 'list') {
      body = '<ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:var(--space-2)">' +
        b.items.map(function (it) {
          return '<li style="display:grid;grid-template-columns:18px minmax(0,1fr);gap:var(--space-2);font-size:17px;line-height:1.55">' +
            '<span style="color:var(--color-accent-2);font-size:14px;padding-top:3px">▪</span>' +
            '<span>' + esc(it) + '</span>' +
          '</li>';
        }).join('') +
      '</ul>';
    } else if (b.kind === 'figure') {
      body = '<figure>' +
        '<div class="halftone" style="aspect-ratio:16/9;background:var(--color-surface)">' +
          image(figureImage(b), b.alt) +
        '</div>' +
        '<figcaption>' + esc(b.caption) + '</figcaption>' +
      '</figure>';
    } else {
      body = '<p style="margin:0;font-size:17px;line-height:1.62;text-wrap:pretty">' + esc(b.text) + '</p>';
    }

    return '<section style="display:flex;flex-wrap:wrap;gap:var(--space-2) clamp(16px,3vw,44px);align-items:flex-start">' +
      '<h2 style="flex:0 1 200px;font-size:16px;letter-spacing:0.1em;text-transform:uppercase;margin:0;color:color-mix(in srgb, var(--color-text) 62%, transparent);padding-top:5px">' + esc(b.title) + '</h2>' +
      '<div style="flex:1 1 320px;min-width:0;max-width:66ch">' + body + '</div>' +
    '</section>';
  }

  function viewEntry(p, entry) {
    return '<article class="cifra-view">' +
      '<a href="' + p.href + '" style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none">← Diário · ' + esc(p.name) + '</a>' +
      '<header style="margin:var(--space-4) 0 clamp(32px,5vw,56px);display:flex;flex-wrap:wrap;gap:clamp(20px,5vw,64px);align-items:flex-end">' +
        '<div style="flex:2 1 420px;min-width:0">' +
          '<p style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--color-accent-700);margin:0 0 var(--space-2)">' + esc(entry.kicker) + ' · ' + esc(entry.date) + '</p>' +
          '<h1 style="font-size:clamp(36px,5.4vw,66px);line-height:1.02;letter-spacing:-0.03em;margin:0;max-width:18ch;text-wrap:balance">' + esc(entry.title) + '</h1>' +
        '</div>' +
        '<div style="flex:1 1 200px;min-width:0;display:flex;flex-direction:column;gap:var(--space-2);align-items:flex-start">' +
          '<p style="margin:0;font-size:13px;color:color-mix(in srgb, var(--color-text) 60%, transparent)">Escrito por ' + esc(entry.author) + '</p>' +
          '<span style="display:flex;gap:6px;flex-wrap:wrap">' +
            entry.tags.map(function (t) { return '<span class="tag tag-outline">' + esc(t) + '</span>'; }).join('') +
          '</span>' +
        '</div>' +
      '</header>' +

      '<p style="font-size:clamp(19px,2.1vw,25px);line-height:1.5;max-width:34ch;font-style:italic;margin:0 0 clamp(32px,4vw,52px);color:var(--color-neutral-900)">' + esc(entry.lead) + '</p>' +

      '<div style="display:flex;flex-direction:column;gap:clamp(30px,4vw,48px)">' +
        entry.blocks.map(entryBlock).join('') +
      '</div>' +

      '<footer style="margin-top:clamp(48px,7vw,88px);padding-top:var(--space-4);border-top:1px solid var(--color-text);display:flex;gap:var(--space-3);flex-wrap:wrap;align-items:center">' +
        '<a class="btn btn-secondary" href="' + esc(entry.commits) + '" target="_blank" rel="noreferrer">Commits desta semana ↗</a>' +
        '<a class="btn btn-ghost" href="' + p.href + '">Voltar ao diário</a>' +
      '</footer>' +
    '</article>';
  }

  function viewContact() {
    return '<div class="cifra-view">' +
      '<h1 style="font-size:clamp(40px,6vw,72px);line-height:1;letter-spacing:-0.03em;margin:0 0 var(--space-4)">Contactos</h1>' +
      '<p style="font-size:18px;line-height:1.55;max-width:50ch;margin:0 0 clamp(36px,5vw,64px);color:color-mix(in srgb, var(--color-text) 80%, transparent)">' +
        'Dúvidas, ideias, datasets para partilhar ou vontade de nos dizer que a nossa arquitetura está errada — escreve para qualquer um de nós.' +
      '</p>' +
      '<ul style="list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:var(--space-6) clamp(24px,4vw,56px)">' +
        MODEL.members.map(function (m) {
          return '<li>' +
            '<h3 style="font-size:20px;margin:0 0 2px">' + esc(m.name) + '</h3>' +
            '<p style="margin:0 0 var(--space-2);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-accent-700)">' + esc(m.role) + '</p>' +
            '<p style="margin:0;font-size:15px;line-height:1.6">' +
              '<a href="' + esc(m.mailto) + '">' + esc(m.email) + '</a><br>' +
              '<a href="' + esc(m.gh) + '" target="_blank" rel="noreferrer">' + esc(m.ghLabel) + '</a>' +
            '</p>' +
          '</li>';
        }).join('') +
      '</ul>' +
      '<div style="margin-top:clamp(48px,7vw,88px);padding-top:var(--space-4);border-top:1px solid var(--color-text)">' +
        '<h2 style="font-size:24px;margin:0 0 var(--space-3);letter-spacing:-0.02em">Repositórios</h2>' +
        '<ul style="list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:var(--space-3) clamp(24px,4vw,56px);font-size:15px;line-height:1.6">' +
          MODEL.projects.map(function (p) {
            return '<li>' +
              '<span style="display:block;font-family:var(--font-heading)">' + esc(p.name) + '</span>' +
              '<a href="' + esc(p.repoUrl) + '" target="_blank" rel="noreferrer">' + esc(p.repoLabel) + ' ↗</a>' +
            '</li>';
          }).join('') +
        '</ul>' +
        '<p style="margin:var(--space-6) 0 0;font-size:15px;line-height:1.6"><strong style="font-family:var(--font-heading)">ISEP</strong><br>Rua Dr. António Bernardino de Almeida, 431<br>4249-015 Porto</p>' +
      '</div>' +
    '</div>';
  }

  /* O protótipo não tinha esta vista: com URL próprio por entrada passa a ser
     possível chegar a um endereço que já não existe. */
  function viewNotFound() {
    return '<div class="cifra-view" style="padding:clamp(32px,6vw,72px) 0;max-width:46ch">' +
      '<p style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--color-accent-700);margin:0 0 var(--space-3)">Página não encontrada</p>' +
      '<h1 style="font-size:clamp(36px,5vw,60px);line-height:1;letter-spacing:-0.03em;margin:0 0 var(--space-3)">Esta entrada não existe</h1>' +
      '<p style="margin:0 0 var(--space-4);font-size:17px;line-height:1.6;color:color-mix(in srgb, var(--color-text) 75%, transparent)">' +
        'A ligação pode estar errada ou a entrada ainda não foi escrita. O diário de cada projeto tem a lista completa.' +
      '</p>' +
      '<div style="display:flex;gap:var(--space-2);flex-wrap:wrap">' +
        '<a class="btn btn-primary" href="#/projetos">Ver os projetos</a>' +
        '<a class="btn btn-ghost" href="#/">Voltar ao início</a>' +
      '</div>' +
    '</div>';
  }

  /* ------------------------------------------------------------ renderização */

  var TITLES = {
    home: 'Cifra — Diário de projetos · MEIA ISEP',
    projects: 'Projetos — Cifra',
    contact: 'Contactos — Cifra',
    notFound: 'Página não encontrada — Cifra'
  };

  function navMarkup(view) {
    /* "Projetos" fica marcado em toda a secção do diário, como no design. */
    var onProjects = (view === 'projects' || view === 'project' || view === 'entry');
    var link = function (href, label, active) {
      return '<a href="' + href + '"' + (active ? ' aria-current="page"' : '') +
        ' style="font-size:14px;text-decoration:none;color:inherit">' + label + '</a>';
    };
    return link('#/', 'Início', view === 'home') +
      link('#/projetos', 'Projetos', onProjects) +
      link('#/contactos', 'Contactos', view === 'contact');
  }

  function render(firstPaint) {
    var route = parseRoute(location.hash);
    var body;

    switch (route.view) {
      case 'projects': body = viewProjects(); break;
      case 'project': body = viewProject(route.project); break;
      case 'entry': body = viewEntry(route.project, route.entry); break;
      case 'contact': body = viewContact(); break;
      case 'notFound': body = viewNotFound(); break;
      default: body = viewHome();
    }

    document.getElementById('cifra-nav').innerHTML = navMarkup(route.view);
    document.getElementById('cifra-edition').textContent = MODEL.edition;

    var main = document.getElementById('cifra-main');
    main.innerHTML = body;

    document.title = route.view === 'entry'
      ? route.entry.title + ' — ' + route.project.name + ' · Cifra'
      : route.view === 'project'
        ? route.project.name + ' — Cifra'
        : TITLES[route.view];

    Array.prototype.forEach.call(main.querySelectorAll('img[data-optional]'), function (img) {
      img.addEventListener('error', function () { img.style.display = 'none'; });
    });

    if (!firstPaint) window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.addEventListener('hashchange', function () { render(false); });
  render(true);
})();
