export function gerarIdAleatorio(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const comprimentoMaximo = 4;
    let id = '';
  
    for (let i = 0; i < comprimentoMaximo; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      id += caracteres.charAt(indiceAleatorio);
    }
  
    return id;
  }
