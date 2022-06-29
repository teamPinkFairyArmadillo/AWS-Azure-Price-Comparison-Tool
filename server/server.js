const path = require('path');
const express = require('express');
const cors = require('cors')
const app = express(); 






app.use(cors({
    origin: '*'
}))

// ,{
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*'
//     }
// }


const PORT = 3000; 

app.listen(PORT, () => {
    console.log('server listening on port 3000')
})

module.exports = app;