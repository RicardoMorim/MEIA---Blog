/* Cairn — router e renderização.
 *
 * O protótipo de design era um único ecrã com estado interno e ligações a "#".
 * Aqui as vistas passam a ter URL próprio, para que uma entrada do diário possa
 * ser partilhada:
 *
 *   #/                                 início
 *   #/challenges                       lista de challenges
 *   #/challenges/:challenge            detalhe de um challenge
 *   #/challenges/:challenge/week-01    uma entrada
 *   #/reports                          relatórios semanais
 *   #/contacts                         contactos
 *
 * O encaminhamento é por fragmento (e não por caminho) para que o site funcione
 * no GitHub Pages sem regras de reescrita nem 404.html.
 */
(function () {
  'use strict';

  var DATA = window.CAIRN;
  var IMG_DIR = 'assets/img/';

  /* Classe de etiqueta por estado do projeto (o mapa `tagFor` do design). */
  var TAG_FOR = {
    'In progress': 'tag tag-accent',
    'Starting soon': 'tag tag-outline',
    'Planned': 'tag tag-neutral'
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

  function numeral(text, current, style) {
    return '<span class="cairn-num' + (current ? ' cairn-num-current' : '') + '"' +
      (style ? ' style="' + style + '"' : '') + '>' + esc(text) + '</span>';
  }

  /* Uma imagem que desaparece quando o ficheiro não existe, deixando à vista a
     moldura vazia em vez do ícone de imagem partida. */
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
    var projects = DATA.projects.map(function (p, pi) {
      var weeks = p.weeks.map(function (w, i) {
        var n = pad2(i + 1);
        return Object.assign({}, w, {
          num: n,
          isLatest: i === p.weeks.length - 1,
          kicker: 'Week ' + n,
          href: '#/challenges/' + p.id + '/week-' + n
        });
      });

      return Object.assign({}, p, {
        weeks: weeks,
        num: pad2(pi + 1),
        tagClass: TAG_FOR[p.status] || 'tag tag-neutral',
        isCurrent: p.status === 'In progress',
        isEmpty: weeks.length === 0,
        entriesLabel: weeks.length === 0
          ? 'No entries'
          : weeks.length + (weeks.length === 1 ? ' entry' : ' entries'),
        range: weeks.length === 0
          ? p.period
          : weeks[0].date + ' — ' + weeks[weeks.length - 1].date,
        href: '#/challenges/' + p.id
      });
    });

    var current = projects.filter(function (p) { return p.status === 'In progress'; })[0] || projects[0];

    var members = DATA.members.map(function (m, i) {
      /* O email é independente do utilizador do GitHub: no ISEP costuma ser o
         número de aluno. Sem `email` no conteúdo, deriva-se do utilizador. */
      var email = m.email || m.user + '@isep.ipp.pt';

      return Object.assign({}, m, {
        photo: memberPhoto(m, i),
        photoAlt: 'Photo of ' + m.name.split(' ')[0],
        email: email,
        mailto: 'mailto:' + email,
        gh: 'https://github.com/' + m.user,
        ghLabel: 'github.com/' + m.user,
        linkedinLabel: m.linkedin
          ? m.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
          : ''
      });
    });

    return {
      projects: projects,
      reports: DATA.reports || [],
      members: members,
      currentProject: current,
      projectCount: projects.length,
      entryCount: projects.reduce(function (n, p) { return n + p.weeks.length; }, 0)
    };
  }

  var MODEL = derive();

  /* ------------------------------------------------------------------ rotas */

  function parseRoute(hash) {
    var path = String(hash || '').replace(/^#/, '').replace(/^\/*/, '').replace(/\/+$/, '');
    if (path === '') return { view: 'home' };
    if (path === 'reports') return { view: 'reports' };
    if (path === 'contacts') return { view: 'contact' };

    var parts = path.split('/');
    if (parts[0] !== 'challenges' && parts[0] !== 'projects') return { view: 'notFound' };
    if (parts.length === 1) return { view: 'projects' };

    var project = MODEL.projects.filter(function (p) { return p.id === parts[1]; })[0];
    if (!project) return { view: 'notFound' };
    if (parts.length === 2) return { view: 'project', project: project };

    var m = /^week-(\d+)$/.exec(parts[2]);
    if (!m || parts.length > 3) return { view: 'notFound' };
    var entry = project.weeks[Number(m[1]) - 1];
    /* Ao contrário do protótipo, uma semana inexistente não cai em silêncio para
       a primeira — num URL partilhado isso esconderia o erro. */
    if (!entry) return { view: 'notFound' };
    return { view: 'entry', project: project, entry: entry };
  }

  /* ------------------------------------------------------------------ vistas */

  function viewHome() {
    return '<div class="cairn-view">' +
      '<section>' +
        '<div style="max-width:720px">' +
          '<h1 style="font-size:clamp(46px,7vw,86px);line-height:0.98;letter-spacing:-0.03em;margin:0 0 var(--space-4);max-width:11ch">Our mission</h1>' +
          '<p style="font-size:19px;line-height:1.5;max-width:56ch;margin:0 0 var(--space-4);text-wrap:pretty">' +
            'We are five students on the MSc in Artificial Intelligence Engineering at ISEP. This blog documents our challenges, weekly progress and reports throughout the academic year.' +
          '</p>' +
          '<div style="display:flex;gap:var(--space-2);flex-wrap:wrap">' +
            '<a class="btn btn-primary" href="#/challenges">See the challenges</a>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section style="margin-top:clamp(56px,8vw,104px)">' +
        '<div style="display:flex;align-items:baseline;gap:var(--space-3);margin-bottom:var(--space-6)">' +
          '<h2 style="font-size:clamp(28px,3.4vw,40px);margin:0;letter-spacing:-0.02em">The team</h2>' +
        '</div>' +
        '<ul style="list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:clamp(20px,3vw,38px)">' +
          MODEL.members.map(function (m) {
            return '<li>' +
              '<figure class="cairn-frame' + (m.photoClean ? ' cairn-frame-zoom' : '') + '" style="margin:0 0 var(--space-3);aspect-ratio:4/5;background:var(--color-surface)">' +
                image(m.photo, m.photoAlt) +
              '</figure>' +
              '<h3 style="font-size:19px;margin:0 0 2px;letter-spacing:-0.01em">' + esc(m.name) + '</h3>' +
              '<p style="margin:0 0 6px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-accent-700)">' + esc(m.role) + '</p>' +
              '<p style="margin:0;font-size:14px;line-height:1.5;color:color-mix(in srgb, var(--color-text) 78%, transparent);text-wrap:pretty">' + esc(m.bio) + '</p>' +
            '</li>';
          }).join('') +
        '</ul>' +
      '</section>' +

      '<section style="margin-top:clamp(56px,8vw,104px)">' +
        '<div style="display:flex;align-items:baseline;gap:var(--space-3);margin-bottom:var(--space-4);flex-wrap:wrap">' +
          '<h2 style="font-size:clamp(28px,3.4vw,40px);margin:0;letter-spacing:-0.02em">Challenges</h2>' +
          '<a href="#/challenges" style="font-size:14px;margin-left:auto">See all →</a>' +
        '</div>' +
        '<ul class="cairn-cards">' +
          MODEL.projects.map(function (p) {
            return '<li>' +
              '<a class="card elev-sm cairn-card" href="' + p.href + '" style="text-decoration:none;color:inherit;height:100%;padding:var(--space-4);gap:var(--space-3)">' +
                '<span style="display:flex;align-items:center;justify-content:space-between;gap:var(--space-2)">' +
                  '<span class="' + p.tagClass + '">' + esc(p.status) + '</span>' +
                  '<span style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:color-mix(in srgb, var(--color-text) 50%, transparent)">' + esc(p.period) + '</span>' +
                '</span>' +
                '<span class="card-title cairn-card-title" style="font-size:23px;line-height:1.15;letter-spacing:-0.015em">' + esc(p.name) + '</span>' +
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
    return '<div class="cairn-view">' +
      '<section style="display:flex;flex-wrap:wrap;gap:clamp(20px,5vw,64px);align-items:flex-end;margin-bottom:clamp(36px,5vw,64px)">' +
        '<h1 style="font-size:clamp(40px,6vw,72px);line-height:1;letter-spacing:-0.03em;margin:0;flex:1 1 300px;min-width:0">Challenges</h1>' +
      '</section>' +
      '<ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column">' +
        MODEL.projects.map(function (p) {
          return '<li style="border-top:1px solid var(--color-divider)">' +
            '<a class="cairn-proj" href="' + p.href + '" style="display:flex;flex-wrap:wrap;gap:var(--space-3) clamp(16px,3vw,40px);align-items:baseline;padding:var(--space-4) var(--space-2);text-decoration:none;color:inherit">' +
              numeral(p.num, p.isCurrent, 'font-size:44px;flex:0 0 auto') +
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
        '<h2 style="font-size:26px;margin:0 0 var(--space-2);letter-spacing:-0.02em">No entries yet</h2>' +
        '<p style="margin:0 0 var(--space-4);font-size:16px;line-height:1.6;color:color-mix(in srgb, var(--color-text) 75%, transparent)">' +
          'The first entry for this challenge will appear here once the work begins.' +
        '</p>' +
        '<a class="btn btn-ghost" href="#/challenges">See the challenges</a>' +
      '</div>';

    return '<div class="cairn-view">' +
      '<a href="#/challenges" style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none">← Challenges</a>' +
      '<section style="display:flex;flex-wrap:wrap;gap:clamp(20px,5vw,64px);align-items:flex-end;margin:var(--space-4) 0 clamp(32px,5vw,56px)">' +
        '<div style="flex:2 1 420px;min-width:0">' +
          '<p style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--color-accent-700);margin:0 0 var(--space-2)">Challenge · ' + esc(p.course) + '</p>' +
          '<h1 style="font-size:clamp(38px,5.6vw,70px);line-height:1;letter-spacing:-0.03em;margin:0 0 var(--space-3);max-width:16ch;text-wrap:balance">' + esc(p.name) + '</h1>' +
          '<p class="cairn-prose" style="margin:0;font-size:18px;line-height:1.55;max-width:56ch">' + esc(p.long) + '</p>' +
        '</div>' +
        '<div style="flex:1 1 220px;min-width:0;display:flex;flex-direction:column;gap:var(--space-3);align-items:flex-start">' +
          '<span class="' + p.tagClass + '">' + esc(p.status) + '</span>' +
        '</div>' +
      '</section>' +

      '<div style="display:flex;align-items:baseline;gap:var(--space-2);padding-bottom:6px;border-bottom:1px solid var(--color-text);margin-bottom:var(--space-6)">' +
        '<span style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase">' + esc(p.entriesLabel) + '</span>' +
        '<span style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:color-mix(in srgb, var(--color-text) 50%, transparent);margin-left:auto">' + esc(p.range) + '</span>' +
      '</div>' +

      empty +

      '<ul class="cairn-cards">' +
        p.weeks.map(function (w) {
          return '<li>' +
            '<a class="card elev-sm cairn-card" href="' + w.href + '" style="text-decoration:none;color:inherit;height:100%;padding:var(--space-4);gap:var(--space-3)">' +
              '<span style="display:flex;align-items:baseline;justify-content:space-between;gap:var(--space-2)">' +
                numeral(w.num, w.isLatest, 'font-size:40px') +
                '<span style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:color-mix(in srgb, var(--color-text) 50%, transparent)">' + esc(w.date) + '</span>' +
              '</span>' +
              '<span class="card-title cairn-card-title" style="font-size:23px;line-height:1.15;letter-spacing:-0.015em">' + esc(w.title) + '</span>' +
              '<p class="card-body" style="font-size:14px;line-height:1.55">' + esc(w.excerpt) + '</p>' +
              '<span style="display:flex;gap:6px;flex-wrap:wrap">' +
                w.tags.map(function (t) { return '<span class="tag tag-accent">' + esc(t) + '</span>'; }).join('') +
              '</span>' +
              '<span style="font-size:13px;color:var(--color-accent-700);font-family:var(--font-heading)">Read the week →</span>' +
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
            '<span style="color:var(--color-accent);font-size:14px;padding-top:3px">▪</span>' +
            '<span>' + esc(it) + '</span>' +
          '</li>';
        }).join('') +
      '</ul>';
    } else if (b.kind === 'figure') {
      body = '<figure>' +
        '<div class="cairn-frame" style="aspect-ratio:16/9;background:var(--color-surface)">' +
          image(figureImage(b), b.alt) +
        '</div>' +
        '<figcaption>' + esc(b.caption) + '</figcaption>' +
      '</figure>';
    } else {
      body = '<p class="cairn-prose" style="margin:0;font-size:17px;line-height:1.62">' + esc(b.text) + '</p>';
    }

    return '<section style="display:flex;flex-wrap:wrap;gap:var(--space-2) clamp(16px,3vw,44px);align-items:flex-start">' +
      '<h2 style="flex:0 1 200px;font-family:var(--font-mono);font-size:11px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;margin:0;color:var(--color-accent-2);padding-top:5px">' + esc(b.title) + '</h2>' +
      '<div style="flex:1 1 320px;min-width:0;max-width:66ch">' + body + '</div>' +
    '</section>';
  }

  function viewEntry(p, entry) {
    return '<article class="cairn-view">' +
      '<a href="' + p.href + '" style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none">← Challenge · ' + esc(p.name) + '</a>' +
      '<header style="margin:var(--space-4) 0 clamp(32px,5vw,56px);display:flex;flex-wrap:wrap;gap:clamp(20px,5vw,64px);align-items:flex-end">' +
        '<div style="flex:2 1 420px;min-width:0">' +
          '<p style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--color-accent-700);margin:0 0 var(--space-2)">' + esc(entry.kicker) + ' · ' + esc(entry.date) + '</p>' +
          '<h1 style="font-size:clamp(36px,5.4vw,66px);line-height:1.02;letter-spacing:-0.03em;margin:0;max-width:18ch;text-wrap:balance">' + esc(entry.title) + '</h1>' +
        '</div>' +
        '<div style="flex:1 1 200px;min-width:0;display:flex;flex-direction:column;gap:var(--space-2);align-items:flex-start">' +
          '<p style="margin:0;font-size:13px;color:color-mix(in srgb, var(--color-text) 60%, transparent)">Written by ' + esc(entry.author) + '</p>' +
          '<span style="display:flex;gap:6px;flex-wrap:wrap">' +
            entry.tags.map(function (t) { return '<span class="tag tag-outline">' + esc(t) + '</span>'; }).join('') +
          '</span>' +
        '</div>' +
      '</header>' +

      '<p style="font-size:clamp(19px,2.1vw,25px);line-height:1.45;max-width:38ch;margin:0 0 clamp(32px,4vw,52px);padding-left:var(--space-4);border-left:2px solid var(--color-accent);color:var(--color-neutral-900)">' + esc(entry.lead) + '</p>' +

      '<div style="display:flex;flex-direction:column;gap:clamp(30px,4vw,48px)">' +
        entry.blocks.map(entryBlock).join('') +
      '</div>' +

      '<footer style="margin-top:clamp(48px,7vw,88px);padding-top:var(--space-4);border-top:1px solid var(--color-text);display:flex;gap:var(--space-3);flex-wrap:wrap;align-items:center">' +
        '<a class="btn btn-ghost" href="' + p.href + '">Back to the challenge</a>' +
      '</footer>' +
    '</article>';
  }

  function viewReports() {
    return '<div class="cairn-view">' +
      '<section style="display:flex;flex-wrap:wrap;gap:clamp(20px,5vw,64px);align-items:flex-end;margin-bottom:clamp(36px,5vw,64px)">' +
        '<h1 style="font-size:clamp(40px,6vw,72px);line-height:1;letter-spacing:-0.03em;margin:0;flex:1 1 300px;min-width:0">Reports</h1>' +
      '</section>' +
      '<ul class="cairn-cards">' +
        MODEL.reports.map(function (report, i) {
          return '<li>' +
            '<article class="card elev-sm" style="height:100%;padding:var(--space-4);gap:var(--space-3)">' +
              '<span style="display:flex;align-items:center;justify-content:space-between;gap:var(--space-2)">' +
                numeral(pad2(i + 1), false, 'font-size:40px') +
                '<span class="tag tag-outline">' + esc(report.status) + '</span>' +
              '</span>' +
              '<h2 class="card-title" style="font-size:23px;line-height:1.15;letter-spacing:-0.015em;margin:0">' + esc(report.title) + '</h2>' +
              '<p class="card-body" style="font-size:14px;line-height:1.55">' + esc(report.summary) + '</p>' +
              '<span style="font-family:var(--font-mono);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-accent-2)">' + esc(report.period) + ' · Coming soon</span>' +
            '</article>' +
          '</li>';
        }).join('') +
      '</ul>' +
    '</div>';
  }

  function viewContact() {
    return '<div class="cairn-view">' +
      '<h1 style="font-size:clamp(40px,6vw,72px);line-height:1;letter-spacing:-0.03em;margin:0 0 clamp(36px,5vw,64px)">Contacts</h1>' +
      '<ul style="list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:var(--space-6) clamp(24px,4vw,56px)">' +
        MODEL.members.map(function (m) {
          return '<li>' +
            '<h3 style="font-size:20px;margin:0 0 2px">' + esc(m.name) + '</h3>' +
            '<p style="margin:0 0 var(--space-2);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-accent-700)">' + esc(m.role) + '</p>' +
            '<p style="margin:0;font-size:15px;line-height:1.6">' +
              '<a href="' + esc(m.mailto) + '">' + esc(m.email) + '</a><br>' +
              '<a href="' + esc(m.gh) + '" target="_blank" rel="noreferrer">' + esc(m.ghLabel) + '</a>' +
              (m.linkedin
                ? '<br><a href="' + esc(m.linkedin) + '" target="_blank" rel="noreferrer">' + esc(m.linkedinLabel) + '</a>'
                : '') +
            '</p>' +
          '</li>';
        }).join('') +
      '</ul>' +
      '<div style="margin-top:clamp(48px,7vw,88px);padding-top:var(--space-4);border-top:1px solid var(--color-text)">' +
        '<p style="margin:0;font-size:15px;line-height:1.6"><strong style="font-family:var(--font-heading)">ISEP</strong><br>Rua Dr. António Bernardino de Almeida, 431<br>4249-015 Porto</p>' +
      '</div>' +
    '</div>';
  }

  /* O protótipo não tinha esta vista: com URL próprio por entrada passa a ser
     possível chegar a um endereço que já não existe. */
  function viewNotFound() {
    return '<div class="cairn-view" style="padding:clamp(32px,6vw,72px) 0;max-width:46ch">' +
      '<p style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--color-accent-700);margin:0 0 var(--space-3)">Page not found</p>' +
      '<h1 style="font-size:clamp(36px,5vw,60px);line-height:1;letter-spacing:-0.03em;margin:0 0 var(--space-3)">This entry does not exist</h1>' +
      '<p style="margin:0 0 var(--space-4);font-size:17px;line-height:1.6;color:color-mix(in srgb, var(--color-text) 75%, transparent)">' +
        'The link may be wrong, or the entry has not been written yet. Visit Challenges or Reports to see what is available.' +
      '</p>' +
      '<div style="display:flex;gap:var(--space-2);flex-wrap:wrap">' +
        '<a class="btn btn-primary" href="#/challenges">See the challenges</a>' +
        '<a class="btn btn-ghost" href="#/">Back to the start</a>' +
      '</div>' +
    '</div>';
  }

  /* ------------------------------------------------------------ renderização */

  var TITLES = {
    home: 'Cairn — Project blog · MEIA ISEP',
    projects: 'Challenges — Cairn',
    reports: 'Reports — Cairn',
    contact: 'Contacts — Cairn',
    notFound: 'Page not found — Cairn'
  };

  function navMarkup(view) {
    /* "Challenges" fica marcado em toda a secção do trabalho. */
    var onProjects = (view === 'projects' || view === 'project' || view === 'entry');
    var link = function (href, label, active) {
      return '<a href="' + href + '"' + (active ? ' aria-current="page"' : '') +
        ' style="font-size:14px;text-decoration:none;color:inherit">' + label + '</a>';
    };
    return link('#/', 'Home', view === 'home') +
      link('#/challenges', 'Challenges', onProjects) +
      link('#/reports', 'Reports', view === 'reports') +
      link('#/contacts', 'Contacts', view === 'contact');
  }

  function render(firstPaint) {
    var route = parseRoute(location.hash);
    var body;

    switch (route.view) {
      case 'projects': body = viewProjects(); break;
      case 'project': body = viewProject(route.project); break;
      case 'entry': body = viewEntry(route.project, route.entry); break;
      case 'reports': body = viewReports(); break;
      case 'contact': body = viewContact(); break;
      case 'notFound': body = viewNotFound(); break;
      default: body = viewHome();
    }

    document.getElementById('cairn-nav').innerHTML = navMarkup(route.view);
    var main = document.getElementById('cairn-main');
    main.innerHTML = body;

    document.title = route.view === 'entry'
      ? route.entry.title + ' — ' + route.project.name + ' · Cairn'
      : route.view === 'project'
        ? route.project.name + ' — Cairn'
        : TITLES[route.view];

    Array.prototype.forEach.call(main.querySelectorAll('img[data-optional]'), function (img) {
      img.addEventListener('error', function () { img.style.display = 'none'; });
    });

    if (firstPaint) return;

    /* A vista trocou sem que a página recarregasse: sem mover o foco, quem usa
       leitor de ecrã continua no elemento anterior e não é avisado de nada. */
    var heading = main.querySelector('h1');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }

    var reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduzido ? 'auto' : 'smooth' });
  }

  window.addEventListener('hashchange', function () { render(false); });
  render(true);
})();
