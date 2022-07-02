import React, { useState, useContext } from "react";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";

import { FetchContext } from "../../store/fetch";
import { AuthContext } from "../../store/auth";
import ModalContext from "../../store/modal";

import TextArea from "../textarea";
import Button from "../button";
import Tag from "../tag";

import styles from "./add-answer.module.css";

const AddAnswer = ({ id, tags, setQuestion }) => {
  const { authAxios } = useContext(FetchContext);
  const { isAuthenticated } = useContext(AuthContext);
  const { handleComponentVisible } = useContext(ModalContext);

  const [loading, setLoading] = useState(false);

  return (
    <Formik
      initialValues={{ text: "" }}
      onSubmit={async (values, { setStatus, resetForm }) => {
        setLoading(true);
        try {
          const { data } = await authAxios.post(`/answer/${id}`, values);
          setQuestion(data);
          resetForm({});
        } catch (error) {
          setStatus(error.response.data.message);
        }
        setLoading(false);
      }}
      validationSchema={Yup.object({
        text: Yup.string()
          .required("Body is missing.")
          .min(30, "Body must be at least 30 characters.")
          .max(30000, "Body cannot be longer than 30000 characters."),
      })}
    >
      {({
        values,
        errors,
        touched,
        status,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form className={styles.container} onSubmit={handleSubmit}>
          <h2>Your Opinion</h2>
          <TextArea
            name="text"
            autoComplete="off"
            value={values.text}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={touched.text && errors.text}
            errorMessage={errors.text && errors.text}
            className={styles.textarea}
          />
          <p className={styles.status}>{status}</p>
          <div className={styles.button}>
            <Button
              type="submit"
              primary
              isLoading={loading}
              disabled={isSubmitting}
              onClick={() =>
                !isAuthenticated() && handleComponentVisible(true, "signup")
              }
            >
              Post Your Opinion
            </Button>
          </div>
          <h3>
            Browse other ideas tagged &nbsp;
            {tags?.map(({ id, title }) => (
              <Tag key={id}>{title}</Tag>
            ))}
            or &nbsp;
            <Link href="/ideas/share" as="/ideas/share">
              <a>share your own idea.</a>
            </Link>
          </h3>
        </form>
      )}
    </Formik>
  );
};

export default AddAnswer;
