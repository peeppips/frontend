"use client"



import React, { useState,useEffect } from 'react';
import axios from 'axios'
// import { Configuration,OpenAIApi} from 'openai'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import DashboardSidebar from './components/Sidebar';
import TopBarComponent from './components/TopBarComponent';
import Message from '../../components/Message';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { GetAccountsByUserState } from '../../types';
import Loader from '../../components/Loader';
import { Form } from 'react-bootstrap';
// import {  collection, addDoc } from 'firebase/firestore';


type MyServerComponentProps = {
  file: File | null;
  name: string;
  captions: string;
  questions: any[];
  responses: any[];
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onQuestionChange : (id:number,question: string) => void;
  onQuestionAdd : () => void;
  
};


function MyServerComponent(props: MyServerComponentProps) {
  
    const accountByUser = useSelector((state: RootState): GetAccountsByUserState => state.accountByUser as GetAccountsByUserState);  
  const [message,] = useState<string | null>(null);

  const { loading, error } = accountByUser

  return (

       <>
              <div className="min-height-300 bg-primary position-absolute w-100"></div>
              <DashboardSidebar/>


  <main className="main-content position-relative border-radius-lg ">
 
    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li className="breadcrumb-item text-sm"><a className="opacity-5 text-white" href="javascript:;">Pages</a></li>
            <li className="breadcrumb-item text-sm text-white active" aria-current="page">Dashboard</li>
          </ol>
          <h6 className="font-weight-bolder text-white mb-0">Dashboard</h6>
        </nav>
        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="input-group">
              <span className="input-group-text text-body"><i className="fas fa-search" aria-hidden="true"></i></span>
              <input type="text" className="form-control" placeholder="Type here..."/>
            </div>
          </div>
          <ul className="navbar-nav  justify-content-end">
            <li className="nav-item d-flex align-items-center">
              <a href="javascript:;" className="nav-link text-white font-weight-bold px-0">
                <i className="fa fa-user me-sm-1"></i>
                <span className="d-sm-inline d-none">Sign In</span>
              </a>
            </li>
            <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
              <a href="javascript:;" className="nav-link text-white p-0" id="iconNavbarSidenav">
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line bg-white"></i>
                  <i className="sidenav-toggler-line bg-white"></i>
                  <i className="sidenav-toggler-line bg-white"></i>
                </div>
              </a>
            </li>
            <li className="nav-item px-3 d-flex align-items-center">
              <a href="javascript:;" className="nav-link text-white p-0">
                <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
              </a>
            </li>
            <li className="nav-item dropdown pe-2 d-flex align-items-center">
              <a href="javascript:;" className="nav-link text-white p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa fa-bell cursor-pointer"></i>
              </a>
              <ul className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                <li className="mb-2">
                  <a className="dropdown-item border-radius-md" href="javascript:;">
                    <div className="d-flex py-1">
                      <div className="my-auto">
                        <img src="../assets/img/team-2.jpg" className="avatar avatar-sm  me-3 "/>
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          <span className="font-weight-bold">New message</span> from Laur
                        </h6>
                        <p className="text-xs text-secondary mb-0">
                          <i className="fa fa-clock me-1"></i>
                          13 minutes ago
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="mb-2">
                  <a className="dropdown-item border-radius-md" href="javascript:;">
                    <div className="d-flex py-1">
                      <div className="my-auto">
                        <img src="../assets/img/small-logos/logo-spotify.svg" className="avatar avatar-sm bg-gradient-dark  me-3 "/>
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          <span className="font-weight-bold">New album</span> by Travis Scott
                        </h6>
                        <p className="text-xs text-secondary mb-0">
                          <i className="fa fa-clock me-1"></i>
                          1 day
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item border-radius-md" href="javascript:;">
                    <div className="d-flex py-1">
                      <div className="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">
                        <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                          <title>credit-card</title>
                          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fill-rule="nonzero">
                              <g transform="translate(1716.000000, 291.000000)">
                                <g transform="translate(453.000000, 454.000000)">
                                  <path className="color-background" d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z" opacity="0.593633743"></path>
                                  <path className="color-background" d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          Payment successfully completed
                        </h6>
                        <p className="text-xs text-secondary mb-0">
                          <i className="fa fa-clock me-1"></i>
                          2 days
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  
    <div className="container-fluid py-4">

    {!loading ? (
           <TopBarComponent />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ):(<></>)}
    
  
      <div className="row mt-4">
        <div className="col-lg-12 mb-lg-0 mb-4">
          <div className="card ">
            <div className="card-header pb-0 p-3">
              <div className="d-flex justify-content-between">
                <h6 className="mb-2">Research</h6>

                {/* <Button  onClick={showModal} variant="primary">Add</Button> */}
              </div>
            </div>

            <div className="card-body">
            {message && <Message variant='danger'>{message}</Message>}
        {}
        {/* {success && <Message variant='success'>Profile Updated</Message>} */}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
        <>
    <form onSubmit={props.onSubmit}>
<Form.Group controlId="outlined-basic">
<Form.Group controlId="outlined-basic">
  <Form.Label>Question here</Form.Label>
  <Form.Control type="text"  />
</Form.Group></Form.Group>
      {/* <input type="text" id="text-input" name="name" value={props.name} onChange={props.onNameChange} /> */}
      <br />
     
   

<div>
<p>Enter Your Questions Here:</p>
      {props.questions.map((q) => (
        <div key={q.id}>
          <TextField id="outlined-basic" label="Question here" variant="outlined" onChange={(e) => props.onQuestionChange(q.id,e.target.value)} />
        </div>
      ))}
      <Button variant="contained" onClick={props.onQuestionAdd}>+</Button>
    </div>
    <Button variant="contained" type="submit">Submit</Button>
</form>

<h2>Answers</h2>

{/* <p>{props.captions}</p> */}
{props.responses.map((response) => (
<Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{response.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {response.answer}
          </Typography>
        </AccordionDetails>
      </Accordion>
))}

</>

        )}
    
    
  </div>


            </div>
          
          </div>
        
         
     
        </div>
      </div>
   
   
  </main>
  


            </>

   

  );
}

