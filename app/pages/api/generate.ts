import { NextApiRequest, NextApiResponse } from 'next';
import generate from '../../utils/generate';

type Data = {
  name: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Data>): void => {
  const { text } = req.query;
  const result = generate({ text });
  res.status(200).json({ result });
};
