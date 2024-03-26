import express from "express";
import OpenAI from "openai";
import DOMPurify from "dompurify";

const openai = new OpenAI({
  apiKey: "",
});

const app = express();
app.use(express.json());
app.use(express.static("public"));

async function getImageDalle(prompt) {
  return await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
  });
}

function createPrompt(prompt) {
  const myString =
    'Quiero que enseñes fotos de flanes con estas características, flan de:"""' +
    prompt +
    '""".Las fotos deben de ser lo mas realistas posibles. En las fotos siempre debe aparecer como mínimo un flan';
  return myString;
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/getFlan", async (req, res) => {
  const data = req.body.data;
  if (!data) return;
  if (!data || data.length < 4 || data.length > 150) {
    return res
      .status(400)
      .json({ error: "La descripcion tiene que ser entre 8 y 150 caracteres" });
  }
  const prompt = createPrompt(data);
  console.log(prompt);

  try {
    let resultado = await getImageDalle(prompt);
    console.log(resultado);
    return res.status(200).send(resultado);
  } catch (error) {
    return res.status(400).json({ error: "error de ia" });
  }
});

app.use("/robots.txt", function (req, res, next) {
  res.type("text/plain");
  res.send(
    "User-agent: *\n Disallow: /public/ \n Disallow: /private/ \n Disallow: /admin/ \n Disallow: /cgi-bin/",
  );
});
app.use("/sitemap.xmo", function (req, res, next) {
  res.type("text/plain");
  res.send(
    "User-agent: *\n Disallow: /public/ \n Disallow: /private/ \n Disallow: /admin/ \n Disallow: /cgi-bin/",
  );
});

app.listen(80, () => {
  console.log("Express server initialized");
});
