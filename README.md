# Cairn — diário de projetos

Blogue de projetos de cinco alunos do **Mestrado em Engenharia de Inteligência
Artificial do ISEP**. Cada projeto tem o seu diário semanal e o seu repositório.

Site estático: HTML, CSS e JavaScript simples. **Sem build, sem dependências,
sem instalação.** Abre no GitHub Pages tal como está.

## Língua

**O site é escrito em inglês.** Os comentários do código e este README ficam em
português — o site é para fora, o código é para nós.

## Correr localmente

Qualquer servidor estático serve. Os `<script>` não correm em `file://`, por isso
não basta abrir o `index.html` com duplo clique:

```bash
python -m http.server 8123 --bind 127.0.0.1
```

Depois abre <http://127.0.0.1:8123>.

O `--bind` não é decorativo: sem ele o Python escuta em todas as interfaces e
imprime `http://[::]:8123/`, que **não é um endereço navegável** — clicar nele dá
`ERR_ADDRESS_INVALID`. E deixa o site acessível a quem estiver na mesma rede.

## Estrutura

| Caminho | O que é |
| --- | --- |
| `index.html` | A moldura da página: cabeçalho, filetes, linha de data, rodapé. Não tem conteúdo. |
| `assets/js/content.js` | **O conteúdo.** É o único ficheiro a editar para publicar. |
| `assets/js/app.js` | Encaminhamento e renderização das vistas. |
| `assets/css/cairn.css` | **A aparência toda**: tokens de cor, tipo e espaçamento, e os componentes. |
| `assets/img/` | Fotografias, diagramas, favicon e imagem de partilha. Ver o README lá dentro. |

## Endereços

O encaminhamento é por fragmento (`#/…`) para o GitHub Pages funcionar sem regras
de reescrita. Cada entrada tem endereço próprio e pode ser partilhada:

```
#/                               início
#/projects                       lista de projetos
#/projects/cairn-ids             diário de um projeto
#/projects/cairn-ids/week-03     uma entrada
#/contacts                       contactos
```

Um projeto ou semana que não exista mostra uma página de "não encontrado" — não
cai em silêncio para a primeira entrada.

## Publicar uma entrada semanal

Abre `assets/js/content.js` e junta um objeto ao array `weeks` do projeto. **A
ordem do array é a ordem das semanas**; o número (`01`, `02`, …), o rótulo de
entradas, o intervalo de datas e a ligação para os commits são calculados
sozinhos. A última entrada do array é a mais recente, e o seu numeral aparece a
laranja.

```js
{
  title: 'Title of the week',
  date: '14 Sep 2026',          // dia, mês abreviado em inglês, ano
  author: 'Who wrote it',
  tags: ['tag', 'another'],
  excerpt: 'One or two lines for the diary card.',
  lead: 'The opening sentence, highlighted at the top of the entry.',
  blocks: [
    T('Summary', 'A paragraph.'),
    L('Goals', ['First', 'Second']),
    F('diagram-x', 'Figure caption.', 'Alt text')
  ]
}
```

Os blocos são `T` (parágrafo), `L` (lista) e `F` (figura). O título de cada bloco
é livre — `Summary`, `Goals`, `Technical decisions`, `What went wrong`,
`Next steps` são só os que temos usado.

Para mudar a organização no GitHub, muda `githubOrg` no topo do ficheiro: todas
as ligações de repositório são construídas a partir daí.

## As pessoas

Cada entrada do array `members` aceita:

| Campo | Obrigatório | O que faz |
| --- | --- | --- |
| `name` | sim | Nome mostrado |
| `role` | sim | Uma linha em maiúsculas, por baixo do nome |
| `bio` | sim | Duas ou três linhas |
| `user` | sim | Utilizador do GitHub — faz a ligação e, sem `email`, também o endereço |
| `email` | não | Quando o email não é o nome do GitHub (no ISEP costuma ser o número de aluno) |
| `photo` | não | Caminho à escolha. Sem ele, `assets/img/membro-N.jpg` pela ordem do array |
| `photoClean` | não | Reenquadra a fotografia por CSS quando ela vem com muito fundo |
| `linkedin` | não | Acrescenta o badge "in" ao lado do nome |

