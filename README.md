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
  - [x] Não deve ser possível republicar um post já republicado que não tenha conteúdo
- [x] Deve ser possível editar um post
  - [x] Deve ser possível editar uma republicação sem conteúdo (substituindo a versão atual)
  - [x] Não deve ser possível editar um post que não existe
  - [x] Não deve ser possível editar uma versão antiga de um post
- [x] Deve ser possível comentar um post
  - [x] Não deve ser possível comentar um post que não existe
  - [x] Não deve ser possível comentar um post com versão antiga
  - [x] Não deve ser possível comentar uma republicação sem conteúdo

# Rascunhos

- Armazenar os usernames antigos no Redis para permanecer por pelo menos 1 mês
- Estudar sobre paginação via token
- Usar a lib morgan

# Rotas

- Users

  - [x] POST /users
  - [x] GET /users/usuariotal
  - [x] GET /users/usuariotal/posts
  - [x] POST /users/auth
  - [x] GET /users/me
  - [x] PUT /users/me
  - [x] PATCH /users/me/username
  - [x] POST /users/usuario-tal/followers
  - [x] GET /users/usuario-tal/followers
  - [x] GET /users/usuario-tal/following
  - [x] GET /users

- Posts
  - [x] GET /posts
  - [x] POST /posts
  - [x] GET /posts/post-tal
  - [x] PUT /posts/post-tal
  - [x] DELETE /posts/post-tal
  - [x] GET /posts/post-tal/comments
