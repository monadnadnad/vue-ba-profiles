import type { BirthdaySelection, SchoolSelection } from "../models/quiz";

export function checkBirthday(studentBirthday: string | undefined, userAnswer: BirthdaySelection): boolean {
  if (!studentBirthday) return true;
  const [month, day] = studentBirthday.split("/").map(Number);
  return month === userAnswer.month && day === userAnswer.day;
}

export function checkSchool(studentSchool: string | undefined, userAnswer: SchoolSelection): boolean {
  if (!studentSchool) return true;
  return !!userAnswer && studentSchool === userAnswer;
}
