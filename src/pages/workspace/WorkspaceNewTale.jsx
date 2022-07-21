import "./WorkspaceNewTale.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import { Button } from "../../component/button/Button";

export const WorkspaceNewTale = () => {
  return (
    <div className="new-tale-wrap">
      <h3 className="test">why?!</h3>
      <Formik
        initialValues={{ title: "", first: "" }}
        validationSchema={object({
          title: string().required("Required Field"),
          first: string().required("Required Field"),
        })}
        onSubmit={(values) => {
          console.log("values", values);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form className="new-tale-form">
            <span className="new-tale-warning">warning</span>
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
                name="first"
                type="text"
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
