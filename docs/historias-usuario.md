# Histórias de usuário

## US01 — Acesso ao espaço pessoal

Como pessoa interessada em acompanhar minha rotina, quero criar uma conta e entrar no sistema, para manter meus registros vinculados a um espaço pessoal.

Critérios: nome entre 2 e 80 caracteres; aceite de privacidade; e-mail válido e senha de 10 a 128 caracteres; sessão autenticada; encerramento da sessão bloqueia consultas privadas.

## US02 — Check-in diário

Como usuário, quero registrar humor, estresse, sono e energia, para guardar como percebi meu dia.

Critérios: quatro escalas de 1 a 5; data válida e não futura; atividade opcional, com diferença entre zero e ausência; um registro por data; ao salvar, o dashboard utiliza o novo registro; erros não descartam o formulário.

## US03 — Revisitar um momento

Como usuário, quero editar ou excluir um check-in, para corrigir informações e manter meu histórico sob meu controle.

Critérios: edição carrega valores anteriores; regras de criação continuam válidas; exclusão pede confirmação; tentativa de alterar registro de outra conta retorna 404; o histórico reflete a ação.

## US04 — Acompanhar evolução

Como usuário, quero filtrar registros e visualizar gráficos, para observar mudanças nas minhas respostas ao longo do tempo.

Critérios: períodos de 7/14/30/90 dias e intervalo personalizado; média calculada apenas com registros existentes; visualização dos quatro indicadores; alternativa em tabela; ausência de dados tem estado vazio; nenhuma conclusão clínica ou causal.

## US05 — Diário pessoal

Como usuário, quero guardar e revisitar textos, para registrar pensamentos que não cabem nas escalas.

Critérios: título e texto obrigatórios; limites de caracteres; criação, edição e exclusão; acesso exclusivo do titular nas rotas; texto não entra no cálculo de indicadores.

## US06 — Aparência e leitura

Como usuário, quero escolher tema e opções de leitura, para ajustar a interface ao meu conforto.

Critérios: temas claro, escuro e automático; automático acompanha o sistema; preferência permanece no dispositivo; opção de redução de movimento; foco visível; gráficos mantêm alternativa textual.

## US07 — Controle dos dados

Como usuário, quero exportar meus registros e excluir meu perfil, para decidir sobre a permanência dos meus dados.

Critérios: exportação JSON só do titular e sem credenciais; exclusão exige EXCLUIR; remove registros e sessões locais; aviso explica limite de eventual retenção em backups.

## US08 — Entender o projeto

Como visitante, quero conhecer a proposta e experimentar exemplos, para entender o que a ferramenta faz antes de criar meu espaço.

Critérios: identificação acadêmica correta; exemplos rotulados; dados da demonstração não são persistidos; formulários não salvam no modo de exemplo; comunicação explica limites do produto.
