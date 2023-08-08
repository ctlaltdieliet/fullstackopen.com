module.exports = {
    'env': {
        'commonjs': true,
        'es2021': true,

        'node': true
    },

    'plugins': ['prettier'],
    'extends': ['eslint:recommended'],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
            'modules': true
        },
        'sourceType': 'module'
    },
    'rules': {
        'indent': [
            'error',
            4 
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
    }
}
