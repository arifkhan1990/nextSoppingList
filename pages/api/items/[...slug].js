import dbConnection from '../../../config/dbConnection';
import {
  likeDislikeItem,
} from '../../../controllers/ItemController';

import jwtNextTokenVerify from '../../../lib/jwtNextTokenVerify';
const handler = async (req, res) => {

  const { method } = req;

  switch (method) {
    case 'PUT':
      likeDislikeItem(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}

export default handler;