import React from "react";
import { Container, Image, Button } from "react-bootstrap";
import CustomNavbar from "./components/CustomNavbar";
import { useAuth } from "./contexts/AuthContext";

function Home() {
  const { currentUser } = useAuth();
  return (
    <div>
      <CustomNavbar/>
      <Container>
      <div class="card" style={{"marginBottom": "40px"}}>
        <div class="card-body">
          <p class="card-text">Remember the time you spend waiting for backend APIs to finally test your frontend App. Well not anymore, 
          MockPostie to your rescue. The Mockpostie is a tool for frontend development. It helps you to create mock API's for your projects and to use them instead of real API's.
          on our tool you can create mock api routes & paste sample responses. 
          We provide you with a route which you can use in your app and fetch that sample respone to use in your code.</p>
        </div>
        <Image src="https://www.pngkit.com/png/detail/93-937436_pigeon-cartoon.png" thumbnail={true} alt="mockpostie"/>
      </div>
      <h3 style={{"textAlign": "center"}}>What MockPostie Offer?</h3>
      <div class="card-deck">
          <div class="card" style={{"marginBottom": "40px"}}>
            <div class="card-body">
              <h5 class="card-title"><a href="/create">Create Your Mock API</a></h5>
              <p class="card-text">Simply enter your required endpoint and the response you want it to return and hit submit. Voila!! your endpoint is ready.</p>
            </div>
            <img src="/createMockPostie.png" class="card-img-top" alt="create Endpoint"/>
          </div>
          <div class="card" style={{"marginBottom": "40px"}}>
            <div class="card-body">
              <h5 class="card-title"><a href="/">Monitor Your Endpoints</a></h5>
              <p class="card-text">You can view/edit/delete your endpoints</p>
            </div>
            <img src="/viewEndpoint.png" class="card-img-top" alt="view EndPoint"/>
          </div>
          {!currentUser && 
            <div class="card" style={{"marginBottom": "40px"}}>
            <div class="card-body">
              <h5 class="card-title"><Button onClick="/login">Let's Get Started</Button></h5>
            </div>
            <img src="https://d1.awsstatic.com/Developer%20Marketing/languages/net/Get%20Started-2x.fee9fe2376c2bb4f4c49d81524f0cd0636e65a5e.png" class="card-img-top rounded-circle" alt="Get Started"/>
          </div>
          }
        </div>
      </Container>
    </div>
  );
}

export default Home;
