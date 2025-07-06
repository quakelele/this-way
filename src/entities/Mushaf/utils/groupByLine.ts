import { MushafVerse, MushafWord } from "../model/types";

export const groupByLine = (
    verses: MushafVerse[]
  ): Record<number, MushafWord[]> => {
    return verses.reduce((acc, verse) => {
      const lastWordId = verse.words.at(-1)?.id;
  
      verse.words.forEach((word) => {
        const lineNumber = word.line_number;
        if (!acc[lineNumber]) acc[lineNumber] = [];
  
        acc[lineNumber].push({
          ...word,
          verse_number: verse.verse_number,
          isLastInVerse: word.id === lastWordId,
        });
      });
  
      return acc;
    }, {});
  };
  
// import { MushafVerse, MushafWord } from "../model/types";

// export const groupByLine = (verses: MushafVerse[]): Record<number, MushafWord[]> => {
//     return verses.reduce((acc, verse) => {
//       verse.words.forEach((word) => {
//         const lineNumber = word.line_number;
//         if (!acc[lineNumber]) {
//           acc[lineNumber] = [];
//         }
//         acc[lineNumber].push({ ...word, verse_number: verse.verse_number });
//       });
//       return acc;
//     }, {} as Record<number, MushafWord[]>);
//   };

  