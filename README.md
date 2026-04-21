# Controle de Mensalidades

Sistema web local para controle de mensalidades da Raiz Jiu Jitsu - Sirinhaem.

## Recursos

- Cadastro de alunos com CPF, e-mail, turma, matricula, vencimento da mensalidade e desligamento.
- Registro de pagamentos por aluno, mes, valor, forma de pagamento e data.
- Dashboard com indicadores, matriz mensal e painel de inadimplencia por referencia.
- Busca por codigo, nome, CPF e e-mail.
- Historico de alteracoes em banco local.
- Exportacao CSV e backup JSON.
- Banco central em arquivo local para uso em mais de um navegador na mesma maquina.

## Como Rodar

Requisitos:

- Node.js instalado.

No terminal, dentro da pasta do projeto:

```powershell
node server.js
```

Depois acesse:

[http://127.0.0.1:4173/](http://127.0.0.1:4173/)

No Windows, voce tambem pode abrir:

```powershell
iniciar-sistema.cmd
```

## Banco de Dados

O sistema cria automaticamente o banco local em:

```text
data/database.json
```

Esse arquivo pode conter dados reais de alunos, CPF, e-mail e pagamentos. Por isso, ele esta no `.gitignore` e nao deve ser enviado ao GitHub.

Um exemplo sem dados reais fica em:

```text
data/database.example.json
```

Em producao, se a variavel `DATABASE_URL` existir, o sistema usa Postgres em vez do arquivo `data/database.json`.

## Backup

Dentro do sistema, use o botao `Backup` para exportar uma copia JSON dos dados.

Para restaurar dados em outro navegador ou maquina, use o botao `Importar`.

## Publicacao no GitHub

Este projeto usa servidor local (`server.js`) e banco em arquivo. Ele nao deve ser publicado apenas com GitHub Pages, porque GitHub Pages nao executa servidor Node.js nem grava banco local.

O link do GitHub Pages pode servir a interface estatica:

[https://nathanlenon.github.io/controle-mensalidades/](https://nathanlenon.github.io/controle-mensalidades/)

Porem, nesse modo, o sistema nao tera o banco central compartilhado em `data/database.json`. Os dados ficam limitados ao armazenamento do navegador usado, como uma versao demonstrativa.

Para ativar o GitHub Pages:

1. Abra o repositorio no GitHub.
2. Va em `Settings > Pages`.
3. Em `Build and deployment`, selecione `Deploy from a branch`.
4. Escolha `Branch: main` e pasta `/root`.
5. Salve e aguarde a publicacao.

Para hospedar online de verdade, use um ambiente com backend Node.js e banco externo, como:

- Render
- Railway
- Fly.io
- VPS
- Supabase/Postgres

## Hospedagem Gratuita

A opcao gratuita recomendada para este projeto e:

- Render Free: hospeda o servidor Node.js.
- Supabase Free: guarda o banco Postgres.

Essa combinacao evita depender de arquivos locais no servidor. Em hospedagens gratuitas, arquivos gravados no disco podem sumir em reinicios, pausas ou novos deploys.

O projeto ja inclui os arquivos necessarios:

- `package.json`, com o comando `npm start`.
- `render.yaml`, com um Web Service Node.js no plano gratuito.
- `server.js`, preparado para usar `PORT`, `HOST` e `DATABASE_URL`.

Configuracao usada em producao:

```text
Start Command: npm start
Health Check Path: /api/health
DATABASE_URL: string de conexao do Postgres/Supabase
```

Passo a passo recomendado:

1. Crie uma conta gratuita no Supabase.
2. Crie um projeto no Supabase.
3. Clique em `Connect` no Supabase e copie a string `Session pooler`.
4. Crie uma conta gratuita no Render.
5. Clique em `New > Blueprint`.
6. Conecte o repositorio `nathanlenon/controle-mensalidades`.
7. Confirme o arquivo `render.yaml`.
8. Quando o Render pedir a variavel `DATABASE_URL`, cole a string `Session pooler` do Supabase e substitua `[YOUR-PASSWORD]` pela senha do banco.
9. Aguarde o deploy terminar e abra a URL `.onrender.com`.

O sistema cria automaticamente a tabela `app_store` no Postgres no primeiro acesso.

Limites importantes do gratuito:

- Render Free pode pausar o servidor depois de alguns minutos sem acesso. O primeiro acesso apos pausa pode demorar.
- Render Free nao tem disco persistente; por isso o banco fica no Supabase.
- Render pode precisar da string `Session pooler` do Supabase porque conexoes diretas do Supabase usam IPv6 por padrao.
- Supabase Free tem limite de banco de dados. Para este sistema, o uso esperado deve caber bem no plano gratuito.

Referencias:

- [Render Free](https://render.com/docs/free)
- [Render Web Services](https://render.com/docs/web-services)
- [Render Blueprint YAML](https://render.com/docs/blueprint-spec)
- [Supabase Billing](https://supabase.com/docs/guides/platform/billing-on-supabase)
- [Supabase Connection Strings](https://supabase.com/docs/reference/postgres/connection-strings)

## Hospedagem Gratuita no Netlify

O projeto tambem esta preparado para Netlify:

- `netlify.toml` publica a interface estatica em `dist`.
- `scripts/build-netlify.js` copia apenas os arquivos publicos.
- `netlify/functions/api.js` responde as rotas `/api/state`, `/api/history` e `/api/health`.
- O banco online continua sendo o Supabase via `DATABASE_URL`.

Passo a passo:

1. Crie um projeto gratuito no Supabase.
2. No Supabase, clique em `Connect` e copie a string `Session pooler`.
3. No Netlify, clique em `Add new project > Import an existing project`.
4. Conecte o GitHub e selecione `nathanlenon/controle-mensalidades`.
5. Confirme as configuracoes detectadas pelo `netlify.toml`:
   - Build command: `npm run build:netlify`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`
6. Em `Site configuration > Environment variables`, adicione:
   - `DATABASE_URL`: string `Session pooler` do Supabase com a senha preenchida.
7. Faca o deploy.

No Netlify, variaveis como `DATABASE_URL` devem ser cadastradas no painel, nao no `netlify.toml`, para ficarem disponiveis nas Functions.

Referencias:

- [Netlify Functions environment variables](https://docs.netlify.com/functions/environment-variables/)
- [Netlify redirects](https://docs.netlify.com/routing/redirects/)

## Privacidade

Antes de publicar qualquer versao do projeto:

- Confira se `data/database.json` nao esta rastreado pelo Git.
- Confira se arquivos de log ou capturas locais nao estao rastreados.
- Nao coloque CPF, e-mail ou dados de pagamento em arquivos versionados.

Comandos uteis:

```powershell
git status --short
git ls-files data/database.json
git check-ignore -v data/database.json
```
