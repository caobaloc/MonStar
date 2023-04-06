// module.exports = function override(config, env){
//     return config;
// };
const {override, useBabelRc} = require("customize-cra");

module.exports = override(
    useBabelRc()
);