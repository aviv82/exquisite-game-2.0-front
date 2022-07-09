import "./SignUp.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { ref, object, string, boolean } from "yup";
import { useState, useEffect } from "react";

import { Button } from "../../component/button/Button";

import { authenticate } from "../../api/authenticate";
import { getAuth } from "../../api/getAuth";

export const SignUp = () => {
  const [users, setUsers] = useState([]);

  const initUsers = async () => {
    const authPromise = await authenticate("tester");
    const jwt = authPromise.jwt;
    const usersPromise = await getAuth(jwt);
    setUsers(usersPromise);
  };

  useEffect(() => {
    initUsers();
  }, []);

  users[0] ? console.log("test test", users[0].id) : console.log("bing");

  return (
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
          .min(4, "Password must be longer than four digits")
          .max(20, "Password must be shorter than twenty digits"),
        passwordConfirmation: string()
          .oneOf([ref("password"), null], "Passwords must match")
          .required("Required Field"),
        isWorking: boolean().oneOf([false, true]),
      })}
      onSubmit={(values, onSubmitProps) => {
        console.log("values", values);
        onSubmitProps.resetForm();
      }}
    >
      {({ values, isSubmitting, errors }) => (
        <Form className="sign-up-form">
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
  );
};
