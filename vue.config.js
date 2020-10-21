const path = require('path')

module.exports = {
    publicPath: process.env.VUE_APP_PUBLIC,
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                // 'common': '@/common',
                'components': '@/components',
                // 'network': '@/network',
                // 'configs': '@/configs',
                'views': '@/views',
                // 'plugins': '@/plugins',
            }
        }
    },
//   module:{
//       rules:[
//         {
//             test: require.resolve('three/examples/js/controls/OrbitControls'),
//             use: 'imports-loader?THREE=three'
//             },
//             {
//             test: require.resolve('three/examples/js/controls/OrbitControls'),
//             use: 'exports-loader?THREE.OrbitControls'
//             }
//       ]
//   }
}