module.exports = {
  chainWebpack: (config) => {
    config.module
      // 设置 elint-fix
      .rule('eslint')
      .use('eslint-loader')
      .options({
        fix: true,
      });
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /.woff$/,
          loader: 'url-loader',
          options: {
            limit: 500000,
          },
        },
      ],
    },
  },
};
