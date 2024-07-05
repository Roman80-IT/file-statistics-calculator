const axios = require("axios");

const url =
  "https://drive.google.com/uc?export=download&id=1LxSB6UEAVK0NLgU0ah5y0CBbD0gL_oO9";

axios
  .get(url)
  .then((response) => {
    // Зчитуємо дані з файлу
    const data = response.data;

    // Розбиваємо дані на масив чисел
    const numbers = data.trim().split("\n").map(Number);

    if (numbers.length === 0) {
      throw new Error("Файл порожній");
    }

    // Сортуємо числа для подальших обчислень
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    const n = sortedNumbers.length;

    // Обчислюємо максимальне і мінімальне число
    const maxNum = Math.max(...numbers);
    const minNum = Math.min(...numbers);

    // Обчислюємо медіану
    const median =
      n % 2 === 1
        ? sortedNumbers[Math.floor(n / 2)]
        : (sortedNumbers[n / 2 - 1] + sortedNumbers[n / 2]) / 2;

    // Обчислюємо середнє арифметичне
    const mean = numbers.reduce((sum, num) => sum + num, 0) / n;

    // Функція для знаходження найбільшої зростаючої послідовності
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

    // Функція для знаходження найбільшої спадної послідовності
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

    // Виводимо результати
    console.log(`Максимальне число: ${maxNum}`);
    console.log(`Мінімальне число: ${minNum}`);
    console.log(`Медіана: ${median}`);
    console.log(`Середнє арифметичне: ${mean}`);
    console.log(`Найбільша зростаюча послідовність: ${longestIncreasing}`);
    console.log(`Найбільша спадна послідовність: ${longestDecreasing}`);
  })
  .catch((error) => {
    console.error("Помилка завантаження файлу:", error.message);
  });
