import HeaderContainer from "../containers/header";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../context/firebase";
import FooterContainer from "../containers/footer";
import { useState, useContext } from "react";
import { Form } from "../components";
import * as ROUTES from "../constants/routes";

export default function Signup() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || firstName === "" || emailAddress === "";

  const handleSignup = (event) => {
    event.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(emailAddress, password)
      .then((result) =>
        result.user
          .updateProfile({
            displayName: firstName,
            photoURL: Math.floor(Math.random() * 5) + 1,
          })
          .then(() => {
            history.push(ROUTES.BROWSE);
          })
      )
      .catch((error) => {
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      });
  };

  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign up</Form.Title>
          {error && <Form.Err>{error}</Form.Err>}
          <Form.Base>
            <Form.Input
              placeholder="First Name"
              value={firstName}
              onChange={(target) => setFirstName(target.value)}
            ></Form.Input>
            <Form.Input
              placeholder="Email"
              value={emailAddress}
              onChange={(target) => setEmailAddress(target.value)}
            ></Form.Input>
            <Form.Input
              type="password"
              placeholder="Password"
              autoComplete="off"
              value={password}
              onChange={(target) => setPassword(target.value)}
            ></Form.Input>
            <Form.Submit
              disabled={isInvalid}
              type="submit"
              onSubmit={handleSignup}
            >
              Sign up
            </Form.Submit>
            <Form.Text>
              Already a user? <Form.Link to="/signin">Sign in now.</Form.Link>
            </Form.Text>
            <Form.TextSmall>
              This page is protected by Google reCAPTCHA
            </Form.TextSmall>
          </Form.Base>
        </Form>
      </HeaderContainer>
      <FooterContainer />
    </>
  );
}