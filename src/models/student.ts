// Raw schema as delivered from the external DB (note the Uppercase keys)
export interface RawStudent {
  Id: number;
  Name: string;
  School: string;
  Club: string;
  Birthday: string; // e.g. "3月12日"
  FamilyName: string;
  CharacterVoice: string;
}

// Internal normalized model used by the app
export interface Student {
  id: number;
  name: string;
  birthday: string; // normalized as "M-D" e.g. "3-12"
  school: string;
  club: string;
  familyName: string;
  characterVoice: string;
}

function normalizeBirthday(jp: string): string {
  // Convert formats like "3月12日" to "3-12"
  const m = jp.match(/(\d+)月(\d+)日/);
  if (!m) return jp;
  const [, month, day] = m;
  return `${Number(month)}-${Number(day)}`;
}

export function normalizeStudent(raw: RawStudent): Student {
  return {
    id: raw.Id,
    name: raw.Name,
    birthday: normalizeBirthday(raw.Birthday),
    school: raw.School,
    club: raw.Club,
    familyName: raw.FamilyName,
    characterVoice: raw.CharacterVoice,
  };
}
