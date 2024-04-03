# User

- [x] Deve ser possível criar um usuário
  - [x] Não deve ser possível criar um usuário com o mesmo username
- [x] Deve ser possível editar as informações básicas de um usuário
  - [x] Não deve ser possível atualizar um usuário que não existe
- [x] Deve ser possível editar o username de um usuário
  - [x] Não deve ser possível atualizar um usuário que não existe
  - [x] Não deve ser possível atribuir um novo username de um usuário existente
  - [x] Não deve ser possível editar o username dentro do cooldown de 7 dias

# Post

- [x] Deve ser possível criar um post
  - [x] Não deve ser possível criar um post para um usuário não existente
- [x] Deve ser possível excluir um post
  - [x] Deve deletar todas as versões anteriores de um post
  - [x] Não deve ser possível excluir um post que já foi excluido
  - [x] Não deve ser possível excluir um post que não existe
  - [x] Não deve ser possível excluir um post de outro usuário
- [x] Deve ser possível republicar um post
  - [x] Não deve ser possível republicar um post que não existe

# Rascunhos

- Armazenar os usernames antigos no Redis para permanecer por pelo menos 1 mês
