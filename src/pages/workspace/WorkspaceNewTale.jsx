import "./WorkspaceNewTale.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import { Button } from "../../component/button/Button";

import { getAuth } from "../../api/getAuth";
import { postAuth } from "../../api/postAuth";

export const WorkspaceNewTale = ({ tales }) => {
  const [warning, setWarning] = useState("");

  return (
    <div className="new-tale-wrap">
      <h3 className="test">create new tale</h3>
      <Formik
        initialValues={{ title: "", first: "" }}
        validationSchema={object({
          title: string().required("Required Field"),
          first: string().required("Required Field"),
        })}
        onSubmit={(values, onSubmitProps) => {
          onSubmitProps.resetForm();
          const titles = [];
          tales.data.map((tale) =>
            titles.push(tale.attributes.title.toLowerCase())
          );
          const verifier = titles.filter(
            (title) => title === values.title.toLowerCase()
          );

          if (verifier.length !== 0) {
            console.log("already exists", values.title);
            setWarning("A tale with the same title already exists");
          } else {
            const postId = Number(Cookies.get("id"));
            const toPost = {
              data: {
                title: values.title,
                creators: { id: postId },
                segment: [
                  {
                    body: values.first,
                    writer: { id: postId },
                  },
                ],
              },
            };
            postAuth("tales", toPost, Cookies.get("token"));
            Cookies.set("mode", "blank");
            console.log("new title", values.title);
            window.location.reload(false);
          }
          console.log("values", values, titles, verifier);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form className="new-tale-form">
            <span className="new-tale-warning">{warning}</span>
            <div className="new-tale-title">
              <label htmlFor="title">Tale Title:</label>
              <Field name="title" type="text" placeholder="Tale Title"></Field>
              <ErrorMessage
                component="div"
                className="new-tale-error"
                name="title"
              ></ErrorMessage>
            </div>
            <div className="new-tale-body">
              <label htmlFor="title">First Installment:</label>
              <Field
                component="textarea"
                name="first"
                type="textarea"
                placeholder="First Tale Installment"
              ></Field>
              <ErrorMessage
                component="div"
                className="new-tale-error"
                name="first"
              ></ErrorMessage>
            </div>
            <Button
              kind="submit"
              title="Submit Tale"
              face="blue"
              disabled={isSubmitting}
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
            <pre>{JSON.stringify(errors, null, 4)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};
