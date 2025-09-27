import exress from 'express';

export const app = exress();

app.get("/", (req, res) => {
    res.send("Hello World!");
});