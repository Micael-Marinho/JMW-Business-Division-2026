# Histórias de Usuário — MindTrack

## US01 — Criar conta
- **História:** Como novo usuário, quero criar uma conta utilizando e-mail e senha, para acessar o MindTrack e acompanhar meu bem-estar.
- **Critérios de aceitação:**
  - O sistema deve permitir informar e-mail e senha no cadastro.
  - O sistema deve validar se o e-mail possui formato válido e se a senha atende aos critérios mínimos de segurança definidos.
  - Quando os dados atenderem às regras de validação, o sistema deve criar a conta e disponibilizá-la para autenticação.
  - Quando os dados não atenderem às regras de validação, o sistema deve impedir o cadastro e indicar o campo que precisa ser corrigido.
  - O sistema deve impedir o cadastro de um e-mail que já esteja associado a outra conta.
  - A senha não deve ser armazenada em texto puro.
- **Prioridade:** Alta
- **Story Points:** 3
- **Requisitos relacionados:** RF01, RNF01, RNF02

## US02 — Entrar e sair da conta
- **História:** Como usuário cadastrado, quero entrar e sair da minha conta, para controlar o acesso aos meus dados.
- **Critérios de aceitação:**
  - O usuário deve conseguir entrar com e-mail e senha válidos.
  - Credenciais inválidas não devem permitir acesso, e o sistema deve informar que os dados estão incorretos.
  - Somente usuários autenticados devem conseguir acessar as funcionalidades e páginas restritas da plataforma.
  - O usuário deve conseguir encerrar sua sessão por meio de uma opção de logout.
  - Após encerrar a sessão, o usuário deve ser redirecionado para uma página pública ou de login.
  - Após o logout, o usuário não deve conseguir acessar páginas restritas utilizando a sessão encerrada.
- **Prioridade:** Alta
- **Story Points:** 3
- **Requisitos relacionados:** RF02, RF03, RNF01, RNF02

## US03 — Registrar meu bem-estar
- **História:** Como usuário autenticado, quero registrar informações sobre meu bem-estar, para acompanhar minha rotina ao longo do tempo.
- **Critérios de aceitação:**
  - O formulário deve permitir registrar obrigatoriamente humor, estresse, qualidade do sono e energia e disposição, utilizando escalas de 1 a 5.
  - O indicador de humor deve apresentar representações de expressões faciais para os valores da escala.
  - Os indicadores de estresse, qualidade do sono e energia e disposição devem apresentar escalas numéricas sem representações faciais.
  - O formulário deve permitir informar opcionalmente a quantidade de minutos dedicados à atividade física, aceitando apenas valores inteiros e não negativos.
  - O formulário deve disponibilizar um campo opcional de texto livre para observações pessoais.
  - O sistema deve validar o preenchimento dos campos obrigatórios e os valores informados.
  - Após salvar com sucesso, o registro deve ficar associado à conta autenticada e não deve aparecer para outra conta.
  - O sistema deve confirmar o salvamento bem-sucedido e informar quando houver falha.
- **Prioridade:** Alta
- **Story Points:** 5
- **Requisitos relacionados:** RF04, RNF02, RNF03, RNF05

## US04 — Visualizar meu painel
- **História:** Como usuário, quero visualizar um painel com resumos dos meus registros, para observar informações recentes sobre meu bem-estar.
- **Critérios de aceitação:**
  - O painel deve apresentar médias, humor mais recente e registros recentes disponíveis.
  - As informações exibidas devem corresponder exclusivamente aos registros do usuário autenticado.
  - Quando o usuário ainda não possuir registros, o sistema deve apresentar uma mensagem informativa indicando a ausência de dados.
  - O painel deve atualizar as informações exibidas conforme novos registros forem realizados.
- **Prioridade:** Alta
- **Story Points:** 5
- **Requisitos relacionados:** RF05, RNF02, RNF03, RNF05

## US05 — Consultar meu histórico
- **História:** Como usuário autenticado, quero consultar meus registros de bem-estar por período, para acompanhar e comparar minhas informações ao longo do tempo.
- **Critérios de aceitação:**
  - O usuário deve poder selecionar um período para consulta.
  - O sistema deve apresentar os registros da conta autenticada correspondentes ao período selecionado.
  - Quando não existirem registros no período selecionado, o sistema deve apresentar uma mensagem informativa indicando a ausência de dados.
  - As comparações devem identificar o período consultado e apresentar informações descritivas, sem diagnósticos ou conclusões clínicas automáticas.
  - Quando os dados forem apresentados em gráficos, deve existir uma alternativa de consulta em tabela.
- **Prioridade:** Alta
- **Story Points:** 8
- **Requisitos relacionados:** RF06, RF12, RNF03, RNF04

## US06 — Manter meu diário pessoal
- **História:** Como usuário, quero criar, editar, consultar e excluir registros do diário, para manter minhas reflexões organizadas.
- **Critérios de aceitação:**
  - O usuário deve conseguir criar e consultar seus registros do diário.
  - O usuário deve conseguir editar e excluir somente seus próprios registros.
  - O sistema deve impedir que um usuário acesse ou altere registros pertencentes a outra conta.
  - Após editar um registro, uma nova consulta deve mostrar o conteúdo atualizado.
  - Após excluir um registro, ele não deve mais aparecer na consulta.
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
  - Antes de excluir a conta, o sistema deve solicitar uma confirmação do usuário.
  - A exclusão da conta deve remover também os registros associados, conforme previsto pelo sistema.
- **Prioridade:** Média
- **Story Points:** 8
- **Requisitos relacionados:** RF10, RNF02, RNF05, RNF08

## US09 — Consultar informações sobre o MindTrack
- **História:** Como visitante, quero consultar a página institucional e as perguntas frequentes, para compreender a proposta e o funcionamento do sistema.
- **Critérios de aceitação:**
  - A página institucional deve apresentar informações sobre o MindTrack.
  - A seção de perguntas frequentes deve estar disponível para consulta na interface pública.
- **Prioridade:** Baixa
- **Story Points:** 2
- **Requisitos relacionados:** RF11, RNF04
