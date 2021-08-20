const AxiosHelper = require('axios');

AxiosHelper.defaults.headers.common["accept"] = "application/json";
AxiosHelper.defaults.headers.common["Content-Type"] = "application/json";
AxiosHelper.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
// AxiosHelper.defaults.headers.common["Authorization"] = "Basic sHtak";



export default AxiosHelper