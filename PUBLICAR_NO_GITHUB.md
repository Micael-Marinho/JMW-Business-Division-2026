# Publicar o código

O pacote contém código, README, documentação, testes, migrações e lockfiles npm. O `.gitignore` exclui dependências instaladas, `.env`, builds e arquivos temporários.

## GitHub Desktop

1. Abra **File > Add local repository** e selecione a pasta do projeto.
2. Se a pasta ainda não for um repositório, use a opção de criar um repositório nessa pasta.
3. Confira **Changes**. `README.md`, `package.json`, `frontend`, `src` e `server` devem estar diretamente na raiz. `.env` e `node_modules` não devem aparecer na lista.
4. Escreva um resumo, por exemplo `Adiciona projeto acadêmico MindTrack`, e faça o commit.
5. Use **Publish repository** e escolha nome, conta e visibilidade. Se já houver um remoto, use o fluxo de push do seu repositório existente.

O README inclui os nomes e RAs fornecidos para a identificação acadêmica. O grupo deve escolher a visibilidade adequada.

## Banco e execução

Envie as migrações SQL, não o banco preenchido ou suas credenciais. Cada integrante configura seu `.env` e PostgreSQL seguindo o README. O repositório guarda o código; a publicação nele não inicia a API nem provisiona o banco.

## Atualizações futuras

Salve os arquivos, confira o diff, faça o commit e envie com **Push origin**. Se já fez alterações locais, preserve-as ao incorporar esta edição, conforme `ATUALIZAR.md`.

Referência: https://docs.github.com/pt/desktop/adding-and-cloning-repositories/adding-an-existing-project-to-github-using-github-desktop
