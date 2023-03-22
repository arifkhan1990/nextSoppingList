import React, { Fragment } from "react";
import { NavLink } from "reactstrap";
import { signOut, useSession } from "next-auth/react";
import LogoutText from "../../constaint/enum/logout";
export const Logout = () => {
  const { data: session } = useSession();
  return (
    <Fragment>
      <NavLink href="/" onClick={() => signOut()}>
        {LogoutText.Logout}
      </NavLink>
    </Fragment>
  );
};

export default Logout;
