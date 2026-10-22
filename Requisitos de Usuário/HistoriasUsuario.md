# Histórias de Usuário — MindTrack

## US01 — Criar conta
- **História:** Como novo usuário, quero criar uma conta, para acessar o MindTrack e registrar meu bem-estar.
- **Critérios de aceitação:**
  - O sistema deve permitir informar e-mail e senha.
  - Com dados válidos, a conta deve ser criada.
  - Dados inválidos devem gerar uma mensagem compreensível.
- **Prioridade:** Alta
- **Story Points:** 3
- **Requisitos relacionados:** RF01, RNF01, RNF02

## US02 — Entrar e sair da conta
- **História:** Como usuário cadastrado, quero entrar e sair da minha conta, para controlar o acesso aos meus dados.
- **Critérios de aceitação:**
  - O usuário deve conseguir entrar com credenciais válidas.
  - Credenciais inválidas não devem permitir acesso.
  - Deve existir uma opção para encerrar a sessão.
- **Prioridade:** Alta
- **Story Points:** 3
- **Requisitos relacionados:** RF02, RF03, RNF01, RNF02

## US03 — Registrar meu bem-estar
- **História:** Como usuário autenticado, quero registrar meu humor, estresse, sono, energia, atividade física e observações, para acompanhar meu dia a dia.
- **Critérios de aceitação:**
  - O formulário deve disponibilizar os campos de check-in previstos pelo sistema.
  - O registro deve ficar associado à conta do usuário.
  - O usuário deve receber retorno após salvar o registro.
- **Prioridade:** Alta
- **Story Points:** 5
- **Requisitos relacionados:** RF04, RNF02, RNF05

## US04 — Visualizar meu painel
- **História:** Como usuário, quero visualizar um painel com resumos dos meus registros, para observar informações recentes sobre meu bem-estar.
- **Critérios de aceitação:**
  - O painel deve apresentar médias, humor mais recente e registros recentes disponíveis.
  - As informações exibidas devem corresponder aos registros do usuário.
- **Prioridade:** Alta
- **Story Points:** 5
- **Requisitos relacionados:** RF05, RNF03, RNF05

## US05 — Consultar meu histórico
- **História:** Como usuário, quero consultar meus registros por período, para comparar minhas respostas ao longo do tempo.
- **Critérios de aceitação:**
  - O sistema deve permitir selecionar um período de consulta.
  - O histórico deve apresentar os registros correspondentes.
  - Comparações e gráficos devem ser apresentados de forma compreensível.
- **Prioridade:** Alta
- **Story Points:** 5
- **Requisitos relacionados:** RF06, RF12, RNF03, RNF04

## US06 — Manter meu diário pessoal
- **História:** Como usuário, quero criar, editar, consultar e excluir registros do diário, para manter minhas reflexões organizadas.
- **Critérios de aceitação:**
  - O usuário deve conseguir criar e consultar registros.
  - O usuário deve conseguir editar e excluir seus próprios registros.
  - As alterações devem ser refletidas após a operação.
- **Prioridade:** Média
- **Story Points:** 5
- **Requisitos relacionados:** RF07, RNF02, RNF05

## US07 — Personalizar a aparência
- **História:** Como usuário, quero escolher as preferências visuais da interface, para utilizar o sistema de forma mais confortável.
- **Critérios de aceitação:**
  - O sistema deve oferecer temas claro, escuro e automático.
  - Deve oferecer opções de contraste aumentado e movimento reduzido.
- **Prioridade:** Média
- **Story Points:** 3
- **Requisitos relacionados:** RF08, RF09, RNF04

## US08 — Gerenciar meus dados
- **História:** Como usuário, quero alterar meu nome, exportar meus dados e excluir minha conta, para controlar minhas informações pessoais.
- **Critérios de aceitação:**
  - O usuário deve conseguir alterar o nome.
  - A exportação deve gerar um arquivo JSON válido.
  - A exclusão da conta deve remover também os registros associados, conforme previsto pelo sistema.
- **Prioridade:** Média
- **Story Points:** 5
- **Requisitos relacionados:** RF10, RNF02, RNF08

## US09 — Consultar informações sobre o MindTrack
- **História:** Como visitante, quero consultar a página institucional e as perguntas frequentes, para compreender a proposta e o funcionamento do sistema.
- **Critérios de aceitação:**
  - A página institucional deve apresentar informações sobre o MindTrack.
  - A seção de perguntas frequentes deve estar acessível.
- **Prioridade:** Baixa
- **Story Points:** 2
- **Requisitos relacionados:** RF11, RNF04
