const awsPrices = require('./awsProduct.json');
// const fs = require('fs');

awsPrices.forEach(obj => {
    obj.vcpu = parseInt(obj.vcpu);

    if (obj.memory){
        obj.memory = parseInt(obj.memory);
        // obj.memory.replace(/\D/ig, "");

    }
    
    obj.pricePerUnit = parseFloat(obj.pricePerUnit);
    }
);
console.log(awsPrices[0]);



// fs.writeFile('./filteredAwsProducts.js', awsPrices, err => { if(err){ console.log('Error writing file', err); } else { console.log('Successfully wrote file'); } });