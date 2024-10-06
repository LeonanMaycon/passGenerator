# 📋 API de Gerenciamento de Senhas

### Visão Geral

Uma aplicação Node.js que permite aos usuários gerar, recuperar, atualizar e deletar senhas. A API foi construída usando Express.js.

---

## 🔧 Configuração do Projeto

### Pré-requisitos

- **Node.js**: Certifique-se de que o Node.js está instalado no seu sistema.
- **Express.js**: O framework utilizado nesta aplicação.

### Passos de Instalação

1. Clone o repositório.
2. Abra o terminal e navegue até a pasta do backend.
3. Execute o seguinte comando para iniciar o docker:
    
    ```bash
    docker-compose up -d --build
    ```

---

## 🚀 Endpoints da API

### **Home (`/`)**

- **Método:** GET
- **Descrição:** Lista os endpoints da API disponíveis e como utilizá-los.

---

### **Gerar Senha (`/passGenerator`)**

- **Método:** GET
- **Parâmetros de Query:**
    - `user` (obrigatório): Nome de usuário para o qual a senha será gerada.
    - `quant` (opcional): Especifica o tamanho da senha (padrão é 15 caracteres).

    ```bash
    /passGenerator?user=johndoe&quant=20
    ```

- **Exemplo:**

---

### **Recuperar Senha (`/getPass`)**

- **Método:** GET
- **Parâmetros de Query:**
    - `user` (opcional): Nome de usuário para recuperar a senha. Se omitido, recupera todas as senhas armazenadas.

    **Exemplo:**
    
    ```bash
    /getPass?user=johndoe
    ```

---

### **Deletar Senha (`/delPass`)**

- **Método:** GET
- **Parâmetros de Query:**
    - `user` (obrigatório): Nome de usuário cuja senha será deletada.

    **Exemplo:**
    
    ```bash
    /delPass?user=johndoe
    ```

---

### **Atualizar Senha (`/patchPass`)**

- **Método:** GET
- **Parâmetros de Query:**
    - `user` (obrigatório): Nome de usuário cuja senha será atualizada.
    - `quant` (opcional): Tamanho da nova senha.

    **Exemplo:**
    
    ```bash
    /patchPass?user=johndoe&quant=18
    ```

---

## 🛠 Tratamento de Erros

- **400 Bad Request**: Retornado quando os parâmetros obrigatórios estão faltando.
- **404 Not Found**: Retornado quando o usuário ou senha especificado não existe.
- **500 Internal Server Error**: Para problemas no lado do servidor.

---

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT**.

---

### 🎯 Próximos Passos / Tarefas Pendentes

- [ ]  Implementar autenticação para a API.
- [ ]  Adicionar testes unitários para as funções relacionadas às senhas.
- [ ]  Criar uma interface gráfica para interagir com a API.
