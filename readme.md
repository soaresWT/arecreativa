# Teste técnico Recreativa

# Visão geral

Essa aplicação permite o gerenciamento das atividades pedagógicas, permitindo a criação, edição, deletar/desativar, também conta com um sistema de criação e autenticação de usuários.

# Funcionalidades

Criar atividades;
Excluir atividades (uma rota que desabilita uma atividade);
Edição de atividades;
Listar atividades;
Download de um PDF da atividade;
Criar Usuários;
Realizar Login.

## Aplicação Full-Stack

Tecnologias utilizadas

- Next-JS
- Typescript
- Express.js
- Prisma ORM
- PostgreSQL
- Puppeteer

## Rodando localmente

Para rodar localmente, faça:

1. Clone o repositório

```bash
git clone https://github.com/soaresWT/arecreativa
```

2. Acesse o diretório front-end

```bash
cd atividades-app
```

3. Instale as dependências

```bash
npm i
```

4. Crie um arquivo de variavel de ambiente chamado .env.local

```bash
API_URL=link para url do back-end
```

5. Acesse o diretório back-end

```bash
atividadesAPI
```

6. Instale as dependências

```bash
npm i
```

7. Crie um arquivo de variáveis de ambiente na pasta raiz do seu projeto

```bash
    DATABASE_URL=link para seu PostgreSQL
    JWT_SECRET="sua senha super secreta"
```

8. Em ambos execute

```bash
npm run dev
```

## Decisões e pontos facultativos

No design da aplicação, resolvi utilizar no campo de tempo decorrido, como input dividido entre a unidade de tempo e o valor, assim o usuário pode selecionar se a atividade durou, horas, dias ou meses.

Ao excluir/desativar a atividade é exibido um pop-up de confirmação para evitar erros acidentais.

Variáveis de ambiente foram utilizadas tanto no back, quanto no front-end, pois auxiliam na configuração em produção, bem como não expor informações sensíveis, como o segredo utilizado na encriptação de dados

O sistema de autenticação foi realizado com base em tokens jwt, gerados no back-end e utilizados no front-end para identificar usuários logados.

Com os usuários criados, no banco também é possível atribuir atividades a um usuário mediante uma seleção que lista todos os usuários do sistema

## Rotas

Criar novo usuário

       POST {{API_URL}}/users/register

Corpo da requisição

    POST {
      "name": "exemploNome",
      "email": "exemoplo@gmail.com",
      "password": "123"
    }

Login

    POST {{API_URL}}/users/login

Corpo da requisição

    {
      "email": "exemoplo@gmail.com",
      "password": "123"
    }

Esta rota retorna um token JWT, que deve ser utilizado nas demais rotas no cabeçalho http de authorization como um bearer token

Criar atividade

    POST {{API_URL}}/activities

Corpo da requisição

    {
      "title": "Introdução à Programação",
      "summary": "Um curso introdutório sobre programação para iniciantes.",
      "objectives": "Ensinar os conceitos básicos de programação e lógica.",
      "bncc_skills": ["Desenvolvimento de competências em lógica de programação."],
      "total_time": "30 horas",
      "required_resources": "Computador com acesso à internet e software de programação.",
      "step_by_step_guide": "1. Apresentação do curso\n2. Instalação do software\n3. Primeiros passos em programação...",
      "user_id": "13cb6f85-8cdd-47bc-b178-223a342cc1cd",
      "status": "true"
    }

Buscar Atividade por id

    GET {{API_URL}}/activities/{id}

Listar Atividades

    GET {{API_URL}}/activities

Excluir atividades

    PUT {{API_URL}}/activities/disable/{id}

Editar Atividades

    PUT {{API_URL}}/activities/{id}

Download PDF das atividades

    GET {{API_URL}}/activities/pdf/{id}
