//This index.json is in the server folder. Because it is only us-east-1 it is 184 MB.
const urlForAwsUsEast = 'https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonEC2/current/us-east-1/index.json';
const awsPrices = {};/* An object of every instanceType and pricePerUnit of the fetch request where vCPU and memory is greater or equal to the vCPU and RAM that the user inputted and operating system equals the operating system the user inputted. */
const lowestAwsPrice = () => {
    const minPrice = {
        instanceType: '',
        pricePerUnit: Infinity,
    };
 for (let price in awsPrices){
     if (price.pricePerUnit < minPrice.pricePerUnit){
        minPrice = price;
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