function MyClientComponent2() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
//   const [downloadedURL, setDownloadedURL] = useState<string>('');
//   const [percent, setPercent] = useState<number>(0);
  const [captions, setCaptions] = useState<string>('');
  const [questions, setQuestions] = useState([{ id: 1, question: '' }]);
  const [ responses, ] = useState([
    {question: "Question 1 Placeholder", answer: "The Answer to Question 1"}, {question: "Second Question Placeholder", answer: "Qestion 2 answer"}
  ]);
//   const { authUser, isLoading } = useAuth();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
   
    if (event.target.files) {
              setFile(event.target.files[0]);
              const x = event.target.files[0] 
              console.log(x)
}
else{
    console.log("no image uploaded");
    
}
    }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleQuestionChange = (id: number, question: string) => {
    console.log("sdads",question,id)
    const updatedQuestions = questions.map((q) => {
      if (q.id === id) {
        return { ...q, question };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    const newQuestionId = questions.length + 1;
    setQuestions([...questions, { id: newQuestionId, question: '' }]);
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name && !(name.includes('https://www.youtube.com/watch?v='))  ) {
      console.error('URL is missing or wrong');
      return;
    }
    if(!(questions.length > 2)){
      console.error('add more questions please for further analysis');
      return;
    }

    try {
     
          const parts = name.split('='); // Split the URL at the '=' character
          const videoId = parts[1].substring(0, 11); // Extract the video ID starting from index 1 and taking 11 characters
                
          const response = await axios.get(
                  `http://127.0.0.1:10000/captions/?videoID=${videoId}`
                  // `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoUrl=${videoUrl}&key=${apiKey}`
                );
                const captionsData = response.data.result
                console.log(captionsData)
                setCaptions(captionsData);

                // const configuration = new Configuration({
                //   apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
                // });
                // const openai = new OpenAIApi(configuration);
                // const r = await openai.createCompletion({
                //   model: "text-davinci-003",
                //   prompt :`Based on the following array of questions, ${questions} in each answer, based on the following text : ${captionsData} and output your answer in the form of [{question:....,answer:....}]`,
                //   temperature: 0,
                //   max_tokens: 1000,
                //   top_p: 1.0,
                //   frequency_penalty: 0.5,
                //   presence_penalty: 0.0,
                //   // stop: ["You:"],
                // });
                // if(r){
                //   const jtring = r.data.choices[0].text

                //   interface QnA {
                //     question: string;
                //     answer: string;
                //   }

                //   const dataArray: QnA[] = JSON.parse(jtring as string);
                //   console.log(dataArray);
                //   setResponses(dataArray)

                // //   const data = {
                // //     // account:authUser?.email,
                // //     jtring,
                // //     videoId
                // //   };

                // //   try {
                // //     //   await db.collection('items').add(data);
                // //       const myCollection = collection(db, 'researchCollection'); // create a reference to the 'myCollectionName' collection
                // //       const addNewDocument = async (x:object) => {
                // //         try {
                // //           const docRef = await addDoc(myCollection, x);
                // //           console.log('Document added with ID: ', docRef.id);
                // //         } catch (error) {
                // //           console.error('Error adding document: ', error);
                // //         }
                // //       };
                      
                     
                // //       addNewDocument(data)
                     
                
                      
                // //       console.log('Data uploaded to Firebase Firestore');
                // //     } catch (error) {
                // //       console.error(error);
                // //     }
                  
                //   // const generatedStory = r.data.choices[0].text;
                // }



    } catch (error) {
      console.error('Error retrieving captions:', error);
    }

  };

  useEffect(() => {
    // const videoUrl = 'https://www.youtube.com/watch?v=IitIl2C3Iy8';
    // const apiKey = 'AIzaSyDW19Gb8hf6U9PSOdFp5vF7m22CZv5B6xg';
    // const videoId = 'E0QJx8LT3gM'
    // https://www.youtube.com/watch?v=E0QJx8LT3gM&pp=ygUId2FtYWl0aGE%3D
    // const getCaptions = async () => {
    //   try {
    //     const response = await axios.get(
          
    //       `http://127.0.0.1:10000/captions`
    //       // `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoUrl=${videoUrl}&key=${apiKey}`
    //     );
    //     const captionsData = response.data
    //     console.log(captionsData)
    //     setCaptions(captionsData);
    //   } catch (error) {
    //     console.error('Error retrieving captions:', error);
    //   }
    // };

  
  }, []);

  return (
    <MyServerComponent
      file={file}
      name={name}
      captions={captions}
      questions={questions}
      responses={responses}
      onSubmit={handleSubmit}
      onFileChange={handleFileChange}
      onNameChange={handleNameChange}
      onQuestionChange={handleQuestionChange}
      onQuestionAdd={addQuestion}
    />
  );
}

export default MyClientComponent2;
