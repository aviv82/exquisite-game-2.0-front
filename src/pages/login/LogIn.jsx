import "./LogIn.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { Button } from "../../component/button/Button";

import { authenticate } from "../../api/authenticate";
import { getAuth } from "../../api/getAuth";
import { handleCookieConfirm } from "../../handlers/handleCookieConfirm";
import { handleCookieReject } from "../../handlers/handleCookieReject";

export const LogIn = () => {
  const [users, setUsers] = useState([]);

  const initUsers = async () => {
    const authPromise = await authenticate("tester");
    const jwt = authPromise.jwt;
    const usersPromise = await getAuth(jwt);
    setUsers(usersPromise);
  };

  useEffect(() => {
    if (Cookies.get("cookieConfirm")) {
      initUsers();
    }
  }, []);

  if (users[0]) {
    console.log("test login", users[0].id);
  }

  console.log("cookie login test", Cookies.get("cookieConfirm"));

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
            .min(4, "Password must be longer than four digits")
            .max(20, "Password must be shorter than twenty digits"),
        })}
        onSubmit={(values, onSubmitProps) => {
          console.log("values", values);
          onSubmitProps.resetForm();
        }}
      >
        {({ values, isSubmitting, errors }) => (
          <Form className="login-form">
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
