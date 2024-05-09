const countword = (input, query) => {
   const count = {};
   
   query.forEach(word => {
      count[word] = input.filter(v => v === word).length
   });

   return Object.values(count);
}

console.log(countword(['xc', 'dz', 'bbb', 'dz'], ['bbb', 'ac', 'dz']))