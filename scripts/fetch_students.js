import { mkdir, writeFile } from "node:fs/promises";
const KEEP_KEYS = ["Id", "Name", "School", "Club", "Birthday", "FamilyName", "CharacterVoice"];
const STUDENTS_URL = "https://raw.githubusercontent.com/SchaleDB/SchaleDB/refs/heads/main/data/jp/students.json";
const L10N_URL = "https://raw.githubusercontent.com/SchaleDB/SchaleDB/refs/heads/main/data/jp/localization.json";
const OUT = "./src/data/students.json";

const j = (u) =>
  fetch(u).then((r) => {
    if (!r.ok) throw new Error(`${u} ${r.status}`);
    return r.json();
  });
const pick = (o, ks) => ks.reduce((a, k) => (k in o ? ((a[k] = o[k]), a) : a), {});
const mapByDict = (v, dict) => (Array.isArray(v) ? v.map((x) => dict?.[x] ?? x) : (dict?.[v] ?? v));

const run = async () => {
  const [students, l10n] = await Promise.all([j(STUDENTS_URL), j(L10N_URL)]);
  if (!Array.isArray(students)) throw new Error("students.json が配列ではありません");

  const out = students.map((s) => {
    const o = pick(s, KEEP_KEYS);
    for (const k of KEEP_KEYS) {
      const dict = l10n && typeof l10n[k] === "object" ? l10n[k] : null;
      if (dict) o[k] = mapByDict(o[k], dict);
    }
    return o;
  });

  await mkdir("./src/data", { recursive: true });
  await writeFile(OUT, JSON.stringify(out, null, 2), "utf8");
  console.log(`✅ ${OUT} に ${out.length} 件を書き出し`);
};

run().catch((e) => (console.error("❌", e), process.exit(1)));
