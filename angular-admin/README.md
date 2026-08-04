# AngularAdmin

Painel administrativo da Invista Publicidade — gestão de clientes, chapas, serviços, notas e estoque.

Gerado com [Angular CLI](https://github.com/angular/angular-cli) 14.2.1.

## ⚠️ Node 16

O projeto é **Angular 14**, que suporta oficialmente **Node 14 ou 16**. Com Node 18+ o build falha em erros de OpenSSL. A versão está fixada em [`.nvmrc`](../.nvmrc):

```sh
nvm use          # le o .nvmrc na raiz do repositorio
node --version   # deve ser v16.x
```

Se você mantém outros projetos em Node mais novo e não quer trocar a versão da máquina, dá para buildar em container:

```sh
docker run --rm -v "$PWD":/src:ro -v "$PWD/dist":/out node:16-bullseye bash -c '
  mkdir -p /build && cp -r /src/. /build/ && cd /build &&
  npm ci && npx ng build --configuration production &&
  cp -r dist/. /out/'
```

## Desenvolvimento

```sh
npm ci
npm start          # ou: ng serve  ->  http://localhost:4200
```

O ambiente de desenvolvimento aponta para a API local (`http://localhost:8002/api/admin`), configurada em [`src/environments/environment.ts`](src/environments/environment.ts). Para subir a API, veja o repositório `invista-admin-microservice`.

## Build de produção

```sh
ng build --configuration production
```

Os artefatos saem em `dist/angular-admin/`. O `environment.prod.ts` aponta para a API no Heroku.

Os arquivos `main`, `styles`, `polyfills` e `runtime` carregam **hash de conteúdo** no nome — só mudam quando o conteúdo muda. O `index.html` é o único servido sob nome fixo, e por isso o único que precisa de invalidação de cache no deploy.

## Deploy

A hospedagem é **S3 + CloudFront**, declarada em Terraform no repositório `invista-admin-microservice`, em `infra/`.

O deploy não é feito por upload manual. O procedimento é:

1. Gerar o build de produção
2. Copiar `dist/angular-admin/` para `infra/frontend-dist/` no repositório do backend
3. Rodar `terraform apply` — ele sincroniza os objetos no S3, remove os do build anterior e invalida o `index.html` no CloudFront

Detalhes em `docs/concepts/09_deployment_and_environments.md`, no repositório do backend.

> As instruções antigas deste README mandavam subir os arquivos à mão para o bucket `invista-admin-frontend`, dentro de uma pasta `invista`, numa conta AWS que não é mais usada. Nada disso vale: a infraestrutura foi migrada de conta em agosto de 2026, o prefixo `invista` deixou de existir e o publish passou a ser via Terraform.

## Autenticação

A API responde com um JWT em cookie `HttpOnly`. O [`CredentialsInterceptor`](src/app/interceptors/credentials.interceptor.ts) envia as credenciais em toda requisição e, quando a API devolve 401 ou 403, devolve o usuário à tela de login — exceto quando quem falhou foi o próprio `/login`, para não esconder a mensagem de senha incorreta.

## Estrutura

```text
src/app/
  public/          telas acessíveis sem sessão (login, register)
  secure/          telas autenticadas; SecureComponent resolve o usuário antes de renderizar
  services/        clientes HTTP da API, um por recurso
  interceptors/    credenciais e tratamento de sessão expirada
  interfaces/      tipos do domínio
  emitters/        estado de autenticação compartilhado
```

## Testes

```sh
ng test
```
