import { NextApiRequest, NextApiResponse } from 'next';
import generate from '../../utils/generate';

type Data = {
  name: string;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> => {
  const { text } = req.query;
  const stringText = text as string;
  const result = await generate({ text: stringText });
  res.status(200).json({ result });
};
