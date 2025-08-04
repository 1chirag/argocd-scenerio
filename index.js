const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hi, Im a devops engineer. Lets check argocd with helm , now both are in diffrent branch lets see check if it works! still 3 times');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});