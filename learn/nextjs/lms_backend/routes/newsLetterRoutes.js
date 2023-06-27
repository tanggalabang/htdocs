try {
const { subscribe, unsubscribe } = require("../controllers/newsletterCtrl");
const newsLetterRouter = require("express").Router();

newsLetterRouter.post("/", subscribe);
newsLetterRouter.delete("/:id", unsubscribe);

module.exports = { newsLetterRouter };
  // Potongan kode yang mungkin menyebabkan kesalahan
} catch (error) {
  // Tangani kesalahan di sini
  console.log("Terjadi kesalahan:", error);
}
