# Privacidade e tratamento de dados

Este documento descreve o comportamento técnico desta versão. Não declara conformidade jurídica integral nem substitui avaliação do tratamento pela equipe e instituição.

## Dados e finalidade

Nome e dados de autenticação permitem manter o espaço pessoal. Check-ins e textos são armazenados para consulta pelo titular e cálculo de indicadores descritivos. Atividade física, observações e diário são opcionais. Não se solicita telefone, endereço, diagnóstico ou documentos pessoais.

E-mail, hash de senha, dados de sessão e registros pessoais permanecem no PostgreSQL. A API verifica o titular em todas as operações.

## Acesso e infraestrutura

A API filtra todas as operações pelo titular autenticado. Não existe console administrativo de leitura de diários. Isso é autorização na aplicação, e não criptografia de ponta a ponta: operadores com acesso técnico ao banco podem alcançar dados e devem trabalhar sob políticas próprias de privilégio mínimo.

Não há compartilhamento público, publicidade, IA, análise de textos por serviços externos ou logs de conteúdo pessoal. Preferências de tema e acessibilidade ficam no navegador; check-ins reais ficam no banco.

## Retenção, exportação e exclusão

Os dados ativos permanecem até exclusão individual ou exclusão da conta. A exportação JSON inclui perfil, check-ins e diário do titular. A exclusão de conta apaga os dados ativos relacionados e também remove as sessões.

Não foi criado um sistema de backup do produto. Eventuais snapshots e backups da infraestrutura possuem regras do provedor que ainda devem ser definidas pelo responsável pela implantação. Não se promete eliminação instantânea dessas cópias.

## Aceite e próximos passos

A interface registra o aceite do aviso versão 2026-10-v1 ao criar o espaço pessoal. Esse registro não resolve sozinho a adequação do tratamento de dados de bem-estar à LGPD.

Antes de uso público, o grupo deverá definir responsável pelo tratamento, contato para solicitações, finalidade e fundamento jurídico apropriados, controle de acesso operacional, retenção de backups e procedimento de incidentes. A entrega é destinada à avaliação acadêmica, preferencialmente com dados fictícios de teste.
