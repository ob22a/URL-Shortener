interface NotificationProps{
    message: string;
    type: 'success' | 'error' | 'info';
    show:boolean
}

const Notification:React.FC<NotificationProps> = ({message, type, show}) => {
  if(!show) return null;
  return (
    <div className={`notification ${type}`}>{message}</div>
  )
}

export default Notification