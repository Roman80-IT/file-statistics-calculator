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

      const maxNum = Math.max(...numbers);

      const minNum = Math.min(...numbers);

      console.log(`Максимальне число: ${maxNum}`);
      console.log(`Мінімальне число: ${minNum}`);
    });
  })
  .on("error", (err) => {
    console.error("Помилка завантаження файлу:", err.message);
  });
