// import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { UserLoginState } from '../types';
import {
      ref,
      uploadBytesResumable,
      getDownloadURL 
  } from "firebase/storage";
import { storage } from '../firebase';

interface HostBotDetails {
  uploadedFilePath?: string;
  // Add any other properties you need in the HostBotDetails object
}

const UploadBotForm = () => {
  // const [, setImage] = useState('');
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      setUploading(true);

      try {
            const storageRef = ref(storage,`/bots/${new Date()}-${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                  "state_changed",
          //         (snapshot) => {
          // //             const percent = Math.round(
          // //                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // //             );
          //  
          //             // update progress
          // //             setPercent(percent);
          //         },
                  (err) => console.log(err),
                  () => {
                      // download url
                      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                          console.log(url);

         const hostBotDetailsString = localStorage.getItem('hostBotDetails');
        let hostBotDetails: HostBotDetails = {};

        if (hostBotDetailsString) {
          hostBotDetails = JSON.parse(hostBotDetailsString);
        }

        hostBotDetails.uploadedFilePath = url;

        localStorage.setItem('hostBotDetails', JSON.stringify(hostBotDetails));
      
                      });
                  }
              ); 

        // const config = {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        // };

        // const { data } = await axios.post('https://peeppipsbackend.onrender.com/api/upload/', formData, config);

        // setImage(data);
        // const hostBotDetailsString = localStorage.getItem('hostBotDetails');
        // let hostBotDetails: HostBotDetails = {};

        // if (hostBotDetailsString) {
        //   hostBotDetails = JSON.parse(hostBotDetailsString);
        // }

        // hostBotDetails.uploadedFilePath = data;

        // localStorage.setItem('hostBotDetails', JSON.stringify(hostBotDetails));
        setUploading(false);
        navigate('/host-bot/5');
      } catch (error) {
        console.error("error in uploading ",error);
        setUploading(false);
        // Display error message to the user
      }
    }
  };
  const userLogin = useSelector((state: RootState): UserLoginState => state.userLogin as UserLoginState);  
 
  // Destructure the properties with their types
const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      
    }
  }, [userInfo]);

  return (
    <div className="centered-container">
      <Container>
        <Form>
          <Form.Group as={Col} controlId="formBotFile">
            <Form.Label>Upload the bot</Form.Label>
            <Form.Control type="file" accept=".ex5,.mq5" onChange={uploadFileHandler} />
            {uploading && <Loader />}
            <Form.Text className="text-muted">
              Please upload an ex5 or mql5 file containing your bot.
            </Form.Text>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default UploadBotForm;
