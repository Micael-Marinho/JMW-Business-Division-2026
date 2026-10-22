# Requisitos Não Funcionais — MindTrack

## RNF01 — Proteção de senhas
- **Descrição:** O sistema deve armazenar senhas utilizando um mecanismo de derivação criptográfica, sem guardar senhas em texto puro.
- **Categoria:** Segurança
- **Prioridade:** Alta
- **Requisitos relacionados:** RF01, RF02

## RNF02 — Proteção de sessões e dados pessoais
- **Descrição:** O sistema deve proteger as sessões autenticadas e restringir o acesso aos dados pessoais ao usuário autorizado.
- **Categoria:** Segurança e privacidade
- **Prioridade:** Alta
- **Requisitos relacionados:** RF01, RF02, RF03, RF07, RF10

## RNF03 — Clareza das informações
- **Descrição:** O sistema deve apresentar indicadores de bem-estar de forma descritiva, sem realizar diagnósticos ou afirmar causas clínicas.
- **Categoria:** Usabilidade e clareza
- **Prioridade:** Alta
- **Requisitos relacionados:** RF04, RF05, RF06

## RNF04 — Acessibilidade e preferências visuais
- **Descrição:** A interface deve oferecer tema claro, escuro e automático, além de opções de contraste aumentado e movimento reduzido.
- **Categoria:** Acessibilidade e usabilidade
- **Prioridade:** Média
- **Requisitos relacionados:** RF08, RF09, RF11, RF12

## RNF05 — Consistência dos registros
- **Descrição:** O sistema deve manter os registros associados à conta correta e refletir as operações de criação, edição e exclusão realizadas pelo usuário.
- **Categoria:** Confiabilidade
- **Prioridade:** Alta
- **Requisitos relacionados:** RF04, RF07, RF10

## RNF06 — Compatibilidade com navegadores
- **Descrição:** A aplicação web deve funcionar nos navegadores modernos compatíveis com as tecnologias utilizadas pelo projeto.
- **Categoria:** Compatibilidade
- **Prioridade:** Média
- **Requisitos relacionados:** RF01 a RF12

## RNF07 — Testabilidade
- **Descrição:** As funcionalidades do servidor devem permitir a execução de testes automatizados para verificar seus comportamentos principais.
- **Categoria:** Manutenibilidade e qualidade
- **Prioridade:** Média
- **Requisitos relacionados:** RF01 a RF10

## RNF08 — Exportação legível dos dados
- **Descrição:** A exportação da conta deve disponibilizar os dados em formato JSON válido para uso externo.
- **Categoria:** Interoperabilidade
- **Prioridade:** Média
- **Requisitos relacionados:** RF10
