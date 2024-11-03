# 📋 API de Gerenciamento de Senhas

### Visão Geral

Uma aplicação Node.js que permite aos usuários gerar, recuperar, atualizar e deletar senhas. A API foi construída usando Express.js e está configurada para rodar em containers Docker, facilitando o gerenciamento de seu ambiente e banco de dados.

---

## 🔧 Configuração do Projeto

### Pré-requisitos

- **Node.js**: Certifique-se de que o Node.js está instalado no seu sistema.
- **Docker** e **Docker Compose**: Necessários para a configuração de ambiente com containers.

### Passos de Instalação

1. Clone o repositório.
2. Abra o terminal e navegue até a pasta do backend.
3. Execute o seguinte comando para construir e iniciar o ambiente Docker:

    ```bash
    docker-compose up -d --build
    ```

4. Acesse o Portainer (opcional para gerenciamento de containers):
   - O Portainer estará disponível em `https://localhost:9443`.
   - Na primeira vez, configure uma senha de administrador para acessar a interface.

---

## 🐳 Arquitetura Docker

Este projeto utiliza um ambiente Docker Compose com os seguintes serviços:

- **app**: Contém a API de gerenciamento de senhas, construída com Node.js.
- **db**: Banco de dados PostgreSQL para armazenar as senhas.
- **portainer**: Interface gráfica para gerenciamento dos containers Docker, facilitando a visualização e o controle do ambiente.

### Volumes Persistentes

- **db_data**: Armazena os dados do PostgreSQL de forma persistente.
- **portainer_data**: Armazena as configurações e dados do Portainer.

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

    **Exemplo:**

    ```bash
    /passGenerator?user=johndoe&quant=20
    ```

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

## 🖥️ Gerenciamento com Portainer

Para facilitar o gerenciamento dos containers, o projeto inclui o Portainer, uma interface web que permite monitorar e administrar os containers de forma gráfica.

- Acesse o Portainer em `https://localhost:9443` e faça login.
- Com o Portainer, você pode:
  - Verificar logs e status dos containers.
  - Reiniciar, parar ou excluir containers.
  - Gerenciar volumes e redes.

---

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT**.