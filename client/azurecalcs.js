const azureSizes = [];/* Do a fetch to the Azure REST API here to return an array of sizes values (ex. D5) where the vCPUs and the MemoryGB is greater or equal to what the user inputted. These are the values used to query the prices.azure.com API.*/

// class AzurePrices {
//     constructor (skuName, unitPrice){
//         this.skuName = skuName;
//         this.unitPrice = unitPrice;
//     }
// };

const lowestAzurePrice = () => {
    const minPrice = {
        skuName: '',
        unitPrice: Infinity,
    };
    const os /* = userInputted OS */;
    azureSizes.forEach(size => {
        const unitPrice /* = Do a fetch here to the prices.azure.com API querying the size argument (skuName eq size) and os constant to return the price */;
        if (unitPrice < minPrice.unitPrice){
            minPrice.skuName = size;
            minPrice.unitPrice = unitPrice;
        }

})
    return minPrice;
};

const azureInstanceTypeToUse = lowestAzurePrice();

//numofVMs and hoursPerMonth defined based on user inputs
const azureVmSubTotal = azureInstanceTypeToUse.unitPrice * numOfVMs * hoursPerMonth;

const azureStorageSubTotal /* = Do a fetch request to prices.azure.com API to find the price of the closest disk size (Standard HDD) based on user input */;

//Total per month
const azureTotal = azureVmSubTotal + azureStorageSubTotal;


