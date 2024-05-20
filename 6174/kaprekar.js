class KaprekarError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class KaprekarCalculator {
  constructor() {
    this.currentNumber = null;
    this.iterationCount = 0;
    this.steps = [];
  }

  initializeNumber(num) {
    if (num < 1000 || num > 9999) {
      throw new KaprekarError("Number must be a 4-digit integer.");
    }
    this.currentNumber = num.toString().padStart(4, "0");
    this.iterationCount = 0;
    this.steps = [];
  }

  performKaprekarRoutine() {
    if (this.currentNumber === null) {
      throw new KaprekarError("Number has not been set.");
    }

    while (this.currentNumber !== "6174") {
      const step = this.calculateNextStep();
      this.steps.push(step);
      this.currentNumber = step.result;
      this.iterationCount++;

      if (this.iterationCount > 1000) {
        throw new KaprekarError(
          "Exceeded maximum iterations, possible infinite loop."
        );
      }
    }
  }

  calculateNextStep() {
    const digits = this.currentNumber.split("").map(Number);
    const ascending = digits
      .slice()
      .sort((a, b) => a - b)
      .join("");
    const descending = digits
      .slice()
      .sort((a, b) => b - a)
      .join("");

    const smaller = parseInt(ascending, 10);
    const larger = parseInt(descending, 10);
    const result = (larger - smaller).toString().padStart(4, "0");

    return { ascending, descending, result };
  }
}

function generateRandomFourDigitNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}

function main() {
  const calculator = new KaprekarCalculator();
  const number = generateRandomFourDigitNumber();

  try {
    calculator.initializeNumber(number);
    calculator.performKaprekarRoutine();

    console.log(`Starting number: ${number}`);
    calculator.steps.forEach((step) => {
      console.log(
        `Descending: ${step.descending} - Ascending: ${step.ascending} = Result: ${step.result}`
      );
    });
    console.log(
      `It took ${
        calculator.iterationCount
      } iterations to reach Kaprekar's constant (6174) from ${number
        .toString()
        .padStart(4, "0")}.`
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

main();
