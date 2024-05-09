const reverse = (word) => {
   const regex = /^\d+$/;
   const number = {};
   let rev = '';
   for (const index in word) {
      const character = word[index]
      if (regex.test(character)) {
         number[character] = index;
         word.replace(character, '');
      } else {
         rev += character;
      }
   }

   for (const key in number) {
      rev = rev.slice(0, number[key]) + key + rev.slice(number[key]);
   }
 
   return rev;
}

console.log(reverse('NEGIE1'));