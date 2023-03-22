import React, { Fragment } from "react";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
} from "reactstrap";

import LoginText from "../../constaint/enum/login";
import { signIn } from "next-auth/react";
import Image from "next/image";
import useAuthHook from "../../BusinessLogic/useAuthHook";

const Login = () => {
  const {handleLoginOnSubmit: handleOnSubmit,handleChangeEmail,handleChangePassword } = useAuthHook();
  return (
    <>
    <div className="offset-col-3 col-6 ">
      <div className="mt-5 mb-5 items-center">
        <h2 className="">{LoginText.Login}</h2>
      </div>
            <Form>
              <FormGroup>
                <Label for="email">{LoginText.Email}</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="mb-3"
                  onChange={handleChangeEmail}
                />

                <Label for="password">{LoginText.Password}</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={handleChangePassword}
                />
                <Button
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block
                  onClick={handleOnSubmit}
                >
                  {LoginText.Login}
                </Button>
              </FormGroup>
            </Form>

          <div>
            <hr />
            <h2 className="text-center">OR</h2>
            <div className="text-center align-center justify-center m-5">
              <Fragment>
                <div className="border rounded p-2 mb-3">
                  <NavLink
                    href={`/api/auth/signin`}
                    onClick={(e) => {
                      e.preventDefault();
                      signIn("google", {
                        callbackUrl: "/",
                      });
                    }}
                  >
                    <Image
                      src={"/google.svg"}
                      width={25}
                      height={25}
                      alt="github"
                    />{" "}
                    {LoginText.Login_with_Google}
                  </NavLink>
                </div>
                <div className="border rounded p-2 mb-3">
                  <NavLink
                    href={`/api/auth/signin`}
                    onClick={(e) => {
                      e.preventDefault();
                      signIn("github", {
                        callbackUrl: "/",
                      });
                    }}
                  >
                    <Image
                      src={"/github.svg"}
                      width={25}
                      height={25}
                      alt="github"
                    />{" "}
                    {LoginText.Login_with_Github}
                  </NavLink>
                </div>
              </Fragment>
            </div>
          </div>
      </div>
    </>
  );
};

export default Login;
