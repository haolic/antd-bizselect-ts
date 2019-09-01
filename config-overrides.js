const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addWebpackAlias({
    "@": resolve("/src")
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#C53D65', '@font-size-base': '12px' }
  })
);
