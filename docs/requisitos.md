# Requisitos e regras

Os requisitos abaixo vinculam a proposta ao comportamento implementado. A aprovação acadêmica e a homologação pelo grupo permanecem pendentes.

## Requisitos funcionais

| ID   | Requisito                             | Implementação                                      |
| ---- | ------------------------------------- | -------------------------------------------------- |
| RF01 | Criar conta e iniciar/encerrar sessão | Express, e-mail/senha e sessão no PostgreSQL       |
| RF02 | Registrar e editar check-in           | Formulário e API com validação                     |
| RF03 | Consultar histórico por período       | Períodos predefinidos e datas personalizadas       |
| RF04 | Apresentar médias e evolução          | Cálculos a partir dos registros; tabela do gráfico |
| RF05 | Criar, ler, editar e excluir diário   | Registros vinculados ao titular                    |
| RF06 | Alterar nome e aparência              | Nome na API; preferências no dispositivo           |
| RF07 | Exportar dados pessoais               | Download JSON                                      |
| RF08 | Excluir perfil e dados relacionados   | Confirmação textual e exclusão em transação/batch  |
| RF09 | Mostrar identificação acadêmica       | Página institucional e README                      |
| RF10 | Apresentar exemplos identificados     | Demonstração em memória, sem gravação              |

## Requisitos não funcionais

| ID    | Requisito                           | Evidência ou limite                                                            |
| ----- | ----------------------------------- | ------------------------------------------------------------------------------ |
| RNF01 | Isolar dados por conta              | Filtro pelo usuário da sessão em todas as operações; testes de duas contas     |
| RNF02 | Proteger senhas na versão local     | scrypt com sal individual; não há senha no armazenamento do navegador          |
| RNF03 | Adaptar layout a diferentes telas   | Media queries; inspeção em navegador pendente                                  |
| RNF04 | Dar alternativas acessíveis         | Labels, foco, dialog nativo, tabela e redução de movimento; auditoria pendente |
| RNF05 | Evitar complexidade sem necessidade | Um banco por ambiente e regras compartilhadas                                  |
| RNF06 | Informar falhas de forma útil       | API centralizada e mensagens na interface                                      |
| RNF07 | Manter código verificável           | Migrações, testes e comandos documentados                                      |
| RNF08 | Minimizar coleta e exposição        | Sem mural público, publicidade, IA ou console de diários                       |

## Regras de negócio

- RN01: um check-in por data e por usuário. Uma duplicata retorna conflito, e o original deve ser editado.
- RN02: humor, estresse, sono e energia exigem inteiros de 1 a 5. Não há resposta preselecionada no formulário.
- RN03: data válida entre 01/01/2000 e o dia atual em America/Sao_Paulo. Data futura é recusada.
- RN04: atividade física aceita 0 a 1.440 minutos. `null` significa ausência de resposta; zero significa nenhuma atividade.
- RN05: observações do check-in têm até 2.000 caracteres. Diário exige título de até 100 e texto de até 10.000.
- RN06: o titular vem da identidade autenticada, nunca de um `userId` enviado pelo cliente.
- RN07: médias ignoram dados ausentes. Um período sem registros mostra ausência de informação, não zero.
- RN08: comparação é descritiva. Dias sem registro não recebem valores interpolados no banco.
- RN09: exportação inclui apenas perfil e registros do titular, sem hash de senha ou token de sessão.
- RN10: exclusão de conta exige a confirmação EXCLUIR e remove os dados ativos associados.
- RN11: criação de perfil exige aceite da versão 2026-10-v1 do aviso de uso/privacidade. O fundamento jurídico definitivo ainda deve ser avaliado.

## Escalas

| Indicador         | 1           | 5          |
| ----------------- | ----------- | ---------- |
| Humor             | Difícil     | Muito bem  |
| Estresse          | Muito baixo | Muito alto |
| Qualidade do sono | Muito ruim  | Muito boa  |
| Energia           | Muito baixa | Muito alta |

Os níveis intermediários representam a percepção do usuário. A aplicação não aplica instrumentos psicométricos.
