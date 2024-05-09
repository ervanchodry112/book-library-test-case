const longestword = (sentence) => {
   const words = sentence.split(" ");
   let longest = 0;

   words.forEach(word => {
      if (word.length > longest) longest = word.length;
   })

   return `${longest} character`;
}

console.log(longestword("Saya sangat senang mengerjakan soal algoritma"));