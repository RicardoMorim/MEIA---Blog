# Cifra — diário de projetos

Blogue de projetos de cinco alunos do **Mestrado em Engenharia de Inteligência
Artificial do ISEP**. Cada projeto tem o seu diário semanal e o seu repositório.

Site estático: HTML, CSS e JavaScript simples. **Sem build, sem dependências,
sem instalação.** Abre no GitHub Pages tal como está.

## Correr localmente

Qualquer servidor estático serve. Os `<script>` não correm em `file://`, por isso
não basta abrir o `index.html` com duplo clique:

```bash
python -m http.server 8123
```

Depois abre <http://localhost:8123>.

## Estrutura

| Caminho | O que é |
| --- | --- |
| `index.html` | A moldura da página: cabeçalho, filetes, linha de data, rodapé. Não tem conteúdo. |
| `assets/js/content.js` | **O conteúdo.** É o único ficheiro a editar para publicar. |
| `assets/js/app.js` | Encaminhamento e renderização das vistas. |
| `assets/css/cifra.css` | Estilos próprios do site (entrada das vistas, estados de rato). |
| `assets/img/` | Fotografias e diagramas. Ver o README lá dentro. |
| `_ds/broadsheet-…/` | O sistema de design **Broadsheet**, vindo do Claude Design. Não editar. |

## Endereços

O encaminhamento é por fragmento (`#/…`) para o GitHub Pages funcionar sem regras
de reescrita. Cada entrada tem endereço próprio e pode ser partilhada:

```
#/                                início
#/projetos                        lista de projetos
#/projetos/cifra-ids              diário de um projeto
#/projetos/cifra-ids/semana-03    uma entrada
#/contactos                       contactos
```

Um projeto ou semana que não exista mostra uma página de "não encontrado" — não
cai em silêncio para a primeira entrada.

## Publicar uma entrada semanal

Abre `assets/js/content.js` e junta um objeto ao array `weeks` do projeto. **A
ordem do array é a ordem das semanas**; o número (`01`, `02`, …), o rótulo de
entradas, o intervalo de datas e a ligação para os commits são calculados
sozinhos.

```js
{
  title: 'Título da semana',
  date: '14 set 2026',          // dia, mês abreviado, ano
  author: 'Nome de quem escreveu',
  tags: ['etiqueta', 'outra'],
  excerpt: 'Uma ou duas linhas para o cartão do diário.',
  lead: 'A frase de abertura, em itálico, no topo da entrada.',
  blocks: [
    T('Resumo', 'Um parágrafo.'),
    L('Objetivos', ['Primeiro', 'Segundo']),
    F('diagrama-x', 'Legenda da figura.', 'Texto alternativo')
  ]
}
```

Os blocos são `T` (parágrafo), `L` (lista) e `F` (figura). O título de cada bloco
é livre — `Resumo`, `Objetivos`, `Decisões técnicas`, `O que correu mal`,
`Próximos passos` são só os que temos usado.

Para mudar a organização no GitHub, muda `githubOrg` no topo do ficheiro: todas
as ligações de repositório são construídas a partir daí.

## Imagens

São opcionais. Enquanto o ficheiro não existir fica a caixa de papel do próprio
design, não um ícone de imagem partida — o site nunca fica com aspeto avariado
por faltar uma fotografia. Ver [`assets/img/README.md`](assets/img/README.md).

## O sistema de design

`_ds/broadsheet-…/` vem do Claude Design e está aqui **tal e qual**. É a fonte de
verdade da aparência: cor, tipo, espaçamento, componentes. Regras:

- Nunca fixar uma cor, um tipo de letra ou um espaçamento à mão — usar
  `var(--color-*)`, `var(--font-*)`, `var(--space-*)`, `var(--shadow-*)`.
- Separar secções com espaço em branco, não com caixas nem filetes.
- Cião para o que é interativo; magenta é a segunda cor, mais rara.
- Para texto do tamanho de um parágrafo em cor de destaque usar
  `--color-accent-700`, não `--color-accent` (contraste).

O `_ds_bundle.js` traz os filtros de separação e o *press driver*, que publica
`--press-nx` / `--press-ny` conforme o rato se move — é o que faz as chapas do
título e dos numerais inclinarem-se ligeiramente. Desliga-se sozinho com
`prefers-reduced-motion` ou sem rato.

## Origem

Implementado a partir do canvas `Cifra - Blog Mestrado IA.dc.html`
([Claude Design](https://claude.ai/design/p/56265765-ad52-45ea-8538-ce88329bbed8)).

O protótipo era um ecrã único com estado interno e ligações a `#`. Na passagem a
código as vistas ganharam endereço próprio, as imagens do protótipo
(`<image-slot>`, que só funciona dentro do editor) passaram a `<img>` normais, e
foi acrescentada a página de "não encontrado" que o protótipo não precisava de
ter. Todo o texto, medidas e estrutura são os do desenho.
