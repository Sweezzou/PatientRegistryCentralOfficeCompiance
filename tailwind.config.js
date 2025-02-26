module.exports = {
    content: [
      "./src/**/*.{html,js}",
      "./node_modules/flowbite/**/*.js",
      "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    ],
              
    theme: {
      extend: {
        screens: {
          "other": {'min': '340px', 'max': '1200px'},
        },
      },
    },
    plugins: [
      require('flowbite/plugin')
    ],
  }