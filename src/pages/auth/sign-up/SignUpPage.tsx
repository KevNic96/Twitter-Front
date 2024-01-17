import type { ChangeEvent } from "react";
import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthWrapper from "../../../pages/auth/AuthWrapper";
import { useHttpRequestService } from "../../../service/HttpRequestService";
import LabeledInput from "../../../components/labeled-input/LabeledInput";
import Button from "../../../components/button/Button";
import { ButtonType } from "../../../components/button/StyledButton";
import { StyledH3 } from "../../../components/common/text";
import { validationSchema } from "./validationSchema";
import { useFormik } from "formik";

interface SignUpData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
/*
const SignUpPage = () => {
  const [data, setData] = useState<Partial<SignUpData>>({});
  const [error, setError] = useState(false);

  const httpRequestService = useHttpRequestService();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange =
    (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [prop]: event.target.value });
    };
  const handleSubmit = async () => {
    const { confirmPassword, ...requestData } = data;
    httpRequestService
      .signUp(requestData)
      .then(() => navigate("/"))
      .catch(() => setError(false));
  };
*/

const SignUpPage = () =>{
  const service = useHttpRequestService();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const formik = useFormik<SignUpData>({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: SignUpData) =>{
      const {confirmPassword, ...requestData} = values;
      service
      .signUp(requestData)
      .then(()=> navigate("/"))
      .catch((e)=>{
        setError(e.response.data.errors[0].message);
      })
    },
  });

  return (
    <AuthWrapper>
      <div className={"border"}>
        <div className={"container"}>
          <div className={"header"}>
            <img src={logo} alt="Twitter Logo" />
            <StyledH3>{t("title.register")}</StyledH3>
          </div>
          <div className={"input-container"}>
            <LabeledInput
              required
              placeholder={"Enter name..."}
              title={t("input-params.name")}
              onChange={formik.handleChange("name")}
              value={formik.values.name}
              error={formik.touched.name && !!formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
            />
            <LabeledInput
              required
              placeholder={"Enter username..."}
              title={t("input-params.username")}
              onChange={formik.handleChange("username")}
              value={formik.values.username}
              error={formik.touched.username && !!formik.errors.username}
              helperText={formik.touched.username && formik.errors.username}
            />
            <LabeledInput
              required
              placeholder={"Enter email..."}
              title={t("input-params.email")}
              onChange={formik.handleChange("email")}
              value={formik.values.email}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            <LabeledInput
              type="password"
              required
              placeholder={"Enter password..."}
              title={t("input-params.password")}
              onChange={formik.handleChange("password")}
              value={formik.values.password}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <LabeledInput
              type="password"
              required
              placeholder={"Confirm password..."}
              title={t("input-params.confirm-password")}
              onChange={formik.handleChange("confirmPassword")}
              error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              text={t("buttons.register")}
              buttonType={ButtonType.FOLLOW}
              size={"MEDIUM"}
              // onClick={handleSubmit}
              onClick={(e)=>{
                e.preventDefault();
                formik.handleSubmit
              }}
            />
            <Button
              text={t("buttons.login")}
              buttonType={ButtonType.OUTLINED}
              size={"MEDIUM"}
              onClick={() => navigate("/sign-in")}
            />
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignUpPage;
