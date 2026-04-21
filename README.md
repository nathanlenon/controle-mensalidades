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

Para hospedar online de verdade, sera necessario adaptar o backend para um ambiente com banco de dados, como:

- Render
- Railway
- Fly.io
- VPS
- Supabase/Postgres

## Hospedagem Completa no Render

O projeto ja inclui os arquivos necessarios para publicar o sistema completo no Render:

- `package.json`, com o comando `npm start`.
- `render.yaml`, com um Web Service Node.js e disco persistente.
- `server.js`, preparado para usar `PORT`, `HOST` e `DATABASE_FILE`.

Configuracao usada em producao:

```text
Start Command: npm start
Health Check Path: /api/health
DATABASE_FILE: /var/data/database.json
Disco persistente: /var/data
```

Passo a passo recomendado:

1. Crie ou acesse sua conta no Render.
2. Clique em `New > Blueprint`.
3. Conecte o repositorio `nathanlenon/controle-mensalidades`.
4. Confirme o arquivo `render.yaml`.
5. Revise o plano e crie o servico.
6. Aguarde o deploy terminar e abra a URL `.onrender.com`.

Atencao: para manter o banco salvo online, o servico precisa de disco persistente. Sem disco persistente, alteracoes feitas em arquivos podem ser perdidas em reinicios ou novos deploys.

Referencias:

- [Render Web Services](https://render.com/docs/web-services)
- [Render Persistent Disks](https://render.com/docs/disks)
- [Render Blueprint YAML](https://render.com/docs/blueprint-spec)

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
