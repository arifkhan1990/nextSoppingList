import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;


const authenticationVerify = async(req, res) => {

    try {
      const token = await getToken({req, secret});

      if(Object.is(token, null)) {
        throw new Error("Sorry! You are not authenticated! Login first please.")
      }
    } catch (error) {
        throw new Error(error.message)
    }
};

export default authenticationVerify