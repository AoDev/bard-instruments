module.exports = {
  plugins: [
    [
      'add-module-exports',
      {
        addDefaultProperty: true,
      },
    ],
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {node: '16'},
        modules: 'commonjs',
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    '@babel/typescript',
    '@babel/preset-react',
  ],
  env: {
    production: {
      ignore: ['**/*.spec.js'],
    },
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 16,
            },
            modules: 'commonjs',
          },
        ],
        '@babel/typescript',
      ],
    },
  },
}
