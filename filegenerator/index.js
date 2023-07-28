const express = require('express');
const htmlToDocx = require('html-docx-js');
const pdf = require('html-pdf');
const port = 5000;
const cors = require('cors'); /*mechanism by which a front-end 
client can make requests for resources to an external back-end server. 
The single-origin*/


const bodyParser=require("body-parser")
const app=express();

var corsOptions = {
    origin: '*',
    credentials: false,
    'allowedHeaders': ['Content-Type'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
function sendFileResponse(res, content, contentType, fileExtension) {
  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Disposition', `attachment; filename=generated.${fileExtension}`);
  res.send(content);
}
app.post('/api/generate-doc', (req, res) => {
  const htmlContent = req.body.content;
  const fileType = req.body.type;

  let fileContent;
  let contentType;
  let fileExtension;

  if (fileType === 'pdf') {
    console.log(fileType);

    // Generate the PDF file
    pdf.create(htmlContent).toBuffer((err, buffer) => {
      if (err) {
        res.status(500).send('Error generating PDF');
        return;
      }
      fileContent = buffer;
      contentType = 'application/pdf';
      fileExtension = 'pdf';
      sendFileResponse(res, fileContent, contentType, fileExtension);
    });
  } else if (fileType === 'docx') {
    console.log(fileType);
    // Generate the DOC file
    const docx = htmlToDocx.asBlob(htmlContent);
    fileContent = docx;
    contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    fileExtension = 'docx';
    sendFileResponse(res, fileContent, contentType, fileExtension);
  } else {
    res.status(400).send('Invalid file type');
  }
});

app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});
