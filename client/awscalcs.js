//This is only us-east-1, so it is 184 MB.
const awsPrices = require('../server/awsProduct.json');

const urlForAwsUsEast = 'https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonEC2/current/us-east-1/index.json';

let inputMem = 25;
let inputVcpu = 1;

awsPrices.forEach(obj => {
    obj.vcpu = parseInt(obj.vcpu);
    if (inputVcpu === obj.vcpu || )

    if (obj.memory){
        obj.memory = parseInt(obj.memory);
        // obj.memory.replace(/\D/ig, "");

    }
    
    obj.pricePerUnit = parseFloat(obj.pricePerUnit);
    }
);
console.log(awsPrices[0]);

let userInput

const awsPricesForCustomer = 


/* An object of every instanceType and pricePerUnit of the fetch request where vCPU and memory is greater or equal to the vCPU and RAM that the user inputted and operating system equals the operating system the user inputted. */



const lowestAwsPrice = () => {
    const minPrice = {
        instanceType: '',
        pricePerUnit: Infinity,
    };
 for (let price in awsPrices){
     if (price.pricePerUnit < minPrice.pricePerUnit){
        minPrice.pricePerUnit = price;
     }
 }
 return minPrice;
};

const awsInstanceTypeToUse = lowestAwsPrice();

//numofVMs and hoursPerMonth defined based on user inputs
const awsVmSubTotal = awsInstanceTypeToUse.pricePerUnit * numOfVMs * hoursPerMonth;

//Good enough for minimum vialble product. 10 cents per GB. Source: https://calculator.aws/#/createCalculator/EC2
const awsStorageSubTotal = inputGBs * 0.10 * numOfVMs;

//Total per month
const awsTotal = awsVmSubTotal + awsStorageSubTotal;


