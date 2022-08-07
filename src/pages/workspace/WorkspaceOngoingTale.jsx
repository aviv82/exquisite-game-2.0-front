import "./WorkspaceOngoingTale.css";

import Cookies from "js-cookie";
import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";

import { Button } from "../../component/button/Button";

import { getAuth } from "../../api/getAuth";
import { putAuth } from "../../api/putAuth";
import { pageReload } from "../../handlers/pageReload";
import { handleFinishTale } from "../../handlers/handleFinishTale";

export const WorkspaceOngoingTale = ({ num }) => {
  const [tales, setTales] = useState([]);
  // const [warning, setWarning] = useState("");

  const title = useRef("");
  const body = useRef("");
  const writer = useRef(0);

  const initTales = async (name, pass) => {
    const usersPromise = await getAuth(
      "tales?populate[0]=contributor&populate[1]=creators&populate[2]=segment.writer",
      Cookies.get("token")
    );
    setTales(usersPromise.data);
  };

  useEffect(() => {
    initTales("ghost", "jocKor-qufva5-vinqax");
    Cookies.get("id");
  }, []);

  const taleSegments = [];
  let taleAuthor = "";
  const taleContributorIds = [];

  if (tales.length !== 0) {
    tales.map((tale) =>
      tale.id === Number(num)
        ? tale.attributes.segment.map((seg) =>
            taleSegments.push({ id: seg.id })
          )
        : null
    );

    tales.map((tale) =>
      tale.id === Number(num)
        ? (taleAuthor = tale.attributes.creators.data[0].id)
        : null
    );

    const taleContributors = [];
    tales.map((tale) =>
      tale.id === Number(num)
        ? taleContributors.push(tale.attributes.contributor.data)
        : null
    );
    // console.log("contributors", taleContributors[0][0].id);

    taleContributors[0].map((contributor) =>
      taleContributorIds.push({ id: contributor.id })
    );
  }

  /*
  console.log("ongoing", tales);
  console.log("tale segments", taleSegments);
  console.log("tale author", taleAuthor);
  console.log("contributor ids", taleContributorIds);
  */

  const taleToShow = [];
  if (tales.length !== 0) {
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
    // console.log("writer:", writer.current);
  }

  return tales.length === 0 ? (
    <h2 className="ongoing-head">Loading...</h2>
  ) : writer.current === Number(Cookies.get("id")) ? (
    <div className="ongoing-tale">
      <h2 className="ongoing-head">Ongoing tale - {title.current}</h2>{" "}
      <h3 className="ongoing-subhead">
        The last segment added to this tale was written by you
      </h3>
      {taleAuthor === Number(Cookies.get("id")) ? (
        <Button
          title="finish tale"
          kind="submit"
          face="green"
          action={() => handleFinishTale(num, Cookies.get("token"))}
        />
      ) : (
        <React.Fragment></React.Fragment>
      )}
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
            segment: string()
              .required("Required Field")
              .min(80, "tale segment must be at least 80 characters long")
              .max(300, "tale segment must be shorter than 300 characters"),
          })}
          onSubmit={(values, onSubmitProps) => {
            onSubmitProps.resetForm();
            /*
            if (values.segment.length < 100) {
              setWarning(
                "New segment must be at least one hundred characters long"
              );
            }
            */
            const authorId = Number(Cookies.get("id"));

            if (
              !taleContributorIds.includes(authorId) &&
              authorId !== taleAuthor
            ) {
              taleContributorIds.push({ id: authorId });
            }
            // console.log("tale contributors", taleContributorIds);

            const talePath = `tales/${Number(num)}`;
            const newSeg = {
              body: values.segment,
              writer: { id: authorId },
            };
            taleSegments.push(newSeg);
            console.log("newSeg", taleSegments);
            const toPost = {
              data: {
                contributor: taleContributorIds,
                segment: taleSegments,
              },
            };
            putAuth(talePath, toPost, Cookies.get("token"));
            console.log("new segment;", values);
            setTimeout(pageReload, 800);
          }}
        >
          {({ values, errors, isSubmitting }) => (
            <Form className="new-segment-form">
              {/* <span className="new-segment-warning">{warning}</span> */}
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
      {taleAuthor === Number(Cookies.get("id")) ? (
        <Button
          title="finish tale"
          kind="submit"
          face="green"
          action={() => handleFinishTale(num, Cookies.get("token"))}
        />
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </div>
  );
};
