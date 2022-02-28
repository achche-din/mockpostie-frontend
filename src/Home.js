import React from "react";
import { Container, Image } from "react-bootstrap";
import CustomNavbar from "./components/CustomNavbar";

function Home() {
  return (
    <div>
      <CustomNavbar />
      <Container>
        <div className="card" style={{ marginBottom: "40px" }}>
          <div className="card-body row">
            <Image
              className="col-md-6 col-sm-12"
              src="https://www.pngkit.com/png/detail/93-937436_pigeon-cartoon.png"
              thumbnail={true}
              alt="mockpostie"
              style={{ maxWidth: "20rem", marginRight: "10px" }}
            />
            <p className="card-text col-md-6 col-sm-12">
              Remember the time you spend waiting for backend APIs to finally
              test your frontend App. Well not anymore, MockPostie to your
              rescue. The Mockpostie is a tool for frontend development. It
              helps you to create mock API's for your projects and to use them
              instead of real API's. on our tool you can create mock api routes
              & paste sample responses. We provide you with a route which you
              can use in your app and fetch that sample respone to use in your
              code.
            </p>
          </div>
        </div>
        <h3 style={{ textAlign: "center" }}>What MockPostie Offer?</h3>
        <div className="card-deck">
          <div className="card" style={{ marginBottom: "40px" }}>
            <div className="card-body">
              <h5 className="card-title">
                <a href="/create">Create Your Mock API</a>
              </h5>
              <p className="card-text">
                Simply enter your required endpoint and the response you want it
                to return and hit submit. Voila!! your endpoint is ready.
              </p>
            </div>
            <img
              src="/createMockPostie.png"
              className="card-img-top"
              alt="create Endpoint"
            />
          </div>
          <div className="card" style={{ marginBottom: "40px" }}>
            <div className="card-body">
              <h5 className="card-title">
                <a href="/dashboard">Monitor Your Endpoints</a>
              </h5>
              <p className="card-text">
                You can view/edit/delete your endpoints
              </p>
            </div>
            <img
              src="/viewEndpoint.png"
              className="card-img-top"
              alt="view EndPoint"
            />
          </div>
        </div>
        <h3 style={{ textAlign: "center" }}>How to use MockPostie?</h3>
        <div className="card" style={{ marginBottom: "40px" }}>
            <div className="card-body">
              <p className="card-text">
              <ul class="list-group">
                <li class="list-group-item"><a href="/create">Create</a> your endPoint. Suppose You created an endpoint /book.</li>
                <li class="list-group-item">Copy the url of your endpoint from <a href="/dashboard">dashboard</a>. The url will be https://mockpostie.herokuapp.com/api/:loggedInUserId/book/</li>
                <li class="list-group-item">Keep a BACKEND_BASE_URL variable in your .env file where BACKEND_BASE_URL=https://mockpostie.herokuapp.com/api/:loggedInUserId</li>
                <li class="list-group-item">Now when you will hit /book from your app. Your app will hit the mockpostie API and will get the response.</li>
                <li class="list-group-item">When your actual backend API's are ready, just replace the BACKEND_BASE_URL in your .env file with your original backend server base url.</li>
              </ul>
              </p>
            </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
