import "./LogIn.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { Button } from "../../component/button/Button";

// import { authenticate } from "../../api/authenticate";
import { getAuth } from "../../api/getAuth";
import { handleCookieConfirm } from "../../handlers/handleCookieConfirm";
import { handleCookieReject } from "../../handlers/handleCookieReject";
import { loginAuth } from "../../api/loginAuth";
import { handleLogout } from "../../handlers/handleLogout";
import { Link } from "react-router-dom";

export const LogIn = () => {
  const [users, setUsers] = useState([]);
  // const [toLogin, setToLogin] = useState({});
  const [warning, setWarning] = useState("");

  const initUsers = async (name, pass) => {
    const usersPromise = await getAuth("users", Cookies.get("token"));
    setUsers(usersPromise);
  };

  const loginUser = async (name, pass) => {
    const authPromise = await loginAuth(name, pass);
    if (authPromise.jwt) {
      Cookies.set("username", authPromise.user.username);
      Cookies.set("email", authPromise.user.email);
      Cookies.set("id", authPromise.user.id);
      Cookies.set("password", pass);
      Cookies.set("jwt", authPromise.jwt);
      console.log("login user:", name, pass, authPromise);
      setWarning("");
      window.location.reload(false);
      // setToLogin(authPromise);
    } else {
      console.log("incorrect password", name, pass, authPromise);
      setWarning("Incorrect password");
      // setToLogin({});
    }
  };

  useEffect(() => {
    /*
    console.log(
      "who's logged in?",
      Cookies.get("username"),
      Cookies.get("id"),
      Cookies.get("email"),
      Cookies.get("password"),
      Cookies.get("jwt")
    );
    */
    if (Cookies.get("cookieConfirm")) {
      initUsers("ghost", "jocKor-qufva5-vinqax");
    }
  }, []);

  /*
  if (users[0]) {
    console.log("test login", users);
  }
  */

  // console.log("cookie login test", Cookies.get("cookieConfirm"));

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
  ) : Cookies.get("username") ? (
    <div className="logout-section">
      <h2 className="logout-head">Welcome back {Cookies.get("username")}!</h2>
      <p className="logout-p">Play the exquisite game:</p>
      <Link to="/lobby">
        <Button
          kind="submit"
          title="To the Exquisite lobby"
          face="yellow"
        ></Button>
      </Link>
      <p className="logout-p">logout</p>
      <Button
        kind="submit"
        title="logout"
        face="red"
        action={handleLogout}
      ></Button>
    </div>
  ) : (
    <div className="login">
      <div className="cookie-confirm">
        <h2>reject cookies</h2>
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
          password: "",
        }}
        validationSchema={object({
          exquisite: string().required("Required Field"),
          password: string()
            .required("Required Field")
            .min(6, "Password must be longer than four digits")
            .max(20, "Password must be shorter than twenty digits"),
        })}
        onSubmit={(values, onSubmitProps) => {
          onSubmitProps.resetForm();
          for (let i = 0; i < users.length; i++) {
            if (
              values.exquisite === users[i].email ||
              values.exquisite === users[i].username
            ) {
              loginUser(values.exquisite, values.password);
              return;
            }
          }
          console.log("no such user", values.exquisite);
          setWarning(`${values.exquisite} is not yet exquisite`);
        }}
      >
        {({ values, isSubmitting, errors }) => (
          <Form className="login-form">
            <span className="login-warning">{warning}</span>
            <div className="login-name">
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
            <div className="login-pass">
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
            <div>
              <Button
                kind="submit"
                title="Log In"
                face="blue"
                disabled={isSubmitting}
              />
            </div>
            <pre>{JSON.stringify(values, null, 4)}</pre>
            <pre>{JSON.stringify(errors, null, 4)}</pre>
          </Form>
        )}
      </Formik>
      <a href="/signup">Not Exquisite Yet?</a>
    </div>
  );
};
