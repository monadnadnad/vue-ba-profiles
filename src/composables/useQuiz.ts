import type { BirthdaySelection, SchoolSelection } from "../models/quiz";

export function checkBirthday(studentBirthday: string, userAnswer: BirthdaySelection): boolean {
  const [month, day] = studentBirthday.split("-").map(Number);
  return month === userAnswer.month && day === userAnswer.day;
}

export function checkSchool(studentSchool: string, userAnswer: SchoolSelection): boolean {
  return !!userAnswer && studentSchool === userAnswer;
}
