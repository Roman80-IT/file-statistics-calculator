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
      // Дані завантажено, наступний етап - обробка даних
      console.log(data);
    });
  })
  .on("error", (err) => {
    console.error("Помилка завантаження файлу:", err.message);
  });
