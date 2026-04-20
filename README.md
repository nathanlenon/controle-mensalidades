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

Para hospedar online de verdade, sera necessario adaptar o backend para um ambiente com banco de dados, como:

- Render
- Railway
- Fly.io
- VPS
- Supabase/Postgres

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
