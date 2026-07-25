/**
 * One-time content fix + local-SEO rewrite for existing Sanity project documents:
 *  - replaces the "test" placeholder content on `bucatarie-premium-baia-mare` with real content
 *  - standardizes `location` to "Oraș, Județ"
 *  - rewrites `description` on all projects to naturally mention the Baia Mare workshop
 *
 * Run:
 *   npx tsx --env-file=.env.local scripts/rewrite-seo-copy.ts
 *
 * Uses `client.patch(...).set(...)` per document (by the deterministic `project-<slug>` _id
 * used in scripts/migrate-to-sanity.ts), so only the listed fields change — images, gallery,
 * featured, year, etc. are left untouched. Safe to re-run.
 */
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_MIGRATION_TOKEN;

if (!projectId || !dataset || !token) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_MIGRATION_TOKEN in .env.local"
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

interface Patch {
  slug: string;
  title?: string;
  location: string;
  description: string;
  clientRequirements?: string;
  highlights?: string[];
  materials?: string[];
}

const patches: Patch[] = [
  {
    slug: "bucatarie-premium-baia-mare",
    title: "Bucătărie Minimalistă cu Insulă, Baia Mare",
    location: "Baia Mare, Maramureș",
    description:
      "O bucătărie minimalistă cu insulă centrală din piatră sinterizată, concepută și produsă chiar în atelierul nostru din Baia Mare, pentru o familie tânără care primește des prieteni la masă. Mânere ascunse și electrocasnice complet integrate, pentru un aspect curat, fără linii întrerupte.",
    clientRequirements:
      "O bucătărie deschisă spre living, cu o insulă generoasă pentru gătit împreună și fără mânere vizibile pe corpuri.",
    highlights: [
      "Insulă din piatră sinterizată cu blat continuu",
      "Electrocasnice complet integrate, fără mânere vizibile",
      "Iluminat LED sub blaturile superioare",
    ],
    materials: ["MDF Vopsit Mat", "Piatră Sinterizată", "Feronerie Push-to-Open"],
  },
  {
    slug: "amenajare-birouri-corporate-cluj-napoca",
    location: "Cluj-Napoca, Cluj",
    description:
      "Tâmplărie de recepție, canapele pentru zona de socializare și o masă completă de sală de ședințe, concepute în atelierul nostru din Baia Mare pentru o firmă de servicii financiare care se muta într-un nou sediu din Cluj-Napoca, pe malul râului.",
  },
  {
    slug: "baie-familiala-sibiu",
    location: "Sibiu, Sibiu",
    description:
      "Tâmplărie personalizată pentru lavoar și depozitare, produsă în atelierul nostru din Baia Mare pentru o baie familială compactă din Sibiu, gândită să reziste la umiditate fără a compromite căldura materialului.",
  },
  {
    slug: "birou-executiv-bucuresti",
    location: "București",
    description:
      "Un perete întreg de rafturi personalizate, un birou rabatabil și panouri fonoabsorbante, concepute în atelierul nostru din Baia Mare pentru o clientă din București care lucrează de acasă permanent — gândite să dispară complet la finalul zilei.",
  },
  {
    slug: "bucatarie-de-autor-baia-mare",
    location: "Baia Mare, Maramureș",
    description:
      "Proiectată și produsă chiar în atelierul nostru din Baia Mare, pentru o clientă care gătește profesionist, această bucătărie combină o zonă de preparare din inox cu tâmplărie caldă din nuc, echilibrând durabilitatea cu căldura specifică unui spațiu domestic.",
  },
  {
    slug: "bucatarie-rezidenta-grigorescu",
    location: "Cluj-Napoca, Cluj",
    description:
      "O bucătărie din stejar și lac mat, produsă în atelierul nostru din Baia Mare și construită în jurul unei insule din marmură cu vinișoare simetrice, pentru o familie din Cluj-Napoca care primește des oaspeți. Fiecare corp a fost șablonat la fața locului și produs la milimetru.",
  },
  {
    slug: "dormitor-cotroceni-bucuresti",
    location: "București",
    description:
      "Un dormitor matrimonial liniștit, cu aer hotelier, produs în atelierul nostru din Baia Mare pentru o locuință din București — un perete-tăblie de pat pe toată înălțimea ascunde o zonă de dressing, finisat în stejar afumat și bronz.",
  },
  {
    slug: "dormitor-rustic-sighetu-marmatiei",
    location: "Sighetu Marmației, Maramureș",
    description:
      "O pereche de dormitoare pe măsură, realizate în atelierul nostru din Baia Mare pentru o casă țărănească renovată din Sighetu Marmației, proiectate să se integreze discret printre grinzile aparente și pereții din piatră neregulată.",
  },
  {
    slug: "dressing-personalizat-brasov",
    location: "Brașov, Brașov",
    description:
      "Dulapuri pe toată înălțimea, produse în atelierul nostru din Baia Mare și integrate într-o mansardă din Brașov cu pod înclinat, valorificând fiecare centimetru de spațiu util fără niciun colț irosit.",
  },
  {
    slug: "dressing-walk-in-baia-mare",
    location: "Baia Mare, Maramureș",
    description:
      "O cameră de dressing dedicată, concepută chiar în atelierul nostru din Baia Mare, cu zone de agățat iluminate, tâmplărie cu vitrine și o insulă centrală pentru tricotaje împăturite și accesorii.",
  },
  {
    slug: "living-familial-oradea",
    location: "Oradea, Bihor",
    description:
      "Tâmplărie construită pe măsură în atelierul nostru din Baia Mare, montată în jurul unui bovindou dintr-o locuință din Oradea — o bancă-fotoliu, rafturi de bibliotecă și spațiu de depozitare închis pentru o familie tânără cu o bibliotecă mereu în creștere.",
  },
  {
    slug: "living-loft-timisoara",
    location: "Timișoara, Timiș",
    description:
      "Un modul complet de mobilier media și depozitare, produs în atelierul nostru din Baia Mare pentru un loft din Timișoara amenajat într-un fost spațiu industrial — construit pentru a pune în valoare stâlpii originali din fontă, nu pentru a-i ascunde.",
  },
  {
    slug: "receptie-hotel-boutique-sighisoara",
    location: "Sighișoara, Mureș",
    description:
      "Un ansamblu de recepție și tâmplărie pentru lobby, produs în atelierul nostru din Baia Mare pentru un hotel boutique din Sighișoara, construit să reziste utilizării zilnice intense fără să piardă nimic din caracterul personalizat.",
  },
];

async function main() {
  // Don't assume the `project-<slug>` _id convention from scripts/migrate-to-sanity.ts —
  // documents created by hand in Studio (like the placeholder) get a random _id instead.
  const docs = await client.fetch<{ _id: string; slug: string }[]>('*[_type == "project"]{_id, "slug": slug.current}');
  const idBySlug = new Map(docs.map((doc) => [doc.slug, doc._id]));

  for (const patch of patches) {
    const id = idBySlug.get(patch.slug);
    if (!id) {
      console.warn(`Skipping ${patch.slug}: no document found with that slug.`);
      continue;
    }

    const { slug: _slug, ...rest } = patch;
    void _slug;
    const fields = Object.fromEntries(Object.entries(rest).filter(([, value]) => value !== undefined));

    console.log(`Patching: ${id} (${patch.slug})`);
    await client.patch(id).set(fields).commit();
  }
  console.log(`\nPatched ${patches.length} project documents.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
