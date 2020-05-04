const path = require("path");
const resolve = dir => path.join(__dirname, dir);
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"))
      .set("common", resolve("src/common"))
      .set("network", resolve("src/network"))
  }
};




// module.exports= {
//   configureWebpack:{
//     resolve:{
//       alias:{
//         '@':'src',
//         "@assets":"src/assets",
//         '@common':'src/common',
//         'components':'src/components',
//         'network':'src/network',
//         'views':'src/views',
//       },
//     }
//   }
// };
