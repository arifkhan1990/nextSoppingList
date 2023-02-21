import dbConnection from "../../config/dbConnection"

export default function handler(req, res) {
    dbConnection()
  res.status(200).json({ name: 'John Doe' })
}