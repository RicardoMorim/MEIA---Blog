# Imagens

As imagens são **opcionais**. Enquanto o ficheiro não existir, a figura fica a
mostrar a caixa de papel do design — nunca o ícone de imagem partida do browser.
Podes publicar sem nenhuma destas e acrescentá-las depois.

Todas passam pelo tratamento `.halftone` do sistema: meio-tom de jornal, a cinza
e com trama de pontos. Não vale a pena afinar cor na origem.

## Nomes esperados

| Ficheiro | Onde aparece | Formato |
| --- | --- | --- |
| `membro-1.jpg` … `membro-5.jpg` | Fotografias da equipa, no início | vertical, 4:5 |
| `diagrama-ids-s3.png` | Semana 03 — pipeline de dados | 16:9 |
| `diagrama-ids-s4.png` | Semana 04 — matriz de confusão | 16:9 |
| `diagrama-ids-s6.png` | Semana 06 — ecrã do dashboard | 16:9 |

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

Chegam bem 1200 px no lado maior. São reduzidas a cinza e trameadas, por isso
ficheiros grandes só tornam a página lenta sem se notar diferença.
