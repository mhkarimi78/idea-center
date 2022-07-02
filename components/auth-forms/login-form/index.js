import React, { useState, useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import { publicFetch } from "../../../util/fetcher";
import { AuthContext } from "../../../store/auth";
import ModalContext from "../../../store/modal";

import FormInput from "../../form-input";
import Button from "../../button";

import styles from "./login-form.module.css";

const LoginForm = () => {
  const { setAuthState } = useContext(AuthContext);
  const { setIsComponentVisible } = useContext(ModalContext);

  const [loading, setLoading] = useState(false);

  return (
    <Formik
      initialValues={{ email: "", password: "", username: "" }}
      onSubmit={async (values, { setStatus, resetForm }) => {
        setLoading(true);
        publicFetch
          .post("token/login/", values)
          .then((res) => {
            console.log("jiz", res?.data?.auth_token);
            const token = res?.data?.auth_token;
            const userInfo = {
              email: values.email,
              username: values.username,
              password: values.password,
            };
            setAuthState({ token, userInfo });
            resetForm({});
            setIsComponentVisible(false);
          })
          .catch((error) => {
            setStatus(error?.response?.data?.non_field_errors);
          });
        setLoading(false);
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required("Required")
          .max(16, "Must be at most 16 characters long")
          .matches(/^[a-zA-Z0-9_-]+$/, "Contains invalid characters"),
        email: Yup.string()
          .required("Required")
          .min(8, "Must be at least 8 characters long")
          .max(50, "Must be at most 50 characters long"),
        password: Yup.string()
          .required("Required")
          .min(6, "Must be at least 6 characters long")
          .max(50, "Must be at most 50 characters long"),
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
        <form onSubmit={handleSubmit} className={styles.form}>
          <FormInput
            label="Username"
            type="text"
            name="username"
            autoComplete="off"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={touched.username && errors.username}
            errorMessage={errors.username && errors.username}
          />
          <FormInput
            label="Email"
            type="text"
            name="email"
            autoComplete="off"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={touched.email && errors.email}
            errorMessage={errors.email && errors.email}
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            autoComplete="off"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={touched.password && errors.password}
            errorMessage={errors.password && errors.password}
          />
          <p className={styles.status}>{status}</p>
          <Button
            primary
            full
            className={styles.submitButton}
            type="submit"
            isLoading={loading}
            disabled={isSubmitting}
          >
            Log in
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
