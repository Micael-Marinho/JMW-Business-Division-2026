# Arquitetura

O projeto separa interface, API e persistência. O front React/Vite de `frontend/` e `src/` faz chamadas HTTP para a API Express de `server/`. A API usa Sequelize para acessar PostgreSQL.

As validações e cálculos de `src/domain/wellbeing.js` são compartilhados. O navegador valida para orientar o preenchimento; a API valida novamente porque não pode confiar nos dados enviados pelo cliente.

## Modelo de dados

| Entidade | Campos principais                                          | Relações                                 |
| -------- | ---------------------------------------------------------- | ---------------------------------------- |
| Usuário  | id, nome, e-mail, hash da senha, versão do aceite, criação | 1:N sessões, check-ins e diários         |
| Sessão   | hash do token, user_id, validade                           | Pertence ao usuário; expira em sete dias |
| Check-in | id, titular, data, quatro escalas, atividade e observações | Único por titular e data                 |
| Diário   | id, titular, título, texto e criação                       | Pertence ao usuário                      |

A migração em `server/migrations/001_initial.sql` define faixas, chaves estrangeiras, unicidade e exclusão em cascata. `schema_migrations` registra a versão aplicada. Não há mudança de esquema entre esta edição e a API PostgreSQL anterior.

## Endpoints

As rotas de registros exigem sessão. Escritas também exigem origem correspondente à aplicação.

| Método       | Caminho              | Finalidade                    |
| ------------ | -------------------- | ----------------------------- |
| POST         | `/api/auth/register` | Cadastro com e-mail e senha   |
| POST         | `/api/auth/login`    | Login                         |
| POST         | `/api/auth/logout`   | Invalidar a sessão            |
| GET          | `/api/session`       | Consultar o usuário atual     |
| PATCH        | `/api/profile`       | Alterar nome                  |
| DELETE       | `/api/profile`       | Excluir conta e dados ativos  |
| GET/POST     | `/api/checkins`      | Listar/criar check-ins        |
| PATCH/DELETE | `/api/checkins/:id`  | Editar/excluir check-in       |
| GET/POST     | `/api/diaries`       | Listar/criar textos           |
| PATCH/DELETE | `/api/diaries/:id`   | Editar/excluir texto          |
| GET          | `/api/export`        | Exportar registros do titular |

Erros retornam `{ error, fields? }`. As respostas de perfil e exportação não incluem hash de senha ou token. Os logs não imprimem o texto do diário ou o corpo das requisições.

## Autenticação e autorização

Senhas: scrypt com N=16384, r=8 e p=1; sal aleatório de 16 bytes e chave de 64 bytes; comparação de tempo constante. Sessões: token aleatório de 32 bytes, com apenas seu SHA-256 no banco.

O cookie é HttpOnly, SameSite=Lax e válido por sete dias. Em produção, usa Secure e prefixo `__Host-`, exigindo HTTPS. A API limita tentativas de autenticação e escritas; os contadores em memória devem ser substituídos por armazenamento compartilhado numa implantação com várias instâncias.

O titular vem da sessão e não de `userId` enviado pelo formulário. Consultas e alterações usam simultaneamente o ID do registro e o ID do usuário. Sequelize parametriza as entradas, evitando concatenação de valores em SQL.

## Interface e execução

O CSS em `src/styles/global.css` reúne tokens, temas e layouts responsivos. As telas usam componentes comuns, gráficos com alternativa em tabela e estados vazios. A demonstração usa apenas dados fictícios em memória.

O Vite encaminha `/api` para a porta 3001. A API permanece um processo independente e não publica o front compilado. Para implantação, será necessário definir servidor web, proxy, HTTPS e `APP_ORIGIN`.

Não há console administrativo para ler registros de outras pessoas, processamento clínico ou integração com IA. O histórico completo é carregado no MVP; paginação é um incremento futuro.

## Dependências indiretas

O lockfile da API inclui `pg-cloudflare` como dependência opcional do driver `pg`. Essa entrada vem do próprio driver PostgreSQL; o projeto não configura nem executa um ambiente Workers. Essa entrada pertence à distribuição do driver e não exige configuração adicional.
