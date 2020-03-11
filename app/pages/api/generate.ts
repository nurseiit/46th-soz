import { NextApiRequest, NextApiResponse } from 'next';
import generate from '../../utils/generate';

type Data = {
  result: string;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> => {
  const { text } = req.query;
  const result = await generate({ text });
  res.status(200).json({ result });
};
