const https = require("https");

// Завантаження файлу з URL
const url =
  "https://drive.google.com/uc?export=download&id=1LxSB6UEAVK0NLgU0ah5y0CBbD0gL_oO9";

https
  .get(url, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      // Обробка даних
      const numbers = data.trim().split("\n").map(Number);
      const sortedNumbers = [...numbers].sort((a, b) => a - b);
      const n = sortedNumbers.length;

      const maxNum = Math.max(...numbers);
      const minNum = Math.min(...numbers);

      // Медіана
      const median =
        n % 2 === 1
          ? sortedNumbers[Math.floor(n / 2)]
          : (sortedNumbers[n / 2 - 1] + sortedNumbers[n / 2]) / 2;

      // Середнє арифметичне
      const mean = numbers.reduce((sum, num) => sum + num, 0) / n;

      console.log(`Максимальне число: ${maxNum}`);
      console.log(`Мінімальне число: ${minNum}`);
      console.log(`Медіана: ${median}`);
      console.log(`Середнє арифметичне: ${mean}`);
    });
  })
  .on("error", (err) => {
    console.error("Помилка завантаження файлу:", err.message);
  });
