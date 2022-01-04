const path = require('path');
const express = require('express');

const app = express(); 


const PORT = 3000; 

app.listen(PORT, () => {
    console.log('server listening on port 3000')
})

module.exports = app;