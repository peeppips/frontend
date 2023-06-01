import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import SidebarNav from '../components/Sidebar';
import { createProject } from '../actions/projectActions';
import { useDispatch } from 'react-redux';
import {
        ref,
        uploadBytesResumable,
        getDownloadURL 
    } from "firebase/storage";
    import {storage} from '../firebase'
    import { ThunkDispatch } from 'redux-thunk';
    import { AnyAction } from 'redux';

const NewProjectScreen: React.FC = () => {

  const [name, setName] = useState('');
  const [, setFile] = useState<File | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [market, setMarket] = useState('');
  const [lotSize, setLotSize] = useState('');
  const [riskManagement, setRiskManagement] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [, setPercent] = useState(0);
  const [image, setImage] = useState('');

  const dispatch = useDispatch();
  
 
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await (dispatch as ThunkDispatch<any, any, AnyAction>)(
      createProject({
        name,
        strategy: image,
        apiKey,
        market,
        lotSize,
        riskManagement,
        stopLoss,
        takeProfit,
      })
    );
  };
  



  async function handleUpload(x: File) {
        console.log("storage is ",storage)
        const storageRef = ref(storage,`/strtegies/${new Date()}-${x.name}`)
        const uploadTask = uploadBytesResumable(storageRef, x);
     
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
     
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
   
                setImage(url);
                return url;

  
                });
            }
        ); 
    }
  
  
    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
      const selectedFile = event.target.files?.[0];
    
      if (selectedFile) {
        setFile(selectedFile);
        handleUpload(selectedFile);
      }
    }
    

  


  return (
    <Row>
        <SidebarNav />
        <Col md={8}>
        <h2>Create a New Project</h2>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="file">
          <Form.Label>Upload File:</Form.Label>
          <Form.Control
            type="file"
            accept=".mq5, .mq4, .ex5, .ex4" 
            onChange={handleFileChange} required           
            // onChange={(event) => setFile(event.target.files?.[0] || null)}
            // required
            
          />
        </Form.Group>

        <Form.Group controlId="apiKey">
          <Form.Label>API Key for Derive:</Form.Label>
          <Form.Control
            type="text"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="market">
          <Form.Label>Market:</Form.Label>
          <Form.Control
            type="text"
            value={market}
            onChange={(event) => setMarket(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="lotSize">
          <Form.Label>Lot Size:</Form.Label>
          <Form.Control
            type="text"
            value={lotSize}
            onChange={(event) => setLotSize(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="riskManagement">
          <Form.Label>Risk Management:</Form.Label>
          <Form.Control
            type="text"
            value={riskManagement}
            onChange={(event) => setRiskManagement(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="stopLoss">
          <Form.Label>Stop Loss Points:</Form.Label>
          <Form.Control
            type="text"
            value={stopLoss}
            onChange={(event) => setStopLoss(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="takeProfit">
          <Form.Label>Take Profit Points:</Form.Label>
          <Form.Control
            type="text"
            value={takeProfit}
            onChange={(event) => setTakeProfit(event.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit">Create Project</Button>
      </Form>

        </Col>

    </Row>
  );
};

export default NewProjectScreen;
