"use client"
import React, { useState } from 'react';



  import { Button } from '@mui/material';

  type MyServerComponentProps = {
  file: File | null;
  name: string;
  downloadedURL:string,
  response:string,
  loading:boolean,
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function MyServerComponent(props: MyServerComponentProps) {
  return (
    <>
    {props.loading ? (<div className="lds-dual-ring"></div>):(
 <form onSubmit={props.onSubmit}>
 <label htmlFor="file-input">Select a file to upload:</label>
 <input type="file" accept=".mp4, .avi, .mov" id="file-input" name="file" onChange={props.onFileChange} />
 
 <br />     
 <Button variant='contained' type="submit">Upload</Button>
</form>
    )}
   
    {props.response}
    </>
  );
}

function MyClientComponent1() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [downloadedURL, ] = useState<string>('');
//   const [percent, ] = useState<number>(0);
  const [response,] = useState<string>('');
//   const { authUser } = useAuth();
  const [loading,] = useState<boolean>(false)

  const handleFileChange =  async(event: React.ChangeEvent<HTMLInputElement>) => {
   
    if (event.target.files) {
              setFile(event.target.files[0]);
            //   let sourceVideoFile = event.target.files[0] 
            //   let targetAudioFormat = 'mp3'
}
else{
    console.log("no image uploaded");
    
}
    }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };



  return (
    <MyServerComponent
          file={file}
          name={name}
          loading={loading}
          response={response}
          downloadedURL={downloadedURL}
          onFileChange={handleFileChange}
          onNameChange={handleNameChange} onSubmit={function (event: React.FormEvent<HTMLFormElement>): void {
            console.log(event)
              throw new Error('Function not implemented.',);
          } }    />
  );
}

export default MyClientComponent1;
