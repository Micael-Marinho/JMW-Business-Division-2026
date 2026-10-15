<div align="center">

<img src="public/favicon.svg" alt="Símbolo do MindTrack" width="64" />

# MindTrack

### Seu bem-estar, no seu tempo.

**JMW Business Division 2026** · UTFPR — Campus Cornélio Procópio

Projeto acadêmico de **AS63C — Desenvolvimento Ágil** · 2º semestre de 2026

</div>

O MindTrack é uma plataforma de acompanhamento pessoal do bem-estar. A proposta é criar um espaço simples para registrar o dia, observar a rotina e guardar reflexões, com linguagem respeitosa e controle dos dados pelo próprio usuário.

A aplicação utiliza **React, Vite, Node.js, Express, PostgreSQL e Sequelize**. Cadastro e login usam e-mail e senha, com sessões mantidas pela API e pelo banco do projeto.

**Já possui o projeto configurado?** Consulte [ATUALIZAR.md](ATUALIZAR.md) para aproveitar seu `.env` e o banco existente. Para publicar o código, veja [PUBLICAR_NO_GITHUB.md](PUBLICAR_NO_GITHUB.md).

## Identificação acadêmica

| Informação  | Identificação                              |
| ----------- | ------------------------------------------ |
| Grupo       | JMW Business Division 2026                 |
| Disciplina  | AS63C — Desenvolvimento Ágil               |
| Professora  | Érica Souza                                |
| Instituição | Universidade Tecnológica Federal do Paraná |
| Campus      | Cornélio Procópio                          |
| Período     | Segundo semestre de 2026                   |

