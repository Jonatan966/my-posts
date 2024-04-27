<div align="center">
  <h1>My Posts</h1>
</div>

Uma API de rede social baseada em texto (Ex: Twitter/X, Threads).

## Tecnologias Utilizadas

- Prisma
- PostgreSQL
- Fastify
- Swagger
- Vitest
- Supertest

## Como Iniciar

1. Inicie uma instância do banco PostgreSQL;
2. Preencha todas as variáveis de ambiente necessárias. Use [esse arquivo](./.env.example) como template;
3. Use o comando `npm run migrate` para aplicar as migrações no seu banco de dados;
4. Use o comando `npm run dev` para iniciar a aplicação.

> [!NOTE]
> A documentação da API está presente na rota `/docs`

## Futuros Passos

- [ ] Feed com os posts de quem o usuário segue
- [ ] Foto de perfil
- [ ] Imagens/Vídeos nas publicações
- [ ] Armazenar nomes de usuário anteriores no Redis para bloqueá-los por 30 dias
- [ ] Refresh token
- [ ] Fluxo de recuperação de senha
  - [ ] Adicionar endereço de e-mail
