const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/dist`));

app.use((request, response) => {
  response.sendFile(path.resolve(`${__dirname}/dist/index.html`));
});

app.listen(PORT, () => {
  console.log(`Web Messenger Server is launched on port ${PORT}...`);
});
