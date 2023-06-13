const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get("/api/quotes/random", (req, res, next) => {
  const quote = { quote: getRandomElement(quotes) };
  res.send(quote);
});

app.get("/api/quotes", (req, res, next) => {
  const person = req.query.person;
  if (!person) res.send({ quotes: quotes });
  else {
    const filteredQuotes = quotes.filter((q) => q.person === person);
    res.send({ quotes: filteredQuotes });
  }
});

app.post("/api/quotes", (req, res, next) => {
  const { person, quote } = req.query;
  if (!person || !quote) {
    res.status(400).send();
  } else {
    const newQuote = { quote, person };
    quotes.push(newQuote);
    res.send({ quote: newQuote });
  }
});

app.put("/api/quotes/:id", (req, res, next) => {
  const { id } = req.params;
  if (!quotes[id]) {
    res.send(404);
  } else {
    const { person, quote } = req.query;
    if (!person || !quote) {
      res.status(400).send();
    }
    const newQuote = { quote, person };
    quotes[id] = newQuote;
    res.send(newQuote);
  }
});

app.delete("/api/quotes/:id", (req, res, next) => {
  const { id } = req.params;
  if (!quotes[id]) {
    res.send(404);
  } else {
    const quote = quotes[id];
    quotes.splice(id, 1);
    res.send(quote);
  }
});

app.listen(PORT);