| Integrante                         | RA      | Perfil fornecido                            |
| ---------------------------------- | ------- | ------------------------------------------- |
| João Victor Queiroz de Lima        | 2051524 | —                                           |
| Micael Marinho Souza               | 2819457 | [GitHub](https://github.com/Micael-Marinho) |
| Wagner Lourenço de Oliveira Junior | 2819473 | —                                           |

## Funcionalidades implementadas

- Página institucional, perguntas frequentes e demonstração identificada.
- Cadastro, login, logout e proteção de sessões.
- Check-in com humor, estresse, sono, energia, atividade física e observações.
- Dashboard com médias, último humor e registros recentes.
- Histórico por período, comparação descritiva e gráficos com alternativa em tabela.
- Diário com criação, leitura, edição e exclusão de textos.
- Temas claro, escuro e automático, redução de movimento e contraste reforçado.
- Alteração de nome, exportação JSON e exclusão de conta e registros associados.

O núcleo do MVP é cadastro → primeiro check-in → dashboard → histórico. Os indicadores descrevem respostas pessoais, sem diagnóstico, classificação de transtornos ou relação de causa e efeito. O projeto não substitui avaliação profissional, psicoterapia ou atendimento emergencial.

## Tecnologias e organização

| Camada       | Tecnologias                                         |
| ------------ | --------------------------------------------------- |
| Interface    | React, JavaScript, Vite, CSS e Lucide React         |
| API          | Node.js e Express                                   |
| Persistência | PostgreSQL e Sequelize                              |
| Autenticação | scrypt, token de sessão aleatório e cookie HttpOnly |
| Qualidade    | Node Test Runner, Supertest e pg-mem                |

```text
MindTrack/
├── frontend/                 # entrada HTML/React e configuração do Vite
├── src/
│   ├── App.jsx               # sessão, navegação e integração da interface
│   ├── components/           # componentes comuns e gráfico
│   ├── views/                # páginas da aplicação
│   ├── domain/               # validações e cálculos usados pelo front e pela API
│   ├── services/             # chamadas HTTP e dados da demonstração
│   └── styles/global.css     # tokens, temas e estilos responsivos
├── server/
│   ├── app.js                # rotas, autorização e tratamento de erros
│   ├── database.js           # modelos Sequelize
│   ├── passwords.js          # proteção de senhas e tokens
│   ├── migrate.js            # aplicação de migrações versionadas
│   ├── migrations/           # estrutura do PostgreSQL
│   └── tests/                # regras de negócio e integração da API
├── docs/                     # documentação técnica e ágil
├── assets/                   # orientação para incluir a logo do grupo
├── public/                   # favicon e arquivos públicos
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── ATUALIZAR.md
└── README.md
```

O PostgreSQL atende ao modelo de dados do MVP. Não há necessidade de um segundo banco. Nenhum registro pessoal real é pré-carregado.

## Instalação no Windows / VS Code

Requisitos: **Node.js 22.13 ou superior** e PostgreSQL. Abra a pasta raiz no VS Code. Os exemplos usam PowerShell e `npm.cmd` para evitar depender da política de execução de scripts do Windows.

### 1. Instalar as dependências

```powershell
npm.cmd ci
npm.cmd --prefix server ci
```

Os dois `package-lock.json` estão incluídos. Se modificar as dependências, use `npm install` no respectivo diretório para atualizar o lockfile.

### 2. Configurar o banco

Para uma instalação nova, crie um banco chamado `mindtrack` no pgAdmin. Pelo Query Tool, conectado ao banco `postgres`:

```sql
CREATE DATABASE mindtrack;
```

Copie o exemplo e ajuste a conexão:

```powershell
Copy-Item .env.example .env
```

```dotenv
DATABASE_URL=postgres://postgres:SUA_SENHA@localhost:5432/mindtrack
PORT=3001
APP_ORIGIN=http://localhost:5173
NODE_ENV=development
```

Use sua senha e a porta efetiva do PostgreSQL. Caracteres reservados de URL na senha precisam de codificação apropriada. O `.env` fica apenas no seu computador.

Aplique a migração:

```powershell
npm.cmd run db:migrate
```

A migração registra sua versão; não recria uma estrutura já aplicada. Não usamos sincronização destrutiva nem apagamos o banco na inicialização.

### 3. Executar

No primeiro terminal, inicie a API:

```powershell
npm.cmd run dev:api
```

No segundo terminal, inicie o front:

```powershell
npm.cmd run dev
```

Abra **http://localhost:5173**. Cadastre uma conta pela interface. A API fica em `http://127.0.0.1:3001`, e o Vite encaminha `/api` para ela.

O endereço no navegador deve corresponder a `APP_ORIGIN`. A configuração padrão usa `localhost:5173`. Se escolher outro endereço, ajuste essa variável e reinicie a API.

### Comandos disponíveis

| Comando                  | Resultado                                    |
| ------------------------ | -------------------------------------------- |
| `npm run dev`            | Front em desenvolvimento                     |
| `npm run dev:frontend`   | Alias para o mesmo front                     |
| `npm run dev:api`        | API com reinicialização ao salvar alterações |
| `npm start`              | Inicia apenas a API, sem modo de observação  |
| `npm run db:migrate`     | Aplica a migração PostgreSQL pendente        |
| `npm test`               | Executa a suíte de regras e integração       |
| `npm run build`          | Compila o front para `frontend-dist/`        |
| `npm run build:frontend` | Alias do build do front                      |

A API e o front são processos separados. O comando `npm start` não serve o front compilado. Em uma futura implantação, o servidor web deve servir `frontend-dist` e encaminhar `/api` para a API, mantendo os controles de sessão e origem.

## Demonstração em sala

1. Apresente a proposta e a identificação do grupo.
2. Abra **Explorar demonstração** para mostrar o visual e gráficos com dados fictícios identificados.
3. Saia do exemplo e use uma conta de teste para registrar um dia.
4. Mostre o dashboard atualizado e a edição do registro no histórico.
5. Escreva no diário, alterne o tema e exporte os registros.
6. Explique como a API consulta os dados apenas do titular da sessão.

A demonstração fica em memória, não grava no banco e não permite salvar formulários. A conta real demonstra a persistência. Não existe conta administrativa padrão nem tela de leitura de diários de outras pessoas.

## Testes e situação da entrega

```powershell
npm.cmd test
npm.cmd run build
```

A suíte desta versão contém **12 testes**: oito de regras/cálculos/senhas e quatro de integração Express/Sequelize. Os testes da API usam Supertest e `pg-mem`; não acessam o banco pessoal e não exigem `DATABASE_URL`.

Os resultados executados, limites da verificação e roteiro manual estão em [docs/testes.md](docs/testes.md). O emulador não substitui homologação em PostgreSQL real. Revisão em navegador, E2E e auditoria completa de acessibilidade continuam pendentes.

## Desenvolvimento Ágil

Scrum é uma referência de organização proposta. Testes frequentes, pequenos incrementos e refatorações apoiam as práticas técnicas de XP. Não descrevemos reuniões, programação em pares ou pesquisas como realizadas sem registro da equipe.

| Documento                                  | Conteúdo                                         |
| ------------------------------------------ | ------------------------------------------------ |
| [Visão](docs/visao-projeto.md)             | Problema, público, personas hipotéticas e escopo |
| [Requisitos](docs/requisitos.md)           | Requisitos verificáveis e regras de negócio      |
| [Histórias](docs/historias-usuario.md)     | Histórias e critérios de aceitação               |
| [Product Backlog](docs/product-backlog.md) | Prioridades e situação do incremento             |
| [Sprint Backlog](docs/sprint-backlog.md)   | Proposta de iterações, DoR e DoD                 |
| [Arquitetura](docs/arquitetura.md)         | Camadas, dados, endpoints e decisões             |
| [Testes](docs/testes.md)                   | Evidências e roteiro de homologação              |
| [Privacidade](docs/privacidade.md)         | Finalidade, acesso, retenção e controles         |
| [Evolução](docs/evolucao.md)               | Incremento e modelos para a equipe preencher     |
