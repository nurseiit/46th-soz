const loadModel = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
};

type Props = {
  text: string;
};

const generate = async ({ text }: Props): Promise<string> => {
  await loadModel();
  return `lolkekchek ${text}`;
};

export default generate;
