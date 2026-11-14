# Requisitos Funcionais — MindTrack

## RF01 — Cadastro de usuário
- **Descrição:** O sistema deve permitir que o usuário crie uma conta utilizando e-mail e senha.
- **Prioridade:** Alta
- **Requisitos relacionados:** RNF01, RNF02

## RF02 — Login
- **Descrição:** O sistema deve permitir que o usuário cadastrado entre em sua conta utilizando suas credenciais.
- **Prioridade:** Alta
- **Requisitos relacionados:** RNF01, RNF02

## RF03 — Encerramento de sessão
- **Descrição:** O sistema deve permitir que o usuário encerre sua sessão.
- **Prioridade:** Alta
- **Requisitos relacionados:** RNF02

## RF04 — Registro de check-in
- **Descrição:** O sistema deve permitir que o usuário registre informações sobre seu bem-estar por meio de quatro indicadores obrigatórios: humor, utilizando uma escala de 1 a 5 com representações de expressões faciais; estresse, qualidade do sono e energia e disposição, utilizando escalas de 1 a 5 sem representações faciais. Também deve permitir informar, opcionalmente, a quantidade de minutos dedicados à atividade física e adicionar observações pessoais em um campo de texto livre.
- **Prioridade:** Alta
- **Requisitos relacionados:** RNF02, RNF03, RNF05

## RF05 — Visualização do painel
- **Descrição:** O sistema deve apresentar médias, humor mais recente e registros recentes do usuário.
- **Prioridade:** Alta
- **Requisitos relacionados:** RNF02, RNF03, RNF05

## RF06 — Consulta ao histórico
- **Descrição:** O sistema deve permitir consultar registros por período e apresentar comparações descritivas.
- **Prioridade:** Alta
- **Requisitos relacionados:** RNF03, RNF04

## RF07 — Diário pessoal
- **Descrição:** O sistema deve permitir criar, consultar, editar e excluir registros do diário.
- **Prioridade:** Média
- **Requisitos relacionados:** RNF02, RNF05

## RF08 — Preferências de aparência
- **Descrição:** O sistema deve permitir selecionar tema claro, escuro ou automático.
- **Prioridade:** Média
- **Requisitos relacionados:** RNF04

## RF09 — Acessibilidade visual e movimento
- **Descrição:** O sistema deve oferecer opções de movimento reduzido e contraste aumentado.
- **Prioridade:** Média
- **Requisitos relacionados:** RNF04

## RF10 — Gerenciamento da conta
- **Descrição:** O sistema deve permitir alterar o nome do usuário, exportar os dados em JSON e excluir a conta com seus registros associados.
- **Prioridade:** Média
- **Requisitos relacionados:** RNF02, RNF05, RNF08

## RF11 — Consulta às informações institucionais
- **Descrição:** O sistema deve disponibilizar uma página institucional e uma seção de perguntas frequentes.
- **Prioridade:** Baixa
- **Requisitos relacionados:** RNF04

## RF12 — Visualização alternativa dos dados
- **Descrição:** O sistema deve disponibilizar uma alternativa em tabela para os dados apresentados em gráficos.
- **Prioridade:** Média
- **Requisitos relacionados:** RNF04
