import puppeteer from "puppeteer";

export const createPDF = async (htmlContent: string, filePath: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  await page.pdf({ path: filePath, format: "A4" });
  await browser.close();
};
