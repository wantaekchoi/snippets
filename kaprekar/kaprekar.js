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
    this.targetConstant = null;
  }

  initializeNumber(num) {
    if ((num < 100 || num > 999) && (num < 1000 || num > 9999)) {
      throw new KaprekarError("Number must be a 3-digit or 4-digit integer.");
    }

    if (num >= 100 && num <= 999) {
      this.currentNumber = num.toString().padStart(3, "0");
      this.targetConstant = "495";
    } else {
      this.currentNumber = num.toString().padStart(4, "0");
      this.targetConstant = "6174";
    }

    this.iterationCount = 0;
    this.steps = [];
  }

  performKaprekarRoutine() {
    if (this.currentNumber === null) {
      throw new KaprekarError("Number has not been set.");
    }

    while (this.currentNumber !== this.targetConstant) {
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
    const result = (larger - smaller)
      .toString()
      .padStart(this.currentNumber.length, "0");

    return { ascending, descending, result };
  }
}

function generateRandomNumber(digits) {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(min + Math.random() * (max - min + 1));
}

function main() {
  const calculator = new KaprekarCalculator();
  const number3Digit = generateRandomNumber(3);
  const number4Digit = generateRandomNumber(4);

  try {
    console.log(`Starting 3-digit number: ${number3Digit}`);
    calculator.initializeNumber(number3Digit);
    calculator.performKaprekarRoutine();
    calculator.steps.forEach((step) => {
      console.log(
        `Descending: ${step.descending} - Ascending: ${step.ascending} = Result: ${step.result}`
      );
    });
    console.log(
      `It took ${
        calculator.iterationCount
      } iterations to reach Kaprekar's constant (495) from ${number3Digit
        .toString()
        .padStart(3, "0")}.`
    );

    calculator.initializeNumber(number4Digit);
    console.log(`\nStarting 4-digit number: ${number4Digit}`);
    calculator.performKaprekarRoutine();
    calculator.steps.forEach((step) => {
      console.log(
        `Descending: ${step.descending} - Ascending: ${step.ascending} = Result: ${step.result}`
      );
    });
    console.log(
      `It took ${
        calculator.iterationCount
      } iterations to reach Kaprekar's constant (6174) from ${number4Digit
        .toString()
        .padStart(4, "0")}.`
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

main();
