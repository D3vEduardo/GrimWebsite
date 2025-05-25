# GrimWebsite

Este site é uma "hobby page" que serve como um mini "about me". Foi desenvolvido por Eduardo Developer (github.com/d3veduardo) para o usuário Grim.

Este é um projeto [Next.js](https://nextjs.org) que inclui integração com o Lanyard para exibir informações em tempo real do Discord e Spotify.

## Funcionalidades

- Exibição de informações do perfil do Discord em tempo real
- Monitoramento e exibição da música atual do Spotify
- Interface moderna e responsiva

## Configuração do Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou pnpm

### Instalação

```bash
# Instalar dependências
pnpm install
```

## Executando o Projeto

### Desenvolvimento

Para iniciar o projeto em modo de desenvolvimento:

```bash
# Iniciar o servidor de desenvolvimento
pnpm run dev
```

O servidor de desenvolvimento iniciará automaticamente o worker do Lanyard que monitora as músicas do Spotify em segundo plano.

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

Você pode começar a editar a página modificando `app/page.tsx`. A página atualiza automaticamente conforme você edita o arquivo.

### Produção

Para construir e iniciar o projeto em modo de produção:

```bash
# Iniciar o servidor de produção
pnpm run start
```

## Estrutura do Projeto

- `src/libs/lanyard/` - Contém a integração com o Lanyard
  - `latestMusicListened.ts` - API para acessar os dados da última música ouvida

## Recursos Adicionais

Para saber mais sobre Next.js, consulte os seguintes recursos:

- [Documentação do Next.js](https://nextjs.org/docs) - aprenda sobre os recursos e API do Next.js.
- [Aprenda Next.js](https://nextjs.org/learn) - um tutorial interativo de Next.js.

## Deploy na Vercel

A maneira mais fácil de implantar seu aplicativo Next.js é usar a [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) dos criadores do Next.js.

Consulte nossa [documentação de implantação do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.
