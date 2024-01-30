import React from "react";
import DynamicForm from "./components/DynamicForm";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Home = () => {
  return (
    <div>
      <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
        <DynamicForm />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Home;
