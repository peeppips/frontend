import axios from 'axios';
import  { useState } from 'react';
import { Form, Col, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const UploadBotForm = () => {
//   const [botFile, ] = useState(null);
  const [, setImage] = useState('')
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false)
//   const handleBotFileChange = (e: { target: { files: React.SetStateAction<null>[]; }; }) => {
//     setBotFile(e.target.files[0]);
//   };


const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {

        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
      
            const { data } = await axios.post('http://localhost:5000/api/upload/', formData, config)
      
            setImage(data)
            setUploading(false)
          } catch (error) {
            console.error(error)
            setUploading(false)
          }
          
    }

  
  }


  const handleNext = () => {
    // Perform the necessary action with the uploaded bot file
    // For example, you can upload it to a server or process it further

    navigate('/host-bot/5');
  };

  return (
    <Container style={{marginTop:"5%"}}>
      <Form>
        <Form.Group as={Col} controlId="formBotFile">
          <Form.Label>Upload the bot</Form.Label>
          <Form.Control
            type="file"
            accept=".ex5,.mq5"
            onChange={uploadFileHandler}
          />
           {uploading && <Loader />}
          <Form.Text className="text-muted">
            Please upload an ex5 or mql5 file containing your bot.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" onClick={handleNext} >
          Next
        </Button>
      </Form>
    </Container>
  );
};

export default UploadBotForm;
