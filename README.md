# Firestore Record Manager

<p align="center" width="100%">
    <img width="22%" src="https://www.vectorlogo.zone/logos/firebase/firebase-ar21.svg" alt="Firebase Logo">
</p>

## Descrição

Este projeto é uma aplicação backend utilizando Firebase Functions, Firestore e TypeScript. Ele inclui a configuração
inicial para gerenciar registros no Firestore, com endpoints para adicionar e manipular registros de forma eficiente.

## Estrutura do Projeto

```
firestore-record-manager/
├── functions/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── RecordController.ts
│   │   ├── repositories/
│   │   │   └── RecordRepository.ts
│   │   ├── services/
│   │   │   └── RecordService.ts
│   │   └── types/
│   │       └── Record.ts
│   ├── .eslintrc.js
│   ├── .gitignore
│   ├── firebase-debug.log
│   ├── firestore-debug.log
│   ├── package.json
│   ├── tsconfig.dev.json
│   ├── tsconfig.json
│   └── webpack.config.ts
├── .firebaserc
├── .gitignore
├── firebase.json
└── firestore.rules
```

## Pré-requisitos

- Node.js (v20 LTS ou superior)
- npm ou yarn (Recomendado v4+, instruções de instalação abaixo)
- Firebase CLI

### Instalando o Yarn

Unix/macOS:

```bash
corepack enable && corepack prepare yarn@stable --activate
```

## Inicialização Rápida

### 1. Clone o repositório e navegue até o diretório do projeto:

```bash
git clone https://github.com/thoggs/firestore-record-manager.git && cd firestore-record-manager/functions
```

### 2. Instale as Dependências:

```bash
yarn install
# ou
npm install
```

### 3. Configure o Firebase:

Certifique-se de ter o Firebase CLI instalado e inicializado. Se não, siga
as [instruções de configuração do Firebase CLI](https://firebase.google.com/docs/cli).

### 4. Sirva o Projeto Localmente:

- **Yarn**:

```bash
yarn build && firebase emulators:start
```

- **npm**:

```bash
npm run build && firebase emulators:start
```

## Descrição da API

### Endpoints:

### **addRecord** (Adicionar Registro)

- **POST /addRecord**: Adiciona um novo registro ao Firestore e retorna o ID do registro adicionado.

#### JSON Body Exemplo para `/addRecord`:

```json
{
  "name": "EXAMPLE_NAME"
}
```

### **Trigger de Criação de Registro**

- **onCreate**: Disparado como um trigger quando um novo registro é criado no Firestore.

## Estrutura de Resposta

### **Resposta de Sucesso**:

```json
{
  "data": [
    {
      "name": "exampleName",
      "increment_id": 1
    }
  ],
  "success": true,
  "metadata": {
    "messages": [
      {
        "errorCode": "INFO",
        "errorMessage": "Operation completed successfully.",
        "field": null
      }
    ]
  }
}
```

### **Resposta de Erro**:

```json
{
  "data": [],
  "success": false,
  "metadata": {
    "messages": [
      {
        "errorCode": "INTERNAL_SERVER_ERROR",
        "errorMessage": "Internal Server Error",
        "field": null
      }
    ]
  }
}
```

## Configuração para Desenvolvimento

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/thoggs/firestore-record-manager.git && cd firestore-record-manager/functions
```

### Passo 2: Instalar Dependências

```bash
yarn install
# ou
npm install
```

### Passo 3: Configurar o Firebase

Execute o seguinte comando para configurar o Firebase em seu projeto:

```bash
firebase init
```

### Passo 4: Servir o Projeto Localmente

Para iniciar o projeto localmente para fins de desenvolvimento:

- **Yarn**:

```bash
yarn build && firebase emulators:start
```

- **npm**:

```bash
npm run build && firebase emulators:start
```

## Tecnologias Utilizadas

- **Firebase**: Backend-as-a-Service
- **TypeScript**: Superconjunto tipado de JavaScript
- **Firebase Functions**: Funções serverless para Firebase
- **Firestore**: Banco de dados NoSQL
- **Webpack**: Empacotador de módulos

## Licença

Project license [Apache-2.0](https://opensource.org/license/apache-2-0)
