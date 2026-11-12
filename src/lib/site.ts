import type { Metadata } from "next";
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");
export const indexable =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" &&
  siteUrl.startsWith("https://");
export const whatsapp = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5585920118493"
).replace(/\D/g, "");
export const contacts = {
  phone: "(85) 99821-3158",
  whatsapp: "(85) 92011-8493",
  email: "moxdesenvolvimentotech@gmail.com",
  instagram: "moxdesenvolvimento",
  instagramUrl: "https://www.instagram.com/moxdesenvolvimento/",
};
export const contactHref =
  whatsapp && /^55\d{10,11}$/.test(whatsapp)
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent("Olá, MOX.! Quero conversar sobre meu projeto.")}`
    : "/contato";
export function seo(title: string, description: string, path = "/"): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "MOX.",
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "MOX. — Sites com estratégia. Negócios em movimento.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
export const services = [
  {
    slug: "criacao-de-sites-fortaleza",
    label: "Criação de sites em Fortaleza",
    short: "Presença local, alcance real.",
    title: "Seu próximo cliente pode estar procurando por você.",
    description:
      "Criação de sites em Fortaleza com estrutura para o Google, experiência mobile e caminhos claros para solicitar um orçamento.",
    intro:
      "Para quem tem um negócio em Fortaleza, um site precisa explicar o que a empresa faz, onde atende e como iniciar uma conversa. Construímos essa presença com conteúdo útil e uma navegação que funciona no celular.",
    items: [
      "Estrutura de páginas por serviço e intenção de busca",
      "Conteúdo local sobre sua área de atendimento real",
      "Títulos, links internos e dados estruturados coerentes",
      "Preparação para Search Console e medição de contatos",
    ],
    question: "Preciso ter um endereço comercial?",
    answer:
      "Não. O site pode informar sua área de atendimento sem divulgar ou inventar uma sede. A elegibilidade para o Perfil da Empresa no Google deve ser avaliada separadamente.",
  },
  {
    slug: "landing-pages",
    label: "Landing pages",
    short: "Uma campanha. Um próximo passo.",
    title: "Transforme o interesse da campanha em uma boa conversa.",
    description:
      "Landing pages para campanhas com proposta clara, experiência rápida no celular e foco na geração de contatos qualificados.",
    intro:
      "Quando o visitante chega de um anúncio, a página precisa continuar a conversa. Alinhamos mensagem, oferta e chamada para ação ao objetivo da sua campanha, sem distrações que afastam a decisão.",
    items: [
      "Mensagem alinhada ao anúncio e ao público",
      "Formulário com os campos necessários para qualificar",
      "Versão mobile e carregamento enxuto",
      "Plano de eventos para avaliar conversões reais",
    ],
    question: "Uma landing page substitui um site?",
    answer:
      "Depende do objetivo. Ela atende bem uma oferta ou campanha específica. Para apresentar vários serviços e desenvolver conteúdo orgânico, um site com páginas próprias costuma ser mais adequado.",
  },
  {
    slug: "sites-para-empresas",
    label: "Sites para empresas",
    short: "Sua empresa, bem apresentada.",
    title: "Uma presença digital à altura do seu negócio.",
    description:
      "Sites institucionais para empresas que precisam apresentar serviços com clareza, construir confiança e receber pedidos de proposta.",
    intro:
      "Organizamos as informações que o cliente precisa antes de contratar: o que você entrega, como trabalha e qual é o próximo passo. O design acompanha sua marca e o conteúdo responde às dúvidas da compra.",
    items: [
      "Arquitetura de informação por serviço e público",
      "Páginas institucionais com conteúdo original",
      "Componentes acessíveis e navegação responsiva",
      "Orientações para atualização e manutenção",
    ],
    question: "Podemos aproveitar o conteúdo do site atual?",
    answer:
      "Sim. O primeiro passo é revisar o material existente, identificar páginas úteis e planejar redirecionamentos quando houver mudança de URLs. Textos e imagens precisam ter autorização de uso.",
  },
  {
    slug: "sistemas-web",
    label: "Sistemas web",
    short: "Menos atrito. Mais operação.",
    title: "Seu processo pode funcionar melhor na web.",
    description:
      "Desenvolvimento de sistemas web sob medida, com descoberta de requisitos, fluxos de operação e evolução por etapas.",
    intro:
      "Planilhas desconectadas, retrabalho e informações espalhadas podem sinalizar a necessidade de um sistema. Antes de programar, mapeamos o processo para entender o que precisa mudar e o que pode continuar simples.",
    items: [
      "Mapeamento de usuários, permissões e processos",
      "Definição de uma primeira entrega com escopo claro",
      "Integrações avaliadas conforme os serviços envolvidos",
      "Critérios de aceite, segurança e plano de evolução",
    ],
    question: "Como o orçamento é definido?",
    answer:
      "A partir dos fluxos, perfis de usuário, integrações e requisitos de dados. Uma conversa inicial ajuda a separar o essencial da evolução futura antes de estimar prazo e investimento.",
  },
  {
    slug: "apps-mobile",
    label: "Apps mobile",
    short: "Sua experiência, na palma da mão.",
    title: "Uma ideia útil merece acompanhar o seu cliente.",
    description:
      "Desenvolvimento de aplicativos mobile com definição de jornadas, funcionalidades e integrações para o contexto do seu negócio.",
    intro:
      "Um aplicativo faz sentido quando resolve uma necessidade recorrente de quem o utiliza. Começamos pelas jornadas e pelos dispositivos do público para definir a primeira versão, as integrações e os critérios de uso antes de escolher a tecnologia.",
    items: [
      "Mapeamento das jornadas e das funcionalidades essenciais",
      "Protótipo navegável com foco na experiência em telas pequenas",
      "Avaliação de integrações, autenticação e notificações",
      "Planejamento de testes, distribuição e evolução do aplicativo",
    ],
    question: "Todo negócio precisa de um aplicativo?",
    answer:
      "Não. Em alguns casos, um site responsivo ou uma aplicação web atende melhor à necessidade. Avaliamos frequência de uso, recursos do dispositivo e orçamento antes de recomendar um app. A publicação nas lojas e as contas necessárias são definidas no escopo.",
  },
  {
    slug: "automacoes",
    label: "Automações",
    short: "Menos tarefas repetidas. Mais tempo útil.",
    title: "Conecte as etapas que hoje dependem de trabalho manual.",
    description:
      "Automações de processos e integrações entre ferramentas para reduzir tarefas repetitivas e organizar os fluxos da sua empresa.",
    intro:
      "Copiar informações de uma ferramenta para outra e acompanhar cada etapa manualmente consome tempo. Mapeamos o processo, identificamos os pontos de repetição e desenhamos automações com regras, registro de execução e tratamento de falhas.",
    items: [
      "Diagnóstico do processo e dos pontos de trabalho repetitivo",
      "Integrações conforme as APIs e permissões das ferramentas",
      "Regras de validação, notificações e etapas de revisão humana",
      "Registros de execução e caminhos de recuperação em caso de falha",
    ],
    question: "Quais ferramentas podem ser integradas?",
    answer:
      "Depende das APIs, dos planos contratados e das permissões disponíveis em cada serviço. Verificamos essas condições antes da proposta. Custos de ferramentas externas e limites de uso são apresentados separadamente quando aplicáveis.",
  },
  {
    slug: "manutencao-de-sites",
    label: "Manutenção de sites",
    short: "Seu site precisa continuar funcionando bem.",
    title: "Cuide do que já está no ar. Prepare o que vem depois.",
    description:
      "Manutenção de sites com diagnóstico técnico, correções, atualizações de conteúdo e planejamento de melhorias por prioridade.",
    intro:
      "Depois da publicação, o site continua precisando de atenção. Podemos revisar formulários, corrigir problemas de navegação, atualizar conteúdo e avaliar dependências, desempenho e acessibilidade, de acordo com a tecnologia e os acessos disponíveis.",
    items: [
      "Diagnóstico inicial e organização dos problemas por impacto",
      "Correções de páginas, formulários e comportamento responsivo",
      "Atualizações avaliadas com backup e possibilidade de reversão",
      "Plano de melhorias, documentação e definição de responsabilidades",
    ],
    question: "Vocês mantêm sites desenvolvidos por outras equipes?",
    answer:
      "Podemos avaliar. Primeiro precisamos conhecer a tecnologia, a hospedagem e os acessos autorizados. O diagnóstico define o que é viável manter, quais riscos existem e se há necessidade de uma recuperação ou reconstrução. Prazos de atendimento são acordados na proposta.",
  },
];
export const paths = [
  "/",
  ...services.map((s) => `/${s.slug}`),
  "/portfolio",
  "/sobre",
  "/contato",
];