## Imagens

São opcionais. Enquanto o ficheiro não existir fica a moldura com a marca
esbatida, não um ícone de imagem partida — o site nunca fica com aspeto avariado
por faltar uma fotografia. Ver [`assets/img/README.md`](assets/img/README.md).

## Partilha

As meta tags Open Graph estão no `index.html` e a imagem é `assets/img/og.png`,
gerada a partir de `assets/img/og.html`.

⚠️ **Antes de publicar**, o `og:image` tem de passar a URL absoluto — os crawlers
do WhatsApp e do LinkedIn não resolvem caminhos relativos:

```html
<meta property="og:url" content="https://<utilizador>.github.io/MEIA---Blog/">
<meta property="og:image" content="https://<utilizador>.github.io/MEIA---Blog/assets/img/og.png">
```

## O sistema de design

`assets/css/cairn.css` é a fonte de verdade da aparência. Os tokens estão no
`:root` e os componentes logo a seguir; o `index.html` e o `app.js` só usam
variáveis, por isso a folha é o único sítio onde a aparência se muda.

- Nunca fixar uma cor, um tipo de letra ou um espaçamento à mão — usar
  `var(--color-*)`, `var(--font-*)`, `var(--space-*)`, `var(--shadow-*)`.
- Separar secções com espaço em branco, não com caixas nem filetes.
- **Um acento por vista.** O laranja marca o que está a decorrer — o projeto
  ativo, a semana mais recente, a ligação em foco. Nada mais.
- Para texto do tamanho de um parágrafo em cor de destaque usar
  `--color-accent-700`, não `--color-accent` (contraste).
- `--color-border` é o contorno de um componente (cartão, moldura);
  `--color-divider` é o filete fino de separação. Não são a mesma coisa.
- Duas famílias: `--font-heading` para títulos e texto, `--font-mono` para
  etiquetas, datas e numeração.

A marca é o cairn desenhado em curvas de nível. Abaixo de 40 px entra a versão de
duas curvas; abaixo de 20 px, a silhueta cheia — é a que está no
`assets/img/favicon.svg`.

## Modo escuro

Segue o sistema operativo, por `prefers-color-scheme`. Não há botão nem
JavaScript: o bloco `@media` no `cairn.css` redefine **só os tokens**, e nenhum
componente sabe em que modo está.

Ao acrescentar um componente novo, se ele usar apenas variáveis funciona nos dois
modos sem trabalho extra. Se fixar uma cor à mão, parte num deles.

Dois tokens não invertem por simetria:

- **O laranja clareia.** `#B4552D` não chega a 4.5:1 sobre tinta; no escuro passa
  a `#DB7644`.
- **A superfície é branca no claro e cinzenta no escuro.** Um cartão só se lê como
  cartão se tiver três coisas a separá-lo do fundo: cor de superfície própria,
  contorno visível e — no claro — sombra. No escuro a sombra não funciona, por
  isso a superfície tem de clarear mais (`#26282C` sobre `#17181A`).

O favicon fica de fora do sistema. O Chromium ignora `@media` dentro de um SVG de
ícone, por isso é uma cor só — o laranja da marca, que passa os 3:1 exigidos a um
grafismo tanto na barra de separadores clara (4.41:1) como na escura (3.28:1).

## Uma nota para quem mexer no CSS

O `box-sizing: border-box` está lá no topo por uma razão. Sem ele, qualquer
elemento com `height: 100%` e `padding` transborda a célula que o contém — foi
o que fez os cartões dos projetos sobreporem-se uns aos outros até se descobrir
porquê. Não o tirem.

## Origem

Implementado a partir de um canvas do [Claude Design](https://claude.ai/design),
com a identidade **Cairn** aplicada depois.

O protótipo era um ecrã único com estado interno e ligações a `#`. Na passagem a
código as vistas ganharam endereço próprio, as imagens do protótipo passaram a
`<img>` normais, e foi acrescentada a página de "não encontrado" que o protótipo
não precisava de ter.
