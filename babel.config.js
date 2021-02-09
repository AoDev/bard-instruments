module.exports = {
  plugins: [
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    [
      '@babel/plugin-proposal-object-rest-spread',
      {
        loose: true,
      },
    ],
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
        targets: {
          node: 10,
        },
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
              node: 10,
            },
            modules: 'commonjs',
          },
        ],
        '@babel/typescript',
      ],
    },
  },
}
