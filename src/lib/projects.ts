export const projects = [
  {
    id: "mox-recibos",
    name: "Mox Recibos",
    category: "Produtividade · Aplicação web",
    description:
      "Editor de recibos, faturas e contratos com biblioteca de modelos, rascunhos salvos no navegador e exportação em PDF.",
    url: "https://moxrecibos.vercel.app/",
    image: "/projects/mox-recibos.jpg",
    accent: "#a16af0",
  },
  {
    id: "irene",
    name: "Irene Comida Saudável",
    category: "Alimentação · Cardápio digital",
    description:
      "Cardápio interativo, montagem de kits e um caminho direto para o atendimento. Uma experiência pensada para a escolha dos produtos no celular.",
    url: "",
    image: null,
    accent: "#bccb99",
  },
  {
    id: "one-two",
    name: "One Two Drink",
    category: "Eventos · Site institucional",
    description:
      "Apresentação de coquetelaria para eventos, carta de drinks e solicitação de orçamento com as informações do evento organizadas para o WhatsApp.",
    url: "https://onetwodrink.vercel.app/",
    image: "/projects/one-two.jpg",
    accent: "#d6ba93",
  },
  {
    id: "g3",
    name: "G3 Gamer Store",
    category: "Varejo · Experiência de compra",
    description:
      "Apresentação de produtos e categorias gamer, com uma experiência interativa para montagem de computadores.",
    url: "https://g3-gamer-store.vercel.app/",
    image: "/projects/g3.jpg",
    accent: "#aba1e6",
  },
  {
    id: "ze-mexicano",
    name: "Zé Mexicano",
    category: "Gastronomia · Site & reservas",
    description:
      "Identidade do restaurante, cardápio, eventos e um fluxo de reserva que prepara o contato pelo WhatsApp.",
    url: "https://ze-mexicano.vercel.app/",
    image: "/projects/ze-mexicano.jpg",
    accent: "#d99c77",
  },
  {
    id: "mox-streaming",
    name: "MOX Streaming",
    category: "Entretenimento · Aplicação web",
    description:
      "Projeto de interface para streaming, desenvolvido com React e TypeScript. Navegação e apresentação de conteúdo em uma experiência digital própria.",
    url: "https://mox-streaming.vercel.app/",
    image: "/projects/mox-streaming.jpg",
    accent: "#999dc4",
  },
  {
    id: "scarpa",
    name: "Scarpa Chaveiro 24h",
    category: "Serviço local · Presença digital",
    description:
      "Site de serviço local apresentado com acesso direto à versão pública. Uma referência de presença digital voltada ao atendimento.",
    url: "https://scarpacheveiro24h.vercel.app/",
    image: "/projects/scarpa.jpg",
    accent: "#b6b9aa",
  },
  {
    id: "dental-blue-birdie",
    name: "Blue Birdie Odontologia",
    category: "Saúde · Site institucional",
    description:
      "Página pública de apresentação de consultório odontológico, serviços e canais de atendimento.",
    url: "https://dental-blue-birdie.vercel.app/",
    image: "/projects/dental-blue-birdie.jpg",
    accent: "#a7bed3",
  },
  {
    id: "heroes-finance",
    name: "Heroes Finance",
    category: "Finanças · Aplicação web",
    description: "Tela pública de acesso a um workspace financeiro pessoal.",
    url: "https://heroesfinance.vercel.app/",
    image: "/projects/heroes-finance.jpg",
    accent: "#ada2d3",
  },
  {
    id: "crm-heroes",
    name: "CRM Heroes",
    category: "Vendas · Aplicação web",
    description:
      "Apresentação pública e acesso ao workspace de prospecção e relacionamento comercial.",
    url: "https://crm-heroes.vercel.app/",
    image: "/projects/crm-heroes.jpg",
    accent: "#9bb5d4",
  },
  {
    id: "auto-catalogo",
    name: "Auto-Catálogo",
    category: "Comércio · Catálogo digital",
    description:
      "Página pública de apresentação de catálogo digital com pedidos por WhatsApp.",
    url: "https://auto-catalogo.vercel.app/",
    image: "/projects/auto-catalogo.jpg",
    accent: "#b0c99c",
  },
];

// Only public sites with verified previews are shown; Irene awaits a live URL.
export const publishedProjects = projects.filter(
  (project) => project.url && project.image,
);
