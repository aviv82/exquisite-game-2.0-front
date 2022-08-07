import "./WorkspaceNewTale.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import Cookies from "js-cookie";
import { useState } from "react";

import { Button } from "../../component/button/Button";

// import { getAuth } from "../../api/getAuth";
import { postAuth } from "../../api/postAuth";
import { pageReload } from "../../handlers/pageReload";

export const WorkspaceNewTale = ({ tales }) => {
  const [warning, setWarning] = useState("");

  return (
    <div className="new-tale-wrap">
      <h3 className="test">create new tale</h3>
      <Formik
        initialValues={{ title: "", first: "" }}
        validationSchema={object({
          title: string()
            .required("Required Field")
            .min(2, "tale title must be at least 2 characters long")
            .max(40, "tale title cannot be longer than 40 characters"),
          first: string()
            .required("Required Field")
            .min(80, "tale segment must be at least 80 characters long")
            .max(300, "tale segment must be shorter than 300 characters"),
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
            setTimeout(pageReload, 800);
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
