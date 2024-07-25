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
│   │   ├── config/
│   │   │   └── FirebaseConfig.ts
│   │   ├── controllers/
│   │   │   └── RecordController.ts
│   │   ├── repositories/
│   │   │   └── RecordRepository.ts
│   │   ├── services/
│   │   │   └── RecordService.ts
│   │   ├── types/
│   │   │   ├── Record.ts
│   │   │   └── Response.ts
│   │   ├── utils/
│   │   │   └── responseFormatter.ts
│   │   └── index.ts
│   ├── ...
├── ...
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

- **yarn**:

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

## Configuração de Variáveis de Ambiente

Este projeto utiliza variáveis de ambiente para configurar o Firebase. Certifique-se de criar um arquivo `.env` na raiz
do diretório `functions` e adicionar as seguintes variáveis:

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Exemplo de `.env`

```env
FIREBASE_API_KEY=AIzaSyA...your_api_key
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=1234567890
FIREBASE_APP_ID=1:1234567890:web:abcdef123456
FIREBASE_MEASUREMENT_ID=G-ABCDEFGH
```

### Comportamento Padrão

Se algumas dessas variáveis de ambiente não forem definidas, a aplicação emitirá um aviso e usará as credenciais padrão
do ambiente:

```plaintext
FIREBASE_* env vars missing, using default credentials.
```

### Inicializando o Firebase

A inicialização do Firebase é feita na classe `FirebaseConfig`:

```typescript
import * as admin from "firebase-admin";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * Class responsible for initializing the Firebase Admin SDK.
 */
export class FirebaseConfig {
  /**
   * Initializes the Firebase Admin SDK with the configuration
   * provided in the environment variables, or uses the default
   * application credentials if variables are not provided.
   * Throws an error if any required environment variable is missing
   * and default credentials are not available.
   */
  static initialize() {
    if (!admin.apps.length) {
      if (
        process.env.FIREBASE_API_KEY &&
        process.env.FIREBASE_AUTH_DOMAIN &&
        process.env.FIREBASE_PROJECT_ID
      ) {
        const firebaseConfig = {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
          measurementId: process.env.FIREBASE_MEASUREMENT_ID,
        };
        admin.initializeApp(firebaseConfig);
      } else {
        console.warn("FIREBASE_* env vars missing, using default credentials.");
        admin.initializeApp();
      }
    }
  }
}
```

Com essas configurações, a aplicação estará pronta para ser executada em diferentes ambientes, utilizando as variáveis
de ambiente para configuração personalizada ou as credenciais padrão para um fallback seguro.

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

### Passo 3: Configurar as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do diretório `functions` e adicione as variáveis de ambiente necessárias conforme
descrito na seção de Configuração de Variáveis de Ambiente.

### Passo 4: Servir o Projeto Localmente

Para iniciar o projeto localmente para fins de desenvolvimento:

- **yarn**:

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
