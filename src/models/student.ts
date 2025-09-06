import type { WithNA } from "./na";
import { NA } from "./na";

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
  birthdayMM: WithNA<number>;
  birthdayDD: WithNA<number>;
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
  const [mmStr, ddStr] = raw.BirthDay === "-" ? ["", ""] : raw.BirthDay.split("/");
  const mm = mmStr === "" ? NA : Number(mmStr);
  const dd = ddStr === "" ? NA : Number(ddStr);
  return {
    id: raw.Id,
    name: raw.Name,
    birthday: raw.BirthDay,
    birthdayMM: mm,
    birthdayDD: dd,
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
