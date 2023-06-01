// Importar as dependências
import express from "express";
import mongoose from "mongoose";

// Configurar o aplicativo Express
const app = express();

app.use(express.json());
// Conectar ao banco de dados MongoDB usando o Mongoose
mongoose.connect('mongodb+srv://sousam548:1234@cluster0.wjpm4gv.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });

// Definir o esquema do modelo para os dados
const carroSchema = new mongoose.Schema({
  marca: {
    type: String,
  },
  ano: {
    type: String,
  }, 
  modelo: {
    type: String,
  },
  valor: {
    type: String,
  }
});

// Definir o modelo com base no esquema
const CarroBD = mongoose.model('carro', carroSchema);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept, token"
  )
  res.header(
          "Access-Control-Allow-Methods",
          "POST, PUT, PATCH, GET, DELETE"
        )   
next();
});

// Definir as rotas da API
app.get('/buscarcarro', async (req, res) => {
  try {
    const carro = await CarroBD.find();
    res.json(carro);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar carro' });
  }
});

app.post('/adicionarcarro', async (req, res) => {
  try {
    const carro = new CarroBD(req.body);
    await carro.save();
    res.send(carro);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});