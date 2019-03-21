module.exports = {
    devServer: {
        port:8081,
        proxy: {
            '/api': {
                target: 'https://mijn-inzet.herokuapp.com',
                ws: true,
                changeOrigin: true
            }
        }
    }

};