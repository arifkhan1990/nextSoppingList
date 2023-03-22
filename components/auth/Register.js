import { Button, Form, FormGroup, Label, Input, Select } from "reactstrap";
import useAuthHook from "../../BusinessLogic/useAuthHook";
import RegisterText from "../../constaint/enum/register";
const Register = () => {
  const {
    handleRegisterOnSubmit: handleOnSubmit,
    handleChangeName,
    handleChangeEmail,
    handleChangePassword,
    handleChangeRoll,
  } = useAuthHook();
  return (
    <div className="offset-col-3 col-6 ">
      <div className="mt-5 mb-5 items-center">
        <h2 className="">{RegisterText.Registation}</h2>
      </div>
      <Form onSubmit={handleOnSubmit}>
        <FormGroup>
          <Label for="name">{RegisterText.Name}</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className="mb-3"
            required
            onChange={handleChangeName}
          />

          <Label for="email">{RegisterText.Email}</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="mb-3"
            required
            onChange={handleChangeEmail}
          />

          <Label for="password">{RegisterText.Password}</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="mb-3"
            required
            onChange={handleChangePassword}
          />

          <Label for="roll">{RegisterText.Roll}</Label>
          <Input id="exampleSelect" name="select" type="select" onChange={handleChangeRoll}>
            <option value="">{RegisterText.Select_Roll}</option>
            <option value="admin">{RegisterText.Admin}</option>
            <option value="user">{RegisterText.User}</option>
          </Input>
          <Button color="dark" style={{ marginTop: "2rem" }} block>
            {RegisterText.Register}
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default Register;
