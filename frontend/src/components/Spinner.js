import React from 'react'
import styled from 'styled-components'

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  width: ${({ width }) => width + 'px'};
  height: ${({ height }) => height + 'px'};

  & .path {
    stroke: #fff;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`

const Spinner = ({ width, height }) => (
  <StyledSpinner viewBox='0 0 50 50' width={width} height={height}>
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
