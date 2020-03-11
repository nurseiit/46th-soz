import React, { useState } from 'react';
import { NextPage } from 'next';
import { Button, Divider, Text, Textarea } from '@chakra-ui/core';

type Props = {
  text: string;
};

const Result = ({ text }: Props): JSX.Element => (
  <>
    <Text fontSize="lg">Result</Text>
    <Text color="gray.500">{text}</Text>
  </>
);

const Index: NextPage = () => {
  const [value, setValue] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textGenerated, setTextGenerated] = useState('');

  const onGenerate = async (): Promise<void> => {
    setIsLoading(true);
    await new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
    setTextGenerated('Hello');
    setIsLoading(false);
  };

  const handleInputChange = e => {
    const re = new RegExp(/^[ЁёӘәІіҢңҒғҮүҰұҚқҺһА-я ]*$/);
    const inputValue = e.target.value;
    setIsInvalid(inputValue === '' ? false : !re.test(inputValue));
    setValue(inputValue);
  };
  return (
    <>
      <Textarea
        isInvalid={isInvalid}
        value={value}
        onChange={handleInputChange}
        placeholder="Write something"
        size="sm"
      />
      <Divider />
      <Button
        variantColor="teal"
        variant="outline"
        isLoading={isLoading}
        loadingText="Generating"
        onClick={onGenerate}
      >
        Generate
      </Button>
      <Divider />
      {textGenerated !== '' && <Result text={textGenerated} />}
    </>
  );
};

export default Index;
