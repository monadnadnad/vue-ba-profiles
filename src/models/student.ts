type Id = number;
type Name = string;
type School = string;
type Club = string;
type BirthDay = string;
type FamilyName = string;
type FamilyNameRuby = string;
type Hobby = string;
type CharacterAge = string;
type CharacterVoice = string;
type CharHeightMetric = string;

export interface RawStudent {
  Id: Id;
  Name: Name;
  BirthDay: BirthDay;
  School: School;
  Club: Club;
  FamilyName: FamilyName;
  FamilyNameRuby: FamilyNameRuby;
  Hobby: Hobby;
  CharacterAge: CharacterAge;
  CharacterVoice: CharacterVoice;
  CharHeightMetric: CharHeightMetric;
}

export interface Student {
  id: number;
  name: string;
  birthday: string;
  school: string;
  club: string;
  familyName: string;
  familyNameRuby: string;
  hobby: string;
  characterAge: string;
  characterVoice: string;
  charHeightMetric: string;
}

export function normalizeStudent(raw: RawStudent): Student {
  return {
    id: raw.Id,
    name: raw.Name,
    birthday: raw.BirthDay,
    school: raw.School,
    club: raw.Club,
    familyName: raw.FamilyName,
    familyNameRuby: raw.FamilyNameRuby,
    hobby: raw.Hobby,
    characterAge: raw.CharacterAge,
    characterVoice: raw.CharacterVoice,
    charHeightMetric: raw.CharHeightMetric,
  };
}
