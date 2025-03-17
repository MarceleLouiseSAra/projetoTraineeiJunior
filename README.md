# Projeto final do trainee da iJunior

A *iJunior* é a empresa júnior do Departamento de Ciência da Computação da Universidade Federal de Minas Gerais e comercializa websites, e-commerces, aplicativos e sistemas web há mais de 20 anos, proporcionando experiência prática com projetos reais e clientes reais para os seus efetivados.

O programa trainee da iJunior contempla quatro "trilhas" de conhecimentos, sendo o desenvolvimento back-end uma delas. Nesta, aprende-se: a utilizar as ferramentas *npm* e *Node.js*, para gerenciamento de pacotes e concepção de um ambiente de runtime Javascript, respectivamente; *Typescript*, uma extensão tipada do Javascript; arquitetura *Model-View-Controller*; modelagem de bancos de dados relacionais; rotas C.R.U.D. para APIs Rest; utilização do *Prisma*, uma O.R.M. (Object-Relational Mapping); a utilizar o framework *Express*, para manipulação de rotas, middlewares e solicitações HTTP; *TS-Node-Dev*, para reiniciar o servidor após cada nova alteração; a ferramenta *ESLint* para garantir a consistência da sintaxe do código; *Docker*, para isolar um ambiente de desenvolvimento padrão a ser compartilhado; e *Jest*, para a realização de testes unitários do código.

## Modo de uso:

```bash:
npm i

docker compose up
```

### Para executar comandos dentro do container:

```bash:
docker exec -it <backend_app> npx prisma validate

docker exec -it <backend_app> npx prisma generate

docker exec -it <backend_app> npx prisma migrate dev
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

