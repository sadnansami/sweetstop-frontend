module.exports = {
    "plugins": [
      "postcss-flexbugs-fixes",
      [
        "postcss-preset-env",
        {
          "autoprefixer": {
            "flexbox": "no-2009"
          },
          "stage": 3,
          "features": {
            "custom-properties": false
          }
        }
      ],
      [
        '@fullhuman/postcss-purgecss',
        {
          content: [
              './src/pages/**/*.{js,jsx,ts,tsx}',
              './src/components/**/*.{js,jsx,ts,tsx}',
              './src/js/**/*.{js,jsx,ts,tsx}',
              './node_modules/react-bootstrap/**/*.{js,jsx,ts,tsx}'
          ],
          css: [
              './src/css/**/*.css'
          ],
        }
      ],
    ]
}