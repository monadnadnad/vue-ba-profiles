import type { BirthdaySelection } from "../models/quiz";

export function checkBirthday(studentBirthday: string, userAnswer: BirthdaySelection): boolean {
  const [month, day] = studentBirthday.split("-").map(Number);
  return month === userAnswer.month && day === userAnswer.day;
}
