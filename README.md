# Jitterbit-JrDev-Challenge
Desafio Técnico - Jitterbit Jr Dev

## Tecnologias utilizadas
[![Stacks](https://skillicons.dev/icons?i=npm,nodejs,mongodb,express)](https://skillicons.dev)

Desafio Técnico para a posição de Dev Jr.
Documentação disponivel em [aqui.](https://jitterbit-jrdev-challenge.onrender.com/api-docs/) 

---

# API de Gerenciamento de Pedidos

Uma API RESTful construída com Node.js e Express para gerenciar pedidos com integração MongoDB e documentação automática via Swagger.

## 🎯 Visão Geral

Esta API implementa um sistema completo de gerenciamento de pedidos com operações de Criar, Ler, Atualizar e Deletar (CRUD). Ela trata transformação de dados, armazena pedidos em MongoDB e fornece documentação interativa de API via Swagger UI.

**Deploy em Produção:** [Render](jitterbit-jrdev-challenge.onrender.com/)

## ✅ Funcionalidades Implementadas

### Endpoints Obrigatórios ✓

- **POST `/order`** — Criar um novo pedido
- **GET `/order/:id`** — Recuperar pedido por ID (passado como parâmetro na URL)
- **GET `/order/list`** — Listar todos os pedidos
- **PUT `/order/:id`** — Atualizar pedido por ID
- **DELETE `/order/:id`** — Deletar pedido por ID

### Banco de Dados

- **MongoDB** para armazenamento persistente de dados
- Mongoose ODM para validação de schema e modelagem de dados
- Transformação automática de dados do formato de requisição para o banco de dados

### Transformação de Dados

As requisições recebidas são automaticamente transformadas:

**Entrada (Request Body):**
```json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

**Armazenado no Banco (Transformado):**
```json
{
  "orderId": "v10089015vdb",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 1000
    }
  ]
}
```

### Funcionalidades Adicionais ✓

- **Swagger UI** — Documentação interativa de API em `/api-docs`
- **Variáveis de Ambiente** — Configuração segura via `.env`
- **Tratamento de Erros** — Mensagens de erro compreensíveis e códigos HTTP apropriados
- **Pronto para Produção** — Configurado para deploy em Render

---

## 🚀 Começando

### Pré-requisitos

- Node.js 18.x ou superior
- MongoDB (Atlas ou instância local)
- npm ou yarn

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/jpsilveira11/Jitterbit-JrDev-Challenge.git
   cd Jitterbit-JrDev-Challenge
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Crie o arquivo `.env`:**
   ```env
   MONGO_URI=mongodb+srv://<usuario>:<senha>@cluster.mongodb.net/jitterbit?retryWrites=true&w=majority
   PORT=3000
   ```

4. **Gere a documentação Swagger:**
   ```bash
   npm run swagger
   ```

5. **Inicie o servidor:**
   ```bash
   npm start
   ```

A API estará rodando em `http://localhost:3000` e o Swagger UI em `http://localhost:3000/api-docs`

---

## 📚 Endpoints da API

### 1. Criar Pedido
**POST** `/order`

Requisição:
```bash
curl -X POST http://localhost:3000/order \
  -H "Content-Type: application/json" \
  -d '{
    "numeroPedido": "v10089015vdb-01",
    "valorTotal": 10000,
    "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
    "items": [
      {
        "idItem": "2434",
        "quantidadeItem": 1,
        "valorItem": 1000
      }
    ]
  }'
```

Resposta (201 Criado):
```json
{
  "_id": "64dab8a0f6b7183237d307f6",
  "orderId": "v10089015vdb",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 1000,
      "_id": "64daba7d05bcc674899dc5bf"
    }
  ]
}
```

### 2. Obter Pedido por ID
**GET** `/order/:id`

Exemplo:
```bash
curl http://localhost:3000/order/v10089015vdb
```

Resposta (200 OK):
```json
{
  "_id": "64dab8a0f6b7183237d307f6",
  "orderId": "v10089015vdb",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [...]
}
```

Resposta de Erro (404 Não Encontrado):
```json
{
  "error": "Pedido não encontrado."
}
```

### 3. Listar Todos os Pedidos
**GET** `/order/list`

Exemplo:
```bash
curl http://localhost:3000/order/list
```

Resposta (200 OK):
```json
[
  {
    "_id": "64dab8a0f6b7183237d307f6",
    "orderId": "v10089015vdb",
    "value": 10000,
    "creationDate": "2023-07-19T12:24:11.529Z",
    "items": [...]
  },
  ...
]
```

### 4. Atualizar Pedido
**PUT** `/order/:id`

Exemplo:
```bash
curl -X PUT http://localhost:3000/order/v10089015vdb \
  -H "Content-Type: application/json" \
  -d '{
    "value": 15000,
    "status": "completed"
  }'
```

Resposta (200 OK):
```json
{
  "_id": "64dab8a0f6b7183237d307f6",
  "orderId": "v10089015vdb",
  "value": 15000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [...],
  "status": "completed"
}
```

### 5. Deletar Pedido
**DELETE** `/order/:id`

Exemplo:
```bash
curl -X DELETE http://localhost:3000/order/v10089015vdb
```

Resposta (200 OK):
```json
{
  "message": "Pedido deletado com sucesso"
}
```

---

## 📖 Documentação Swagger

A documentação interativa de API está disponível em:
- **Local:** `http://localhost:3000/api-docs`
- **Produção:** `https://sua-url-render.onrender.com/api-docs`

Teste todos os endpoints diretamente da interface Swagger UI!

---

## 🏗️ Estrutura do Projeto

```
Jitterbit-JrDev-Challenge/
├── api.js                 # Aplicação Express principal
├── swagger.js             # Configuração e geração do Swagger
├── swagger_output.json    # Documentação de API gerada
├── models/
│   └── order.js           # Schema Mongoose de Pedidos
├── package.json           # Dependências e scripts
├── .env                   # Variáveis de ambiente (não no repo)
└── README.md              # Este arquivo
```

### Arquivos Principais

**`api.js`** — Servidor Express com todos os endpoints CRUD e tratamento de erros

**`models/order.js`** — Schema Mongoose definindo a estrutura de Pedidos:
```javascript
{
  orderId: String,
  value: Number,
  creationDate: Date,
  items: [
    {
      productId: Number,
      quantity: Number,
      price: Number
    }
  ]
}
```

**`swagger.js`** — Configuração que auto-gera a documentação de API

---

## 🛠️ Scripts Disponíveis

```bash
# Inicia o servidor
npm start

# Gera/regenera documentação Swagger
npm run swagger

# Executa testes
npm test
```

---

## 🚀 Deploy em Render

### Pré-requisitos
- Conta MongoDB Atlas e string de conexão
- Conta GitHub com o repositório

### Passos

1. **Garanta que todas as mudanças estejam commitadas:**
   ```bash
   git add .
   git commit -m "feat: API completa de pedidos com Swagger"
   git push
   ```

2. **Crie um Web Service no Render:**
   - Acesse [render.com](https://render.com)
   - Entre com GitHub
   - Clique em "New" → "Web Service"
   - Selecione seu repositório GitHub
   - Configure:
     - **Name:** `jitterbit-order-api`
     - **Runtime:** Node
     - **Build Command:** (deixe em branco)
     - **Start Command:** `node api.js`

3. **Adicione Variáveis de Ambiente:**
   - No dashboard Render → Service Settings → Environment
   - Adicione: `MONGO_URI` = sua string de conexão MongoDB Atlas

4. **Deploy:**
   - Clique em "Create Web Service"
   - Ative "Auto-Deploy" para deploys automáticos em push no GitHub

5. **Acesse:**
   - API: `https://sua-url.onrender.com`
   - Swagger UI: `https://sua-url.onrender.com/api-docs`

---

## 📊 Tecnologias Utilizadas

| Tecnologia | Propósito |
|-----------|---------|
| **Node.js** | Runtime JavaScript |
| **Express** | Framework web |
| **MongoDB** | Banco de dados NoSQL |
| **Mongoose** | ODM para MongoDB |
| **Swagger UI Express** | Documentação interativa de API |
| **Swagger AutoGen** | Auto-gera specs OpenAPI |
| **dotenv** | Gerenciamento de variáveis de ambiente |

---

## ✨ Qualidade de Código

- ✅ **Bem organizado** — Separação clara de responsabilidades
- ✅ **Comentado** — Funções e lógica principais documentadas
- ✅ **Tratamento de erros** — Blocos try-catch compreensivos com mensagens significativas
- ✅ **Códigos HTTP** — Códigos de status apropriados para cada operação
- ✅ **Convenções de nomenclatura** — Nomes claros e descritivos de variáveis e funções
- ✅ **Histórico Git** — Commits organizados com mensagens descritivas

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` no diretório raiz (nunca commite este arquivo):

```env
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/dbname?retryWrites=true&w=majority
PORT=3000
NODE_ENV=development
```

---

## 📝 Notas

- O campo `numeroPedido` é automaticamente transformado em `orderId` removendo o sufixo `-01`
- Datas são convertidas para formato ISO para consistência
- Todos os campos numéricos (IDs de itens, quantidades, preços) são adequadamente tipados
- A API trata requisições concorrentes com segurança usando async/await

---

## 👨‍💻 Autor

**JP Silveira**
- GitHub: [@jpsilveira11](https://github.com/jpsilveira11)
- Repositório: [Jitterbit-JrDev-Challenge](https://github.com/jpsilveira11/Jitterbit-JrDev-Challenge)

---

## 📄 Licença

ISC

---

## 🎓 Requisitos do Desafio Atendidos

### Obrigatório ✓
- [x] API RESTful com Node.js e JavaScript
- [x] Operações CRUD para pedidos
- [x] Endpoints obrigatórios (Criar, Obter por ID)
- [x] Integração MongoDB
- [x] Transformação de dados do input para formato de banco
- [x] Tratamento de erros e códigos HTTP apropriados
- [x] Repositório público no GitHub

### Opcional ✓
- [x] Endpoint para listar todos os pedidos
- [x] Endpoint para atualizar pedido
- [x] Endpoint para deletar pedido
- [x] Documentação Swagger/OpenAPI
- [x] Deploy em produção (Render)

---

**Última Atualização:** 30 de Novembro de 2025 [★彡]
