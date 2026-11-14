# Requisitos Não Funcionais — MindTrack

## RNF01 — Proteção de senhas
- **Descrição:** O sistema deve armazenar senhas utilizando um mecanismo de derivação criptográfica, sem guardar senhas em texto puro.
- **Categoria:** Segurança
- **Prioridade:** Alta
- **Requisitos relacionados:** RF01, RF02

## RNF02 — Proteção de sessões e dados pessoais
- **Descrição:** O sistema deve impedir que usuários não autenticados acessem funcionalidades e dados privados e deve impedir que um usuário consulte ou altere registros pertencentes a outra conta. Após o encerramento da sessão, o acesso a áreas privadas deve exigir nova autenticação.
- **Categoria:** Segurança e privacidade
- **Prioridade:** Alta
- **Requisitos relacionados:** RF01, RF02, RF03, RF04, RF07, RF10

## RNF03 — Clareza das informações
- **Descrição:** Os indicadores de bem-estar devem ser apresentados com rótulos compreensíveis e sem diagnósticos ou afirmações de causalidade clínica. A verificação deve confirmar que as telas de registro, painel e histórico não apresentam conclusões clínicas automáticas.
- **Categoria:** Usabilidade e clareza
- **Prioridade:** Alta
- **Requisitos relacionados:** RF04, RF05, RF06

## RNF04 — Acessibilidade e preferências visuais
- **Descrição:** As opções de tema claro, escuro e automático, contraste aumentado e movimento reduzido devem ser aplicadas à interface quando selecionadas. Os dados exibidos em gráficos também devem estar disponíveis em tabela, permitindo sua consulta sem depender da interpretação visual dos gráficos.
- **Categoria:** Acessibilidade e usabilidade
- **Prioridade:** Média
- **Requisitos relacionados:** RF08, RF09, RF11, RF12

## RNF05 — Consistência dos registros
- **Descrição:** Cada registro criado deve permanecer associado à conta que o criou. Após criar, editar ou excluir um registro, uma nova consulta deve refletir a operação realizada, sem modificar os registros de outras contas.
- **Categoria:** Confiabilidade
- **Prioridade:** Alta
- **Requisitos relacionados:** RF04, RF07, RF10

## RNF06 — Compatibilidade com navegadores
- **Descrição:** As funcionalidades principais devem ser verificadas nas versões estáveis atuais de Google Chrome, Mozilla Firefox e Microsoft Edge, em ambiente desktop. Os testes devem confirmar o funcionamento do cadastro, login, encerramento de sessão, registro de check-in, visualização do painel e consulta ao histórico.
- **Categoria:** Compatibilidade
- **Prioridade:** Média
- **Requisitos relacionados:** RF01 a RF07, RF10

## RNF07 — Testabilidade
- **Descrição:** As principais operações do servidor, incluindo autenticação, criação e consulta de registros, edição e exclusão de registros do diário e gerenciamento da conta, devem permitir testes automatizados que validem respostas de sucesso e de erro, sem exigir interação manual com a interface.
- **Categoria:** Manutenibilidade e qualidade
- **Prioridade:** Média
- **Requisitos relacionados:** RF01 a RF07, RF10

## RNF08 — Exportação legível dos dados
- **Descrição:** O arquivo exportado deve ser um JSON sintaticamente válido, que possa ser interpretado por um analisador JSON e contenha os dados da conta e os registros associados disponibilizados pela funcionalidade de exportação.
- **Categoria:** Interoperabilidade
- **Prioridade:** Média
- **Requisitos relacionados:** RF10
