const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.use('/', express.static(path.join(__dirname, '../public')));

app.post('/analyze_file', upload.single('file'), function handler(req, res) {
  res.json({
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
}

module.exports = app;
