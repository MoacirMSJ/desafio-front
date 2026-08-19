import { test, expect } from "@playwright/test";

const CEP_ROTA = "**/viacep.com.br/ws/**/json*";

test.describe("Busca de CEP", () => {
  test("Cenário 1: CEP encontrado - exibe o endereço retornado", async ({ page }) => {
    await page.route(CEP_ROTA, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          cep: "01001-000",
          logradouro: "Praça da Sé",
          complemento: "lado ímpar",
          bairro: "Sé",
          localidade: "São Paulo",
          uf: "SP",
          ibge: "3550308",
          ddd: "11",
        }),
      });
    });

    await page.goto("/buscar-cep");

    await page.getByLabel("Digite o CEP").fill("01001000");
    await page.getByRole("button", { name: /buscar/i }).click();

    const resultado = page.locator("dl");
    await expect(resultado).toBeVisible();
    await expect(resultado).toContainText("01001-000");
    await expect(resultado).toContainText("Praça da Sé");
    await expect(resultado).toContainText("Sé");
    await expect(resultado).toContainText("São Paulo");
    await expect(resultado).toContainText("SP");

    await expect(page.getByRole("alert").filter({ hasText: /./ })).toHaveCount(0);
  });

  test("Cenário 2: CEP não encontrado - exibe mensagem de erro", async ({ page }) => {
    await page.route(CEP_ROTA, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ erro: true }),
      });
    });

    await page.goto("/buscar-cep");

    await page.getByLabel("Digite o CEP").fill("99999999");
    await page.getByRole("button", { name: /buscar/i }).click();

    await expect(page.getByRole("alert").filter({ hasText: "CEP não encontrado." })).toHaveText(
      "CEP não encontrado.",
    );
    await expect(page.locator("dl")).toHaveCount(0);
  });
});
