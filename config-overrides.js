const { aliasJest, aliasWebpack } = require("react-app-alias");

const aliasMap = {
    "@components": "src/components",
    "@services": "src/services",
    "@hooks": "src/hooks",
    "@pages": "src/pages",
    "@mocks": "src/mocks",
    "@colors": "src/colors",
    "@assets": "src/assets",
    "@redux": "src/redux",
    "@root": "src",
};

const options = {
    alias: aliasMap
}

module.exports = aliasWebpack(options)
module.exports.jest = aliasJest(options)