# Imagens

As imagens são **opcionais**. Enquanto o ficheiro não existir, a moldura mostra a
marca esbatida — nunca o ícone de imagem partida do browser. Podes publicar sem
nenhuma destas e acrescentá-las depois.

Todas aparecem dentro de uma moldura simples (`.cairn-frame`) e são mostradas
tal como estão — a cor trata-se na origem.

## Nomes esperados

| Ficheiro | Onde aparece | Formato |
| --- | --- | --- |
| `membro-1.jpg` … `membro-5.jpg` | Fotografias da equipa, no início | vertical, 4:5 |
| `diagrama-ids-s3.png` | Semana 03 — pipeline de dados | 16:9 |
| `diagrama-ids-s4.png` | Semana 04 — matriz de confusão | 16:9 |
| `diagrama-ids-s6.png` | Semana 06 — ecrã do dashboard | 16:9 |
| `favicon.svg` | Ícone do site | quadrado |
| `og.png` | Pré-visualização ao partilhar o link | 1200 × 630 |

A ordem de `membro-N` é a ordem do array `members` em `assets/js/content.js`.

O nome de um diagrama é o primeiro argumento do bloco `F(...)` dessa entrada,
com `.png`.

## Outro nome ou outra extensão

Se preferires `.webp`, `.jpeg` ou um nome diferente, indica o caminho completo no
conteúdo em vez de mudares o ficheiro de nome:

```js
// uma pessoa — campo `photo`
{ name: 'Ricardo Morim', /* … */ photo: 'assets/img/ricardo.webp' }

// uma figura — quarto argumento de F()
F('diagrama-ids-s3', 'Legenda.', 'Texto alternativo', 'assets/img/pipeline.webp')
```

## Tamanhos

Chegam bem 1600 px no lado maior. Acima disso só tornam a página lenta.

## A imagem de partilha

`og.png` é gerada a partir de `og.html`, que está nesta pasta. Abre o ficheiro
num browser, F12, botão direito no `<div id="og">` no painel Elements →
**Capture node screenshot**. Sai um PNG de 1200 × 630 exatos. Guarda-o aqui como
`og.png`.

Se a marca ou o texto mudarem, repete o processo — o `og.html` é a origem.
