export function verificarSolucao(tabuleiroUsuario, solucaoCorreta) {
  // Verificação de tipos e tamanhos dos tabuleiros
  if (!Array.isArray(tabuleiroUsuario) || !Array.isArray(solucaoCorreta)) {
      throw new Error("Os parâmetros devem ser arrays 2D.");
  }
  if (tabuleiroUsuario.length !== 9 || solucaoCorreta.length !== 9) {
      throw new Error("Os tabuleiros devem ter 9x9 elementos.");
  }

  const resultado = [];

  for (let row = 0; row < 9; row++) {
      if (tabuleiroUsuario[row].length !== 9 || solucaoCorreta[row].length !== 9) {
          throw new Error(`Linha ${row} não possui 9 elementos.`);
      }

      resultado[row] = [];
      for (let col = 0; col < 9; col++) {
          if (typeof tabuleiroUsuario[row][col] !== 'number' ||
              typeof solucaoCorreta[row][col] !== 'number') {
              throw new Error(`Elemento inválido na posição (${row}, ${col}). Todos os elementos devem ser números.`);
          }

          resultado[row][col] = tabuleiroUsuario[row][col] === solucaoCorreta[row][col];
      }
  }

  return resultado;
}
