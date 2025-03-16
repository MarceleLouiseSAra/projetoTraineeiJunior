# Projeto final do trainee da iJunior

## Modo de uso:

```bash:
npm i

docker compose up
```

### Para executar comandos dentro do container:

```bash:
docker exec -it <nome_do_container> npx prisma validate

docker exec -it <nome_do_container> npx prisma generate

docker exec -it <nome_do_container> npx prisma migrate dev

```

### Comandos de configuração de ambiente:

```bash
  npm init -y

  npm install typescript ts-node @types/node --save-dev
  
  npx tsc --init
  
  npm install prisma --save-dev
  
  npm install @prisma/client
  
  # npx prisma init --datasource-provider sqlite

  npx prisma validate

  npx prisma generate

  npx prisma db push

  npx prisma migrate dev

  npx prisma studio

  npm install bcrypt

  npm install --save @types/bcrypt

  npm install cookie-parser

  npm install --save @types/cookie-parser

  npm install jsonwebtoken

  npm install --save @types/jsonwebtoken

  npm install --save-dev jest

  npm install --save-dev @types/jest

  npm install --save-dev ts-jest

  npm install --save-dev jest-mock-extended
```

