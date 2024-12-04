/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {

    
    fontFamily: {
      'poppins': ["Poppins", "sans-serif"],
      'kanit': ["Kanit", "sans-serif"],
    },
    extend: {
      boxShadow: {
        'custom-light': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'custom-dark': '0 25px 50px rgba(0, 0, 0, 0.25)',
      },

      fontSize: {
        'custom-lg': '20px', // Adiciona um tamanho de fonte personalizado
        'custom-xl': '32px', // Outro tamanho personalizado
      },
      colors: {
        primary: {
          black: "#191919",
          white: "#FFFF",
          gray: "#242424"
        },
        complementary: {
          blue: "#152259",
          red: "#bf0000",
        }
      },

      backgroundColor: {
        backgroundApp : "#242424"
      }
    }
    
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

