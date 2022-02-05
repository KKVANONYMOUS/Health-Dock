import { StyledSpinner } from './style'

const Spinner = ({ width, height, color = '#fff' }) => (
  <StyledSpinner
    viewBox='0 0 50 50'
    width={width}
    height={height}
    color={color}
  >
    <circle
      className='path'
      cx='25'
      cy='25'
      r='20'
      fill='none'
      strokeWidth='4'
    />
  </StyledSpinner>
)

export default Spinner
