module = {
    exports: {
        devServer: {
            proxy: 'http://localhost:8081'
        }
    },
    rules: {
        test: /\.sass$/,
        use: [
            'vue-style-loader',
            'css-loader',
            {
                loader: 'sass-loader',
                options: {
                    indentedSyntax: true,
                    sassOptions: {
                        indentedSyntax: true
                    }
                }
            }
        ]
    }
}
