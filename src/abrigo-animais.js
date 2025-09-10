class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {

    let resultado = {
      erro: null,
      lista: null
    };

    //Separação do array de acordo com as virgulas
    const brinquedos1 = brinquedosPessoa1.split(',');
    const brinquedos2 = brinquedosPessoa2.split(',');
    const animaisOrdem = ordemAnimais.split(',');

    resultado.erro = validarEntradaBrinquedos(brinquedos1, brinquedos2, animaisOrdem);

    resultado.lista = resultado.erro === false ? listarResultado(brinquedos1, brinquedos2, animaisOrdem) : false;

    return resultado;
  }
}

const listaAnimais = [
  { nome: 'Rex', tipo: 'cão', brinquedos: ['RATO','BOLA'] },
  { nome: 'Mimi', tipo: 'gato', brinquedos: ['BOLA','LASER'] },
  { nome: 'Fofo', tipo: 'gato', brinquedos: ['BOLA','RATO','LASER'] },
  { nome: 'Zero', tipo: 'gato', brinquedos: ['RATO','BOLA'] },
  { nome: 'Bola', tipo: 'cão', brinquedos: ['CAIXA','NOVELO'] },
  { nome: 'Bebe', tipo: 'cão', brinquedos: ['LASER','RATO','BOLA'] },
  { nome: 'Loco', tipo: 'jabuti', brinquedos: ['SKATE','RATO'] }
];

function listarResultado(brinquedos1, brinquedos2, animaisOrdem) {

  let animaisFiltrados = listaAnimais.filter(animal => animaisOrdem.includes(animal.nome));
  let resultado = [];
  let qtdPessoa1 = 0, qtdPessoa2 = 0;
  let animaisPessoa1 = [], animaisPessoa2 = [];

  animaisFiltrados.forEach(animal => {

    //Variáveis auxiliares 
    let ordemBrinquedosPessoa1 = [];
    let ordemBrinquedosPessoa2 = [];
    let condicaoPessoa1 = false;
    let condicaoPessoa2 = false;

    //Backup para retornar a lista original após usar a lógica dos gatos de não dividir brinquedos
    let backupBrinquedos1 = brinquedos1;
    let backupBrinquedos2 = brinquedos2;
    brinquedos1 = backupBrinquedos1;
    brinquedos2 = backupBrinquedos2;

    // Gatos não dividem brinquedos
    if(animal.tipo === 'gato') {
      if(qtdPessoa1 > 0) {
        brinquedos1 = brinquedos1.map(b => !animaisPessoa1.filter(a => a.brinquedos.includes(b)));
      }
      if(qtdPessoa2 > 0) {
        brinquedos2 = brinquedos2.map(b => !animaisPessoa2.filter(a => a.brinquedos.includes(b)));
      }
    }

    // Pessoa 1
    if(qtdPessoa1 <= 3 && animal.brinquedos.every(b => brinquedos1.includes(b))) {
      if(animal.tipo !== 'jabuti') { //Se for jabuti ordem não importa
        brinquedos1.forEach(b => {
          if(animal.brinquedos.includes(b)) ordemBrinquedosPessoa1.push(b);
        });
        if(JSON.stringify(ordemBrinquedosPessoa1) === JSON.stringify(animal.brinquedos)) {
          condicaoPessoa1 = true;
        }
      } else if(qtdPessoa1 > 0) { //Se for jabuti ordem importa
        condicaoPessoa1 = true;
      }
    }

    // Pessoa 2
    if(qtdPessoa2 <= 3 && animal.brinquedos.every(b => brinquedos2.includes(b))) {
      if(animal.tipo !== 'jabuti') { //Se não for jabuti a ordem importa
        brinquedos2.forEach(b => {
          if(animal.brinquedos.includes(b)) ordemBrinquedosPessoa2.push(b);
        });
        if(JSON.stringify(ordemBrinquedosPessoa2) === JSON.stringify(animal.brinquedos)) {
          condicaoPessoa2 = true;
        }
      } else if(qtdPessoa2 > 0) { //Se for jabuti ordem importa
        condicaoPessoa2 = true;
      }
    }

    //vErificar condições
    if(condicaoPessoa1 && condicaoPessoa2) {
      resultado.push(`${animal.nome} - abrigo`);
    } else if(condicaoPessoa1) {
      resultado.push(`${animal.nome} - pessoa 1`);
      animaisPessoa1.push(animal);
      qtdPessoa1++;
    } else if(condicaoPessoa2) {
      resultado.push(`${animal.nome} - pessoa 2`);
      animaisPessoa2.push(animal);
      qtdPessoa2++;
    } else {
      resultado.push(`${animal.nome} - abrigo`);
    }
  });

  return resultado.sort();
}

//Validacao das entradas
function validarEntradaBrinquedos(brinquedos1, brinquedos2, animaisOrdem) {
  const brinquedosValidos = ['RATO','BOLA','SKATE','LASER','CAIXA','NOVELO'];
  const animaisValidos = ['Rex','Mimi','Fofo','Zero','Bola','Bebe','Loco'];

  let isValid = brinquedos1.every(b => brinquedosValidos.includes(b)) && brinquedos2.every(b => brinquedosValidos.includes(b));

  if(isValid) {
    isValid = animaisOrdem.every(a => animaisValidos.includes(a));
    return isValid ? false : "Animal inválido";
  } 
  else {
    return "Brinquedo inválido";
  }
}


export { AbrigoAnimais as AbrigoAnimais };
