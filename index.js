const express = require('express');

const app = express();
app.use(express.json());
const PORT = 7000;
app.listen(PORT,()=>{console.log(`Server running on PORT : http://localhost:7000`)});