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

      // Найбільша зростаюча послідовність
      function longestIncreasingSubsequence(arr) {
        let longest = [];
        let current = [];
        for (let i = 0; i < arr.length; i++) {
          if (current.length === 0 || arr[i] > current[current.length - 1]) {
            current.push(arr[i]);
          } else {
            if (current.length > longest.length) {
              longest = current;
            }
            current = [arr[i]];
          }
        }
        if (current.length > longest.length) {
          longest = current;
        }
        return longest;
      }

      // Найбільша спадна послідовність
      function longestDecreasingSubsequence(arr) {
        let longest = [];
        let current = [];
        for (let i = 0; i < arr.length; i++) {
          if (current.length === 0 || arr[i] < current[current.length - 1]) {
            current.push(arr[i]);
          } else {
            if (current.length > longest.length) {
              longest = current;
            }
            current = [arr[i]];
          }
        }
        if (current.length > longest.length) {
          longest = current;
        }
        return longest;
      }

      const longestIncreasing = longestIncreasingSubsequence(numbers);
      const longestDecreasing = longestDecreasingSubsequence(numbers);

      // Виведення результатів
      console.log(`Максимальне число: ${maxNum}`);
      console.log(`Мінімальне число: ${minNum}`);
      console.log(`Медіана: ${median}`);
      console.log(`Середнє арифметичне: ${mean}`);
      console.log(`Найбільша зростаюча послідовність: ${longestIncreasing}`);
      console.log(`Найбільша спадна послідовність: ${longestDecreasing}`);
    });
  })
  .on("error", (err) => {
    console.error("Помилка завантаження файлу:", err.message);
  });
