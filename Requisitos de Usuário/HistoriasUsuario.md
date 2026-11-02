# Histórias de Usuário — MindTrack

## US01 — Criar conta
- **História:** Como novo usuário, quero criar uma conta, para acessar o MindTrack e registrar meu bem-estar.
- **Critérios de aceitação:**
  - O sistema deve permitir informar e-mail e senha.
  - Com e-mail em formato válido e senha aceita pelas regras de cadastro do sistema, a conta deve ser criada e ficar disponível para autenticação.
  - Um e-mail em formato inválido ou uma senha que não atenda às regras de cadastro deve impedir a criação da conta e apresentar uma mensagem indicando o campo a corrigir.
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
  - O formulário deve disponibilizar campos para humor, estresse, sono, energia, atividade física e observações pessoais.
  - Após salvar, o registro deve estar associado à conta autenticada e não deve aparecer para outra conta.
  - Após o salvamento bem-sucedido, o sistema deve apresentar uma confirmação; se o salvamento falhar, deve informar o erro.
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
  - As comparações devem identificar o período consultado e os dados apresentados em gráficos também devem poder ser consultados em tabela.
- **Prioridade:** Alta
- **Story Points:** 5
- **Requisitos relacionados:** RF06, RF12, RNF03, RNF04

## US06 — Manter meu diário pessoal
- **História:** Como usuário, quero criar, editar, consultar e excluir registros do diário, para manter minhas reflexões organizadas.
- **Critérios de aceitação:**
  - O usuário deve conseguir criar e consultar registros.
  - O usuário deve conseguir editar e excluir seus próprios registros.
  - Após editar um registro, uma nova consulta deve mostrar o conteúdo atualizado; após excluí-lo, o registro não deve mais aparecer na consulta.
- **Prioridade:** Média
- **Story Points:** 5
- **Requisitos relacionados:** RF07, RNF02, RNF05

## US07 — Personalizar a aparência
- **História:** Como usuário, quero escolher as preferências visuais da interface, para utilizar o sistema de forma mais confortável.
- **Critérios de aceitação:**
  - O sistema deve oferecer temas claro, escuro e automático.
  - Deve oferecer opções de contraste aumentado e movimento reduzido, e a interface deve refletir a opção selecionada.
- **Prioridade:** Média
- **Story Points:** 3
- **Requisitos relacionados:** RF08, RF09, RNF04

## US08 — Gerenciar meus dados
- **História:** Como usuário, quero alterar meu nome, exportar meus dados e excluir minha conta, para controlar minhas informações pessoais.
- **Critérios de aceitação:**
  - O usuário deve conseguir alterar o nome.
  - A exportação deve gerar um arquivo que possa ser interpretado como JSON válido e contenha os dados disponibilizados para exportação.
  - A exclusão da conta deve remover também os registros associados, conforme previsto pelo sistema.
- **Prioridade:** Média
- **Story Points:** 5
- **Requisitos relacionados:** RF10, RNF02, RNF08

## US09 — Consultar informações sobre o MindTrack
- **História:** Como visitante, quero consultar a página institucional e as perguntas frequentes, para compreender a proposta e o funcionamento do sistema.
- **Critérios de aceitação:**
  - A página institucional deve apresentar informações sobre o MindTrack.
  - A seção de perguntas frequentes deve estar disponível para consulta na interface pública.
- **Prioridade:** Baixa
- **Story Points:** 2
- **Requisitos relacionados:** RF11, RNF04
