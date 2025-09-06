type Id = number;
type Name = string;
type School = string;
type Club = string;
type BirthDay = string;
type FamilyName = string;
type CharacterVoice = string;

export interface RawStudent {
  Id: Id;
  Name: Name;
  BirthDay: BirthDay;
  School: School;
  Club: Club;
  FamilyName: FamilyName;
  CharacterVoice: CharacterVoice;
}

export interface Student {
  id: number;
  name: string;
  birthday?: string;
  school: string;
  club: string;
  familyName?: string;
  characterVoice?: string;
}

export function normalizeStudent(raw: RawStudent): Student {
  return {
    id: raw.Id,
    name: raw.Name,
    birthday: raw.BirthDay === "-" ? undefined : raw.BirthDay,
    school: raw.School,
    club: raw.Club,
    familyName: raw.FamilyName,
    characterVoice: raw.CharacterVoice,
  };
}
