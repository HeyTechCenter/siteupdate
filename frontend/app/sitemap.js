import { site } from "@/data/site";

// Site d'une seule page : une entrée suffit
export default function sitemap() {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
