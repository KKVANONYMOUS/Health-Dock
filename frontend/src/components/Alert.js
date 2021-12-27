import styled from 'styled-components'

const AlertBox = styled.div`
  color: ${({ error }) => (error ? '#712b29' : '#0f5132')};
  background-color: ${({ error }) => (error ? '#f7dddc' : '#d1e7dd')};
  border-color: ${({ error }) => (error ? '#f4cfce' : '#badbcc')};
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  transition: opacity 0.15s linear;
  font-family: 'Quicksand';
  font-size: 12px;
  width: ${({ width }) => width};
`
const Alert = ({ error, message, width = '100%' }) => {
  return (
    <AlertBox error={error} width={width}>
      {message}
    </AlertBox>
  )
}

export default Alert
