# Arquitetura técnica — MOX.

## Contexto

O site institucional da MOX. foi construído com Next.js App Router para apresentar serviços, portfólio e contatos comerciais. Não existe neste repositório backend de CRM, autenticação, banco de dados ou armazenamento próprio de leads.

## Responsabilidades

| Módulo | Responsabilidade |
| --- | --- |
| src/app | Layout, rotas, metadados, sitemap e robots |
| src/app/[slug] | Páginas de serviços a partir do catálogo |
| src/lib/site.ts | Configuração, SEO, contatos e catálogo de serviços |
| src/lib/projects.ts | Projetos e filtragem do portfólio |
| src/components | UI, navegação, formulário, animações e cenas |
| public | Assets estáticos e imagens |

O catálogo de serviços é fonte para generateStaticParams, links do menu e sitemap. Para cadastrar um serviço, atualize os dados e confira a existência da arte correspondente.

## Renderização

Os conteúdos e metadados são gerados em componentes servidor; elementos que dependem de estado, eventos e APIs do navegador usam componentes cliente. Conteúdo essencial deve permanecer legível sem as animações.

## Experiência visual

GSAP e ScrollTrigger são carregados dinamicamente. A cena orbital utiliza renderizadores diferentes para desktop e mobile, respeita a preferência por movimento reduzido e possui fallback caso a inicialização gráfica falhe. O custo de CPU/GPU e Web Vitals precisa de medições reais.

## SEO

Metadados de compartilhamento e canonical são centralizados. A indexação é bloqueada por padrão, e só pode ser habilitada com URL canônica HTTPS e a variável NEXT_PUBLIC_ALLOW_INDEXING=true. Revise Search Console, metadados e sitemap após configurar o domínio.

## Contato

O formulário prepara uma mensagem para WhatsApp após validação no navegador. O usuário deve revisar e enviar a mensagem no aplicativo externo. Não há armazenamento local ou servidor dos dados do briefing.

## Qualidade

Use branches e PRs; execute lint, typecheck, build e testes. Antes de publicar, verifique mobile, teclado, foco, movimento reduzido, formulários, contatos e SEO.

## Backlog

- Otimizar imagens de serviços, especialmente as de vários megabytes.
- Medir Web Vitals e custo de WebGL em dispositivos modestos.
- Cobrir acessibilidade e regressões visuais com testes específicos.
- Consolidar design tokens e observabilidade de produção.

Não há justificativa técnica demonstrada para adicionar microsserviços, filas ou autenticação ao site institucional.
