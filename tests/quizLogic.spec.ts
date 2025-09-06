import { checkBirthday } from "../src/composables/useQuiz";

describe("Quiz Logic", () => {
  const hifumiBirthday = "11-27";

  it("should return true for a correct birthday answer", () => {
    const userAnswer = { month: 11, day: 27 };
    expect(checkBirthday(hifumiBirthday, userAnswer)).toBe(true);
  });

  it("should return false for an incorrect month", () => {
    const userAnswer = { month: 1, day: 27 };
    expect(checkBirthday(hifumiBirthday, userAnswer)).toBe(false);
  });

  it("should return false for an incorrect day", () => {
    const userAnswer = { month: 11, day: 26 };
    expect(checkBirthday(hifumiBirthday, userAnswer)).toBe(false);
  });
});
