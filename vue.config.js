module.exports = {
    devServer: {
        proxy: 'http://localhost:8081'
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "~@/variables.sass"`,
                indentedSyntax: true
            }
        }
    }
}
