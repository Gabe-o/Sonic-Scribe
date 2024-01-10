import * as React from "react";
import NavigationBar from "../components/NavigationBar";
import BG from "../images/headphone-bg.png";
import 'bootstrap/dist/css/bootstrap.min.css';
//import styles from './styles/index.css';

import { Container } from "react-bootstrap"

const styles = {
    header: {
        fontFamily: 'Brush Script MT, cursive',
          color: 'white',
          fontSize: '72px',
        },
   
    p: {
    fontFamily: 'Arial, sans-serif',
      color: 'white',
      fontSize: '16px',
    },
   
  };

const IndexPage = () => {
    return (
        <>
            <div className="relative h-screen">
                
                <div className="absolute inset-0 z-10">
                    <NavigationBar />
                </div>

                <img src={BG} className="absolute inset-0 object-cover w-full h-full z-0" />
       
            </div>

               

            <Container>
                
                <div class = "info">
                    
                    <div className = "position-absolute top-40 start-5">
                        <header style = {styles.header}>
                            Welcome to Sonic Scribe
                        </header>
                    </div>
                    
                            
                        <body>
                            <div className = "position-absolute top-80 start-5">
                                <p style = {styles.p} >
                                    Experience the seamless transformation of your favorite tunes into written notes with our 
                                    innovative audio-to-sheet music converter. 
                                </p>
                                <p style = {styles.p} >
                                    Our platform allows you to effortlessly convert audio tracks, 
                                    melodies, or compositions into accurate and readable sheet music. 
                                </p>
                                <p style = {styles.p} >
                                    Simply upload your audio file, and watch as 
                                    our advanced technology transcribes the music into sheet notation, providing musicians and composers with a 
                                    new way to capture, preserve, and explore melodies. 
                                </p>
                                
                            </div>
                        </body>
                </div>
            </Container>
            
            
        </>

    );
};

export default IndexPage;

export const Head = () => <title>SonicScribe</title>;
