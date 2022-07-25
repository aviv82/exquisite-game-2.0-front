import "./WorkspaceOngoingTale.css";

import Cookies from "js-cookie";
import { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";

import { getAuth } from "../../api/getAuth";
import { Button } from "../../component/button/Button";

export const WorkspaceOngoingTale = ({ num }) => {
  const [tales, setTales] = useState([]);
  const [warning, setWarning] = useState("");

  const title = useRef("");
  const body = useRef("");
  const writer = useRef(0);

  const initTales = async (name, pass) => {
    const usersPromise = await getAuth(
      "tales?populate[segment][populate]=writer",
      Cookies.get("token")
    );
    setTales(usersPromise.data);
  };

  useEffect(() => {
    initTales("ghost", "jocKor-qufva5-vinqax");
    Cookies.get("id");
  }, []);

  /*
  if (tales) {
    console.log("ongoing", tales);
  }
*/

  const taleToShow = [];
  if (tales) {
    tales.map((tale) =>
      tale.id === Number(num) ? taleToShow.push(tale) : null
    );
  }
  // console.log("tale to show:", taleToShow[0]);

  if (tales.length !== 0) {
    title.current = taleToShow[0].attributes.title;
    body.current =
      taleToShow[0].attributes.segment[
        taleToShow[0].attributes.segment.length - 1
      ].body;
    writer.current =
      taleToShow[0].attributes.segment[
        taleToShow[0].attributes.segment.length - 1
      ].writer.data.id;
    console.log("writer:", writer.current);
  }

  return tales.length === 0 ? (
    <h2 className="ongoing-head">Loading...</h2>
  ) : writer.current === Number(Cookies.get("id")) ? (
    <div className="ongoing-tale">
      <h2 className="ongoing-head">Ongoing tale - {title.current}</h2>{" "}
      <h3 className="ongoing-subhead">
        The last segment added to this tale was written by you
      </h3>
    </div>
  ) : (
    <div className="ongoing-tale">
      <h2 className="ongoing-head">Ongoing tale - {title.current}</h2>
      <h3 className="ongoing-subhead">Previous segment:</h3>
      <p className="ongoing-p">
        {body.current.slice(body.current.length * (2 / 3))}
      </p>
      <div className="segment-form">
        <Formik
          initialValues={{ segment: "" }}
          validationSchema={object({
            segment: string().required("Required Field"),
          })}
          onSubmit={(values, onSubmitProps) => {
            onSubmitProps.resetForm();
            if (values.segment.length < 100) {
              setWarning(
                "New segment must be at least one hundred characters long"
              );
            }
            console.log("new segment;", values);
          }}
        >
          {({ values, errors, isSubmitting }) => (
            <Form className="new-segment-form">
              <span className="new-segment-warning">{warning}</span>
              <div className="new-segment">
                <label htmlFor="segment">Add New Segment:</label>
                <Field
                  component="textarea"
                  name="segment"
                  type="text"
                  placeholder="Add New Segment"
                ></Field>
                <ErrorMessage
                  component="div"
                  className="new-segment-error"
                  name="segment"
                ></ErrorMessage>
              </div>
              <Button
                kind="submit"
                title="Submit New Segment"
                face="blue"
                disabled={isSubmitting}
              />
              <pre>{JSON.stringify(values, null, 4)}</pre>
              <pre>{JSON.stringify(errors, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
