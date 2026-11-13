import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/portfolio",
  "/sobre",
  "/contato",
  "/criacao-de-sites-fortaleza",
  "/landing-pages",
  "/sites-para-empresas",
  "/sistemas-web",
  "/apps-mobile",
  "/automacoes",
  "/manutencao-de-sites",
];

for (const route of routes) {
  test("rota pública: " + route, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main#conteudo")).toBeVisible();
    await expect(page.locator("main h1").first()).toBeVisible();
    await expect(page).toHaveTitle(/MOX\./);
  });
}

test("navegação principal abre o portfólio", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Principal" })
    .getByRole("link", { name: "Portfólio" })
    .click();
  await expect(page).toHaveURL(/\/portfolio$/);
});

test("briefing prepara a mensagem de contato", async ({ page }) => {
  await page.addInitScript(() => {
    window.open = () => null;
  });
  await page.goto("/contato");
  await page.getByLabel("Seu nome").fill("Cliente Teste");
  await page.getByLabel("E-mail ou telefone").fill("cliente@example.com");
  await page.getByLabel("O que você precisa?")
    .selectOption({ label: "Site institucional" });
  await page.getByLabel("Conte um pouco sobre o projeto")
    .fill("Preciso de um novo site para apresentar serviços e receber contatos.");
  await page.getByRole("button", { name: /Continuar no WhatsApp/ }).click();

  const status = page.getByRole("status");
  await expect(status).toContainText("Sua mensagem está pronta");
  const href = await status.getByRole("link", { name: /Abrir conversa no WhatsApp/ })
    .getAttribute("href");
  expect(href).toMatch(/^https:\/\/wa\.me\/55\d{10,11}\?text=/);
  const message = new URL(href!).searchParams.get("text");
  expect(message).toContain("Cliente Teste");
  expect(message).toContain("Site institucional");
});

test("caminho desconhecido retorna 404", async ({ page }) => {
  const response = await page.goto("/rota-inexistente");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("link", { name: /Voltar para o início/ })).toBeVisible();
});
