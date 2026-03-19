# 📦 Order API

API REST em Node.js + Express + Sequelize + SQLite para gerenciamento de pedidos. 

## ⚙️ Instalação

```bash
cd order-api
npm install
npm start
```

🌐 Servidor:

```bash
http://localhost:3000
```

## 📌 Endpoints

### ➕ Criar pedido

```bash
curl --location 'http://localhost:3000/order' \
--header 'Content-Type: application/json' \
--data '{
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

### 🔍 Buscar pedido

```bash
curl --location 'http://localhost:3000/order/v10089015vdb'
```

### 📋 Listar pedidos

```bash
curl --location 'http://localhost:3000/order/list'
```

### ✏️ Atualizar pedido

```bash
curl --location --request PUT 'http://localhost:3000/order/v10089015vdb' \
--header 'Content-Type: application/json' \
--data '{
  "valorTotal": 15000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 2,
      "valorItem": 1000
    }
  ]
}'
```

### 🗑️ Deletar pedido

```bash
curl --location --request DELETE 'http://localhost:3000/order/v10089015vdb'
```

## 🔄 Observação

A transformação aplicada é:
- `numeroPedido` -> `orderId` (removendo o sufixo final `-01`, se existir)
- `valorTotal` -> `value`
- `dataCriacao` -> `creationDate`
- `idItem` -> `productId`
- `quantidadeItem` -> `quantity`
- `valorItem` -> `price`

## 🛠️ Tecnologias Utilizadas

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

