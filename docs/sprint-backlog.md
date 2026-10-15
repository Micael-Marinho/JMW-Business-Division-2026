# Proposta de organização das iterações

Este documento é um planejamento. Não descreve sprints, reuniões ou feedbacks como se já tivessem acontecido. A duração, disponibilidade e divisão do trabalho serão combinadas pelo grupo.

| Iteração proposta          | Objetivo                             | Atividades de referência                                                            | Evidência esperada                                         |
| -------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| 1 — Percurso principal     | Cadastrar e registrar o primeiro dia | Revisar US01/02, instalar PostgreSQL, aplicar migração, validar cadastro e check-in | Primeiro registro persistido e testes de regras            |
| 2 — Consulta e autorização | Revisitar dados com privacidade      | Validar US03/04, testar duas contas, revisar gráficos e filtros                     | Histórico coerente e bloqueio de acesso cruzado            |
| 3 — Acabamento e controle  | Preparar demonstração acadêmica      | Revisar US05–08, temas, teclado, exportação, README e logo                          | Roteiro de apresentação executado e limitações registradas |

O código desta entrega já cobre os três percursos. A proposta serve para revisar, homologar e distribuir a evolução do projeto, sem reconstruir um histórico fictício de execução.

## Definition of Ready

Uma história está pronta para entrar em uma iteração quando seu objetivo é compreendido, os critérios são verificáveis, dependências estão identificadas, dados necessários existem e a equipe consegue explicar o que entra e o que fica fora do escopo.

## Definition of Done

Para o grupo considerar uma história concluída:

- Comportamento implementado e integrado ao percurso do usuário.
- Critérios de aceitação conferidos, incluindo erros e estado vazio.
- Testes relevantes executados, com resultados registrados.
- Autorização por titular verificada quando houver dados pessoais.
- Uso com teclado e telas pequenas revisado.
- Documentação coerente com o incremento.
- Revisão de outro integrante e demonstração ao grupo realizadas.

As duas últimas etapas e a revisão em navegador ainda não foram realizadas nesta entrega. Portanto, o status é **implementado, aguardando homologação**, e não uma DoD integralmente cumprida.

## Scrum e práticas de XP

Scrum pode organizar objetivos, backlog e revisão do incremento. Testes frequentes, integração de alterações pequenas e refatoração orientada a problemas concretos são práticas técnicas de referência. Programação em pares pode ser adotada pelo grupo, mas não foi registrada como realizada.

Não foram atribuídos papéis de Product Owner ou Scrum Master automaticamente. A organização dos três integrantes deverá ser decidida e registrada pela equipe.
