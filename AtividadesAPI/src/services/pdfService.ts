import Handlebars from "handlebars";
import { createPDF } from "../config/puppeteer";
import { promises as fs } from "fs";
import prisma from "../config/database";
import path from "path";
export const generatePDF = async (activityId: string) => {
  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
    include: { user: true },
  });

  if (!activity) {
    throw new Error("Atividade não encontrada");
  }

  const templateSource = await fs.readFile(
    "./src/template/template.hbs",
    "utf8"
  );

  const outputPath = path.join(__dirname, "../pdfs", `${activity.title}.pdf`);
  console.log(activity);
  const template = await Handlebars.compile(templateSource);
  const html = template(activity);

  await createPDF(html, outputPath);

  await prisma.pDF.create({
    data: {
      file_path: outputPath,
      activity_id: activityId,
    },
  });

  return outputPath;
};
