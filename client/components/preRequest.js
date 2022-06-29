const clientId = 'eb9544ba-61ed-465f-837d-3e79ce76214d';
const clientSecret = 'f5P0fdAZgFQM8MzN4dm.ha8u_dOytIMpp~';
const tenantId = '1cde8b3a-4901-4049-bed2-4cc618324587';
const subscriptionId = '4693f16d-2d8c-429a-b738-1ccf85469450';
const resource = 'https://management.azure.com/';
import { pm } from 'postman';

// const validate = new pm();

// const PM = new pm();
console.log(pm);

// pm.test("Check for collectionVariables", function () {
//     let vars = ['clientId', 'clientSecret', 'tenantId', 'subscriptionId'];
//     vars.forEach(function (item, index, array) {
//         console.log(item, index);
//         pm.expect(pm.collectionVariables.get(item), item + " variable not set").to.not.be.undefined;
//         pm.expect(pm.collectionVariables.get(item), item + " variable not set").to.not.be.empty; 
//     });

    if (!pm.collectionVariables.get("bearerToken") || Date.now() > new Date(pm.collectionVariables.get("bearerTokenExpiresOn") * 1000000)) {
        pm.sendRequest({
            url: 'https://login.microsoftonline.com/' + pm.collectionVariables.get("tenantId") + '/oauth2/token',
            method: 'POST',
            header: 'Content-Type: application/x-www-form-urlencoded',
            body: {
                mode: 'urlencoded',
                urlencoded: [
                    { key: "grant_type", value: "client_credentials", disabled: false },
                    { key: "client_id", value: pm.collectionVariables.get("clientId"), disabled: false },
                    { key: "client_secret", value: pm.collectionVariables.get("clientSecret"), disabled: false },
                    { key: "resource", value: pm.collectionVariables.get("resource") || "https://management.azure.com/", disabled: false }
                ]
            }
        }, function (err, res) {
            if (err) {
                console.log(err);
            } else {
                let resJson = res.json();
                pm.collectionVariables.set("bearerTokenExpiresOn", resJson.expires_on);
                pm.collectionVariables.set("bearerToken", resJson.access_token);
            }
        });
    }
    // console.log(pm.collectionVariables);
});

export default preRequest;