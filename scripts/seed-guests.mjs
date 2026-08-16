import { createClient } from "@supabase/supabase-js";
import { invitados } from "../src/data/invitados.js";

function normalizeString(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function toCamelCaseSlug(str) {
  const words = normalizeString(str).split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  return words
    .map((word, i) => {
      const lower = word.toLowerCase();
      return i === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("");
}

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en el entorno.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

async function run() {
  let ok = 0;
  let skipped = 0;
  for (const name of invitados) {
    const slug = toCamelCaseSlug(name);
    const { error } = await supabase.from("guests").upsert(
      { slug, display_name: name },
      { onConflict: "slug" }
    );
    if (error) {
      console.error(`Error con "${name}" -> ${error.message}`);
    } else {
      ok++;
    }
  }
  console.log(`Listo. ${ok} invitados procesados, ${skipped} omitidos.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});