import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const all = await getCollection("segnali", ({ data }) => !data.draft);
  const sorted = all.sort(
    (a, b) => b.data.data.getTime() - a.data.data.getTime(),
  );

  return rss({
    title: "Glitch — Segnali",
    description:
      "Il diario operativo di Glitch. Annotazioni critiche sull'intelligenza artificiale italiana.",
    site: context.site,
    items: sorted.map((entry) => {
      const numero = String(entry.data.numero).padStart(3, "0");
      const description =
        entry.data.sommario ?? (entry.body ?? "").substring(0, 200).trim();
      return {
        title: `Segnale #${numero} — ${entry.data.titolo}`,
        pubDate: entry.data.data,
        description,
        link: `/segnali/${entry.id}/`,
      };
    }),
    customData: "<language>it-IT</language>",
  });
}
