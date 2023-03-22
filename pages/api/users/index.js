import dbConnection from '../../../config/dbConnection';
import {
  registerUser,
  readUsersInfo,
  updateUserInfo,
  deleteUserInfo,
} from '../../../controllers/UserController';

export default async function handler(req, res) {

  // type of request
  const { method } = req;

  switch (method) {
    case 'GET':
        readUsersInfo(req, res);
      break;
    case 'POST':
        registerUser(req, res);
      break;
    case 'PUT':
        updateUserInfo(req, res);
      break;
    case 'DELETE':
        deleteUserInfo(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}
