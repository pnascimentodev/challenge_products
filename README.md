# API de Categorização de Produtos

Este projeto implementa uma API REST em Node.js com TypeScript para categorização inteligente de produtos de supermercado. A API é capaz de identificar produtos equivalentes mesmo quando possuem pequenas variações na descrição.

## Funcionalidades
- Categorização automática de produtos similares
- Identificação de produtos equivalentes com variações na descrição
- Separação de produtos por tipo, marca e tamanho
- Documentação interativa com Swagger

## Tecnologias Utilizadas
- Node.js
- TypeScript
- Express
- Sequelize
- SQLite (banco de dados em memória)
- Swagger UI Express

## Pré-requisitos
- Node.js 14.x ou superior
- npm 6.x ou superior

## Instalação
1. Clone o repositório ou baixe os arquivos do projeto:
   ```sh
   git clone https://github.com/pnascimentodev/challenge_products.git
   cd challenge_products
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```

## Como Executar
Para iniciar o servidor em modo de desenvolvimento:
```sh
npm run dev
```
O servidor estará disponível em [http://localhost:3000](http://localhost:3000).

## Documentação da API
A documentação da API é gerada automaticamente com Swagger e está disponível em:
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Através da interface do Swagger, você pode:
- Explorar todos os endpoints disponíveis
- Testar as requisições diretamente no navegador
- Visualizar modelos de dados e exemplos
- Entender as respostas esperadas de cada endpoint

## Endpoints Principais

### Adicionar Produtos
**POST** `/api/products`

**Exemplo de corpo da requisição:**
```json
[
  {
    "id": 1,
    "title": "Leite Integral Piracanjuba 1L",
    "supermarket": "Supermercado A"
  },
  {
    "id": 2,
    "title": "Leite Piracanjuba Integral 1L",
    "supermarket": "Supermercado B"
  }
]
```

### Obter Produtos Categorizados
**GET** `/api/products/categorized`

**Exemplo de saída:**
```json
[
  {
    "category": "Leite Integral Piracanjuba 1L",
    "count": 2,
    "products": [
      {
        "title": "Leite Integral Piracanjuba 1L",
        "supermarket": "Supermercado A"
      },
      {
        "title": "Leite Piracanjuba Integral 1L",
        "supermarket": "Supermercado B"
      }
    ]
  }
]
```

### Limpar Banco de Dados
**DELETE** `/api/products`

## Algoritmo de Categorização
O algoritmo de categorização é capaz de:
- Identificar produtos equivalentes mesmo com:
  - Ordem das palavras trocadas
  - Pequenas variações de descrição
  - Diferenças de capitalização
- Separar produtos com:
  - Tipos diferentes (integral vs. desnatado)
  - Marcas diferentes (Italac vs. Piracanjuba)
  - Tamanhos/quantidades diferentes (1L vs. 2L)

## Scripts Disponíveis
- `npm run dev`: Inicia o servidor em modo de desenvolvimento
- `npm run build`: Compila o TypeScript para JavaScript
- `npm start`: Inicia o servidor em modo de produção

## Final
Projeto realizado para participar da vaga em Dev Junior.
