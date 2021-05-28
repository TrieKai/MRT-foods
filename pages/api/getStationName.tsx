import { NextApiRequest, NextApiResponse } from "next";
import { LINE_NAME } from 'utils/constants';

const GetStationName = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ data: LINE_NAME });
}

export default GetStationName;