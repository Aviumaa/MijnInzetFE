module.exports = {
    devServer: {
        port:8082,
        proxy: {
            '/api': {
                target: 'https://mijn-inzet.herokuapp.com',
                ws: true,
                changeOrigin: true
            }
        }
    }

};