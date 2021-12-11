import { css } from 'styled-components'

import PoppinsRegularWoff from '../fonts/Poppins/poppins-v15-latin-regular.woff'
import PoppinsRegularWoff2 from '../fonts/Poppins/poppins-v15-latin-regular.woff2'
import PoppinsMediumWoff from '../fonts/Poppins/poppins-v15-latin-500.woff'
import PoppinsMediumWoff2 from '../fonts/Poppins/poppins-v15-latin-500.woff2'
import PoppinsSemiboldWoff from '../fonts/Poppins/poppins-v15-latin-600.woff'
import PoppinsSemiboldWoff2 from '../fonts/Poppins/poppins-v15-latin-600.woff2'
import PoppinsBoldWoff from '../fonts/Poppins/poppins-v15-latin-700.woff'
import PoppinsBoldWoff2 from '../fonts/Poppins/poppins-v15-latin-700.woff2'

import MontserratRegularWoff from '../fonts/Montserrat/montserrat-v18-latin-regular.woff'
import MontserratRegularWoff2 from '../fonts/Montserrat/montserrat-v18-latin-regular.woff2'
import MontserratMediumWoff from '../fonts/Montserrat/montserrat-v18-latin-500.woff'
import MontserratMediumWoff2 from '../fonts/Montserrat/montserrat-v18-latin-500.woff2'
import MontserratSemiboldWoff from '../fonts/Montserrat/montserrat-v18-latin-600.woff'
import MontserratSemiboldWoff2 from '../fonts/Montserrat/montserrat-v18-latin-600.woff2'
import MontserratBoldWoff from '../fonts/Montserrat/montserrat-v18-latin-700.woff'
import MontserratBoldWoff2 from '../fonts/Montserrat/montserrat-v18-latin-700.woff2'

import QuicksandRegularWoff from '../fonts/Quicksand/quicksand-v24-latin-regular.woff'
import QuicksandRegularWoff2 from '../fonts/Quicksand/quicksand-v24-latin-regular.woff2'
import QuicksandMediumWoff from '../fonts/Quicksand/quicksand-v24-latin-500.woff'
import QuicksandMediumWoff2 from '../fonts/Quicksand/quicksand-v24-latin-500.woff2'
import QuicksandSemiboldWoff from '../fonts/Quicksand/quicksand-v24-latin-600.woff'
import QuicksandSemiboldWoff2 from '../fonts/Quicksand/quicksand-v24-latin-600.woff2'
import QuicksandBoldWoff from '../fonts/Quicksand/quicksand-v24-latin-700.woff'
import QuicksandBoldWoff2 from '../fonts/Quicksand/quicksand-v24-latin-700.woff2'

const poppinsWeights = {
  400: [PoppinsRegularWoff, PoppinsRegularWoff2],
  500: [PoppinsMediumWoff, PoppinsMediumWoff2],
  600: [PoppinsSemiboldWoff, PoppinsSemiboldWoff2],
  700: [PoppinsBoldWoff, PoppinsBoldWoff2],
}

const montserratWeights = {
  400: [MontserratRegularWoff, MontserratRegularWoff2],
  500: [MontserratMediumWoff, MontserratMediumWoff2],
  600: [MontserratSemiboldWoff, MontserratSemiboldWoff2],
  700: [MontserratBoldWoff, MontserratBoldWoff2],
}

const quicksandWeights = {
  400: [QuicksandRegularWoff, QuicksandRegularWoff2],
  500: [QuicksandMediumWoff, QuicksandMediumWoff2],
  600: [QuicksandSemiboldWoff, QuicksandSemiboldWoff2],
  700: [QuicksandBoldWoff, QuicksandBoldWoff2],
}

const poppinsFamily = {
  name: 'Poppins',
  normal: poppinsWeights,
}

const montserratFamily = {
  name: 'Montserrat',
  normal: montserratWeights,
}

const quicksandFamily = {
  name: 'Quicksand',
  normal: quicksandWeights,
}

const createFontFaces = (family, style = 'normal') => {
  let styles = ''

  for (const [weight, formats] of Object.entries(family[style])) {
    const woff = formats[0]
    const woff2 = formats[1]

    styles += `
        @font-face {
          font-family: '${family.name}';
          src: url(${woff2}) format('woff2'),
              url(${woff}) format('woff');
          font-weight: ${weight};
          font-style: ${style};
          font-display: auto;
        }
      `
  }

  return styles
}

const poppins = createFontFaces(poppinsFamily)
const montserrat = createFontFaces(montserratFamily)
const quicksand = createFontFaces(quicksandFamily)

const Fonts = css`
  ${poppins + montserrat + quicksand}
`
export default Fonts
