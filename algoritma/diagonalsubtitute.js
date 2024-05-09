const diagonalsubtitute = (matrix) => {
   const diagonal1 = matrix[0][0] + matrix[1][1] + matrix[2][2];
   const diagonal2 = matrix[0][2] + matrix[1][1] + matrix[2][0];

   return diagonal1 - diagonal2;
}

console.log(diagonalsubtitute([[1, 2, 0], [4, 5, 6], [7, 8, 9]]))