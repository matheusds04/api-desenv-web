async function buscarCarros(){
    await fetch('http://localhost:3000/buscarcarro')
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Erro ao consumir a API:', error);
      });
  }

async function AdicionarCarro(){
  const body = {
    marca: 'Honda',
    ano: '2009',
    modelo: 'Civic',
    valor: '40000'
  }
  
  await fetch('http://localhost:3000/adicionarcarro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Erro ao criar novo carro:', error);
    });
}