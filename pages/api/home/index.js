import dbConnection from '../../../config/dbConnection';
import {
  readItems,
} from '../../../controllers/ItemController';

export default async function handler(req, res) {
  dbConnection().catch(() =>
    res.status(405).send({ error: 'Error in the Connections' })
  );

  const { method } = req;

  switch (method) {
    case 'GET':
      readItems(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}
