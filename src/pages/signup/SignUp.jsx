import "./SignUp.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { ref, object, string } from "yup";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import { Button } from "../../component/button/Button";

import { authenticate } from "../../api/authenticate";
import { getAuth } from "../../api/getAuth";
import { post } from "../../api/post";
import { handleCookieConfirm } from "../../handlers/handleCookieConfirm";
import { handleCookieReject } from "../../handlers/handleCookieReject";

export const SignUp = () => {
  const [users, setUsers] = useState([]);
  const [warning, setWarning] = useState("");
  const [isSignUp, setIsSignUp] = useState("");

  const initUsers = async (name, pass) => {
    const authPromise = await authenticate(name, pass);
    const jwt = authPromise.jwt;
    const usersPromise = await getAuth("users", jwt);
    setUsers(usersPromise);
  };

  useEffect(() => {
    if (Cookies.get("cookieConfirm")) {
      initUsers("ghost", "jocKor-qufva5-vinqax");
    }
  }, []);

  /*
  if (users[0]) {
    console.log("test signup", users);
    // Cookies.set("id", users[0].id);
    // console.log("cookie test", Cookies.get("id"));
  }
  */

  return !Cookies.get("cookieConfirm") ? (
    <div className="cookie-confirm">
      <h2>confirm cookies</h2>
      <Button
        kind="submit"
        title="confirm cookies"
        face="green"
        action={handleCookieConfirm}
      ></Button>
    </div>
  ) : Cookies.get("id") ? (
    <div className="already-login">
      <h2 className="already-head">
        Already connected as {Cookies.get("username")}
      </h2>
      <p className="already-p">Logout to Sign Up a new Exquisite</p>
      <Link to="/login">
        <Button kind="submit" title="To Logout" face="red"></Button>
      </Link>
    </div>
  ) : isSignUp ? (
    <div className="congrats">
      <h2 className="congrats-head">Success!</h2>
      <p className="congrats-par">Login to play</p>
      <Link to="/login">
        <Button kind="submit" title="To Login" face="green"></Button>
      </Link>
    </div>
  ) : (
    <div className="signup">
      <div className="cookie-reject">
        <h3>reject cookies</h3>
        <Button
          kind="submit"
          title="reject cookies"
          face="green"
          action={handleCookieReject}
        ></Button>
      </div>
      <Formik
        initialValues={{
          exquisite: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={object({
          exquisite: string().required("Required Field"),
          email: string().required("Required Field"),
          password: string()
            .required("Required Field")
            .min(6, "Password must be longer than four digits")
            .max(20, "Password must be shorter than twenty digits"),
          passwordConfirmation: string()
            .oneOf([ref("password"), null], "Passwords must match")
            .required("Required Field"),
        })}
        onSubmit={(values, onSubmitProps) => {
          const toPost = {
            email: values.email,
            password: values.password,
            username: values.exquisite,
          };
          onSubmitProps.resetForm();
          for (let i = 0; i < users.length; i++) {
            if (
              values.exquisite === users[i].username ||
              values.exquisite === users[i].email
            ) {
              setWarning("Exquisite name is already taken");
              console.log("Exquisite name is already taken");
              return;
            } else if (
              values.email === users[i].email ||
              values.email === users[i].username
            ) {
              setWarning("Exquisite email is already used", toPost);
              console.log("Exquisite email is already used", toPost);
              return;
            }
          }
          console.log("create user:", values, toPost);
          return new Promise((resolve) => {
            setIsSignUp(values.exquisite);
            post("auth/local/register", toPost);
            resolve();
          }, 500);
        }}
      >
        {({ values, isSubmitting, errors }) => (
          <Form className="sign-up-form">
            <span className="warning">{warning}</span>
            <div className="sign-up-name">
              <label htmlFor="exquisite">Exquisite Name:</label>
              <Field
                name="exquisite"
                type="text"
                placeholder="Your Exquisite Name"
              ></Field>
              <ErrorMessage
                component="div"
                className="error"
                name="exquisite"
              ></ErrorMessage>
            </div>
            <div className="sign-up-email">
              <label htmlFor="email">Exquisite Email:</label>
              <Field
                name="email"
                type="email"
                placeholder="Exquisite Email"
              ></Field>
              <ErrorMessage
                component="div"
                className="error"
                name="email"
              ></ErrorMessage>
            </div>
            <div className="sign-up-pass">
              <label htmlFor="password">Exquisite Password:</label>
              <Field
                name="password"
                type="password"
                placeholder="Exquisite Password"
              ></Field>
              <ErrorMessage
                component="div"
                className="error"
                name="password"
              ></ErrorMessage>
            </div>
            <div className="sign-up-pass-confirm">
              <label htmlFor="password">Password Confirm:</label>
              <Field
                name="passwordConfirmation"
                type="password"
                placeholder="Password Confirm"
              ></Field>
              <ErrorMessage
                component="div"
                className="error"
                name="passwordConfirmation"
              ></ErrorMessage>
            </div>
            <div>
              <Button
                kind="submit"
                title="Sign Up"
                face="blue"
                disabled={isSubmitting}
              />
            </div>
            <pre>{JSON.stringify(values, null, 4)}</pre>
            <pre>{JSON.stringify(errors, null, 4)}</pre>
          </Form>
        )}
      </Formik>
      <a className="signup-link" href="/login">
        Already Exquisite?
      </a>
    </div>
  );
};
