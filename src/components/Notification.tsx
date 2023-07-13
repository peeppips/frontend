import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { requestPermission, onMessageListener } from '../firebase';

function Notification() {
  interface Notification {
    title: any;
    body: any;
  }
  
  const [notification, setNotification] = useState<Notification>({
    title: '',
    body: ''
  })
    
    useEffect(() => {
    requestPermission();
  
   

    
    const unsubscribe = onMessageListener().then((payload) => {
      setNotification({
        title: payload,
        body: payload
      });
      toast.success(`${notification?.title}: ${notification?.body}`, {
        duration: 60000, 
        position: 'top-right',
      });
});
    return () => {
      unsubscribe.catch((err) => console.log('failed: ', err));
    };
  }, []);
  return (
    <div>
      <Toaster />
    </div>
  );
}
export default Notification;