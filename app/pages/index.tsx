import React, { useState } from 'react';
import { NextPage } from 'next';
import {
  Button,
  Collapse,
  Divider,
  Text,
  Textarea,
  Heading
} from '@chakra-ui/core';

type Props = {
  text: string;
};

const Result = ({ text }: Props): JSX.Element => (
  <>
    <Heading
      style={{
        marginTop: '20px',
        marginBottom: '10px',
        fontWeight: 700,
        fontSize: '1.4em'
      }}
    >
      Result
    </Heading>
    <Text color="gray.400" style={{ textAlign: 'justify' }}>
      &nbsp;&nbsp;&nbsp;&nbsp;
      {text}
    </Text>
  </>
);

const HowItWorks = (): JSX.Element => {
  const [show, setShow] = useState(false);

  const handleToggle = (): void => setShow(!show);

  return (
    <>
      <Button
        variantColor="blue"
        variant="outline"
        style={{ marginTop: '20px', marginBottom: '20px' }}
        onClick={handleToggle}
      >
        How It Works?
      </Button>
      <Collapse mt={4} isOpen={show}>
        After collecting all Abai&apos;s words (from 1 to 45), we make a
        computer &quot;learn&quot; by randomly building a similarly structured
        text. Then we adjust the computer model&apos;s values by comparing it to
        the original words. [Needs more details.]
      </Collapse>
    </>
  );
};

const Index: NextPage = () => {
  const [value, setValue] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textGenerated, setTextGenerated] = useState('');

  const onGenerate = async (): Promise<void> => {
    setIsLoading(true);
    const params = new URLSearchParams();
    params.append('text', value);
    const resp = await fetch('/api/generate', {
      method: 'POST',
      body: params
    });
    const { result } = await resp.json();
    setTextGenerated(result);
    setIsLoading(false);
  };

  const handleInputChange = (e): void => {
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
        placeholder="Write something (only cyrillic Kazakh letters)"
        size="sm"
      />
      <Divider />
      <Button
        variantColor="teal"
        variant="outline"
        isLoading={isLoading}
        isDisabled={isInvalid || value === ''}
        loadingText="Generating"
        onClick={onGenerate}
      >
        Generate
      </Button>
      <Divider />
      {textGenerated !== '' && <Result text={textGenerated} />}
      {textGenerated !== '' && <HowItWorks />}
      <div
        style={{
          marginTop: '30px',
          fontSize: '0.8em',
          fontWeight: 400,
          textAlign: 'justify'
        }}
      >
        &gt; <b>Disclaimer!</b>
        <br />
        This project is for research and fun purposes only. Neither the creator
        nor the distributor is responsible for anything it may (randomly)
        produce.
      </div>
    </>
  );
};

export default Index;
