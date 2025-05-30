export function parseText(text: string, separator: string = " ") {
  const parts: { word: string; isBold: boolean }[] = [];
  const boldRegex = /\*\*(.+?)\*\*/g;
  // A regex para dividir por espaços, mantendo a pontuação junto à palavra.
  // Isso significa que a pontuação será considerada parte da palavra para fins de negrito.
  const wordSeparatorRegex = new RegExp(`[\\s${separator}]+`);

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = boldRegex.exec(text)) !== null) {
    // Processar texto antes do negrito
    if (match.index > lastIndex) {
      processSegment(text.slice(lastIndex, match.index), false);
    }

    // Processar texto dentro do negrito
    processSegment(match[1], true);

    lastIndex = boldRegex.lastIndex;
  }

  // Processar texto após o último negrito
  processSegment(text.slice(lastIndex), false);

  function processSegment(segment: string, isBold: boolean) {
    const wordsAndPunctuation = segment.split(/(\s+|[.,;!?:-])/).filter(Boolean);

    wordsAndPunctuation.forEach((item, index) => {
      const isPunctuation = /[.,;!?:-]/.test(item) && item.length === 1;
      const isSpace = /\s+/.test(item);

      if (isSpace) {
        parts.push({ word: item, isBold: false });
      } else if (isPunctuation) {
        // Se o item anterior for uma palavra, anexa a pontuação a ela.
        if (parts.length > 0 && !parts[parts.length - 1].word.match(/\s+/)) {
          parts[parts.length - 1].word += item;
        } else {
          // Caso contrário, adiciona a pontuação como um item separado (não negrito).
          parts.push({ word: item, isBold: false });
        }
      } else {
        parts.push({ word: item, isBold: isBold });
      }
    });
  }

  console.log(parts)
  return parts;
}