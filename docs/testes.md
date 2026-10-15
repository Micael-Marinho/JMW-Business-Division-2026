# Testes e evidências

A edição independente mantém testes de regras de negócio e integração da API Express. Cada teste utiliza dados próprios, sem acessar o PostgreSQL pessoal.

## Suíte

| Arquivo                          | Casos | Escopo                                                                                                         |
| -------------------------------- | ----- | -------------------------------------------------------------------------------------------------------------- |
| `server/tests/domain.test.js`    | 8     | Escalas, datas, notas, ausência versus zero, médias, intervalos, nome/diário e proteção de senhas              |
| `server/tests/local-api.test.js` | 4     | Cadastro, sessão, login/logout, CRUD, exportação, exclusão, validação de origem e isolamento entre duas contas |

Os testes de integração agrupam várias asserções do mesmo percurso. Utilizam Express, Sequelize, Supertest e `pg-mem`, um emulador do protocolo/modelo SQL PostgreSQL.

## Executar

Após instalar as dependências da raiz e de `server`:

```powershell
npm.cmd test
npm.cmd run build
```

Os testes não exigem `DATABASE_URL`. O build compila a interface e verifica a resolução dos módulos, mas não executa o percurso completo no navegador.

## Resultados de 15/10/2026

| Verificação                         | Resultado              | Limite                                       |
| ----------------------------------- | ---------------------- | -------------------------------------------- |
| Suíte automatizada                  | 12 aprovados, 0 falhas | Banco de teste em memória                    |
| Build do front                      | Aprovado               | Compilação; sem revisão visual               |
| Dependências e arquivos de execução | Revisados              | Apenas React/Vite, API Express e PostgreSQL  |
| Homologação em PostgreSQL real      | Pendente               | Não havia servidor disponível neste ambiente |
| Testes E2E e revisão visual         | Pendentes              | Não executados                               |
| Auditoria WCAG                      | Pendente               | Requer inspeção específica                   |

Ambiente de verificação: Node.js 24.19.0. Uma dependência de `pg-mem` pode emitir um aviso sobre interpretação de datas; o emulador não reproduz todas as características de transações e concorrência do PostgreSQL real.

## Roteiro manual pendente

| Caso                                             | Resultado esperado                                             |
| ------------------------------------------------ | -------------------------------------------------------------- |
| Cadastro até o primeiro check-in                 | Registro aparece no dashboard e persiste após recarregar       |
| Escalas incompletas, data futura e data repetida | Erros claros, sem salvamento ou sobrescrita indevida           |
| Login e logout                                   | API exige sessão e deixa de aceitar a sessão encerrada         |
| Duas contas                                      | Nenhuma consulta ou alteração cruzada                          |
| Diário                                           | Criar, ler, editar e excluir somente os próprios textos        |
| Falha de servidor                                | Feedback de falha, sem confirmar uma gravação inexistente      |
| Período sem registros                            | Estado vazio, sem inventar médias                              |
| Exportação e exclusão                            | Somente dados do titular; exclusão pede confirmação            |
| Telas de 360, 768 e 1440 px                      | Ações disponíveis e tabelas com rolagem própria                |
| Teclado e modais                                 | Foco visível, navegação contida e retorno ao controle anterior |
| Temas e redução de movimento                     | Leitura preservada e preferência do sistema respeitada         |
| Demonstração                                     | Exemplos identificados e sem gravação no banco                 |

O grupo deve registrar data, navegador, resolução, responsável e resultado de cada execução. Não considere uma revisão como realizada sem efetivamente executar o caso.
