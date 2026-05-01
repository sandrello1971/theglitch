import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const segnali = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/segnali" }),
  schema: z.object({
    numero: z.number(),
    titolo: z.string(),
    data: z.coerce.date(),
    sommario: z.string().optional(),
    tempoLettura: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { segnali };
