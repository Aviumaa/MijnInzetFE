module.exports = {
  devServer: {
    port: 8081,
    proxy: {
      "/api": {
        target: "http://localhost:3000"
        // target: 'https://mijn-inzet.herokuapp.com',
        // ws: true,
        // changeOrigin: true
      }
    }
  }
};
