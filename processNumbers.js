const fs = require("fs");
const readline = require("readline");

const filePath = "./10m.txt";

const readStream = fs.createReadStream(filePath, "utf8");
const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity,
});

let maxNum = -Infinity;
let minNum = Infinity;
let sum = 0;
let count = 0;
let numbers = [];

rl.on("line", (line) => {
  const num = Number(line);
  numbers.push(num);

  if (num > maxNum) maxNum = num;
  if (num < minNum) minNum = num;
  sum += num;
  count++;
});

rl.on("close", () => {
  if (count === 0) {
    throw new Error("Файл порожній");
  }

  const sortedNumbers = [...numbers].sort((a, b) => a - b);
  const median =
    count % 2 === 1
      ? sortedNumbers[Math.floor(count / 2)]
      : (sortedNumbers[count / 2 - 1] + sortedNumbers[count / 2]) / 2;
  const mean = sum / count;

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

  console.log(`Максимальне число: ${maxNum}`);
  console.log(`Мінімальне число: ${minNum}`);
  console.log(`Медіана: ${median}`);
  console.log(`Середнє арифметичне: ${mean}`);
  console.log(`Найбільша зростаюча послідовність: ${longestIncreasing}`);
  console.log(`Найбільша спадна послідовність: ${longestDecreasing}`);
});
