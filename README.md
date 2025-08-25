# Desafio Neki - Sistema de Gerenciamento de Eventos

<div align="center">

![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.5-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Material-UI](https://img.shields.io/badge/Material_UI-7.3.1-007FFF?style=for-the-badge&logo=mui&logoColor=white)

</div>

## Visão Geral

O **Desafio Neki** é uma aplicação fullstack  para gerenciamento de eventos, desenvolvida com **Spring Boot 3.5.5**  e **React 19.1.1**. O projeto oferece uma solução para criação, edição e visualização de eventos.

### Principais Características

-   **Arquitetura Moderna**: Backend RESTful com Spring Boot 3.5.5 e Java 21
-   **Interface Elegante**: Frontend React com Material-UI 7.3.1 e tema escuro/claro
-   **Sistema de Usuários**: Cadastro, login de usuários
-   **Gestão de Eventos**: CRUD para eventos com imagens
-   **Responsivo**: Interface adaptável para desktop e dispositivos móveis
-   **Documentação API**: Swagger/OpenAPI integrado

---

## Stack Tecnológica

### Backend

-   **Spring Boot 3.5.5** - Framework principal
-   **Java 21** - Linguagem de programação
-   **Spring Data JPA** - Persistência de dados
-   **PostgreSQL** - Banco de dados relacional
-   **SpringDoc OpenAPI** - Documentação da API
-   **Maven** - Gerenciamento de dependências

### Frontend

-   **React 19.1.1** - Biblioteca JavaScript
-   **Material-UI 7.3.1** - Componentes de interface
-   **React Router DOM 6.30.1** - Roteamento
-   **Axios 1.11.0** - Cliente HTTP
-   **Emotion** - Styling CSS-in-JS
-   **React Scripts 5.0.1** - Scripts de desenvolvimento

---

## Estrutura do Projeto

```
desafio-neki/
├── backend-springboot/          # API REST Spring Boot
│   ├── src/main/java/
│   │   └── com/desafioneki/Backend/
│   │       ├── controllers/     # Endpoints REST
│   │       ├── services/        # Lógica de negócio
│   │       ├── repositories/    # Acesso a dados
│   │       ├── models/          # Entidades JPA
│   │       ├── dtos/           # Objetos de transferência
│   │       └── mappers/        # Conversores de dados
│   └── src/main/resources/
│       └── application.properties
└── frontend-react/              # Interface React
    ├── src/
    │   ├── components/         # Componentes reutilizáveis
    │   ├── pages/             # Páginas da aplicação
    │   ├── services/          # Serviços de API
    │   └── theme/             # Configuração de tema
    └── public/
```

---

## Páginas Disponíveis

1. **Login** (`/login`) - Autenticação de usuários
2. **Cadastro** (`/signup`) - Registro de novos usuários
3. **Home** (`/home`) - Dashboard principal com lista de eventos

## Funcionalidades

### Gestão de Usuários

-   ✅ Cadastro de novos usuários
-   ✅ Login e autenticação

### Gestão de Eventos

-   ✅ Criação de eventos com título, data, localização e imagem
-   ✅ Listagem de todos os eventos ativos
-   ✅ Edição de eventos existentes
-   ✅ Exclusão de eventos
-   ✅ Interface de cards responsiva

### Interface e UX

-   ✅ Tema escuro/claro com toggle
-   ✅ Design responsivo (desktop e mobile)
-   ✅ Feedback visual com toasts
-   ✅ Modais para criação/edição
-   ✅ Validação de formulários
-   ✅ Loading states

---

## Funcionalidades Faltantes

-   📱 **App Nativo**: Desenvolvimento de aplicação mobile nativa (Android/iOS)
-   📱 **React Native**: Versão mobile usando React Native


-   🔐 **JWT Authentication**: Implementação de JSON Web Tokens
-   🔐 **Password Encryption**: Criptografia de senhas com BCrypt
-   🔐 **CORS Configuration**: Configuração adequada de CORS

---

## Instalação e Configuração

### Pré-requisitos

-   **Java 21** ou superior
-   **Maven 3.6+**
-   **Node.js 18+** e **npm**
-   **PostgreSQL 15+**

### Configuração do Banco de Dados

1. **Crie o banco de dados PostgreSQL:**

```sql
CREATE DATABASE desafioneki;
```

2. **Configure as credenciais no backend:**

```properties
# backend-springboot/src/main/resources/application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/desafioneki
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Executando o Projeto

#### Backend (Spring Boot)

```bash
# Navegue para o diretório do backend
cd backend-springboot

# Execute o projeto
mvn spring-boot:run
```

**Acesso:**

-   API: http://localhost:8080
-   Swagger UI: http://localhost:8080/swagger-ui/index.html

#### Frontend (React)

```bash
# Navegue para o diretório do frontend
cd frontend-react

# Instale as dependências
npm install

# Execute o projeto
npm start
```

**Acesso:** http://localhost:3000

---

## Documentação da API

### Endpoints Principais

#### Usuários

-   `POST /api/users` - Criar usuário
-   `POST /api/users/login` - Login
-   `GET /api/users/{id}` - Buscar usuário por ID

#### Eventos

-   `GET /api/events` - Listar todos os eventos ativos
-   `GET /api/events/user/{userId}` - Listar eventos por usuário
-   `POST /api/events` - Criar evento
-   `PATCH /api/events/{id}` - Atualizar evento
-   `DELETE /api/events/{id}` - Excluir evento

### Exemplo de Uso

```bash
# Criar um evento
curl -X POST http://localhost:8080/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Workshop React",
    "date": "2024-01-15",
    "location": "São Paulo, SP",
    "img": "https://example.com/image.jpg",
    "userId": 1
  }'
```

---



## Desenvolvimento

## Autor

**ajpf44** - Alexandre José Ponciano Ferreira



## 
**Desafio Neki** - Desenvolvido como parte do processo seletivo da Neki.

---
