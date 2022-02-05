import { AlertBox } from './style'

const Alert = ({ error, message, width = '100%' }) => {
  return (
    <AlertBox error={error} width={width}>
      {message}
    </AlertBox>
  )
}

export default Alert
