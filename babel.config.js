module.exports = {
  'plugins': [
    [
      '@babel/plugin-proposal-decorators',
      {
        'legacy': true
      }
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        'loose': true
      }
    ],
    [
      '@babel/plugin-proposal-object-rest-spread',
      {
        'loose': true
      }
    ],
    // ['@babel/plugin-transform-runtime']
  ],
  'presets': [
    [
      '@babel/preset-env',
      {
        'targets': {
          'chrome': 61,
          'node': 8,
          'electron': '2.0.9'
        },
        'modules': 'commonjs',
        'useBuiltIns': 'usage'
      }
    ],
    '@babel/typescript',
    '@babel/preset-react'
  ],
  'env': {
    'production': {
      'ignore': ['**/*.spec.js']
    },
    'test': {
      'presets': [
        [
          '@babel/preset-env',
          {
            'targets': {
              'node': 8,
            },
            'modules': 'commonjs'
          }
        ],
        '@babel/typescript',
      ]
    }
  }
}
