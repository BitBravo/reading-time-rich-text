import React, { useEffect, useState } from 'react';
import readingTime from "reading-time"; // eslint-disable-this-line
import { Paragraph, Subheading } from '@contentful/forma-36-react-components';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { CONTENT_FIELD_ID } from '../config';

interface FieldProps {
  sdk: FieldExtensionSDK;
}

const findAllByKey = (obj: object, keyToFind: string): any => {
  return Object.entries(obj)
    .reduce((acc, [key, value]) => (key === keyToFind)
      ? acc.concat(value)
      : (typeof value === 'object')
        ? acc.concat(findAllByKey(value, keyToFind))
        : acc
      , [])
}

const Field = (props: FieldProps) => {
  const { sdk } = props;
  const contentField = sdk.entry.fields[CONTENT_FIELD_ID];
  const [readTime, setReadTime] = useState(contentField?.getValue());

  useEffect(() => {
    sdk.window.startAutoResizer();
    return () => {
      sdk.window.stopAutoResizer();
    };
  }, [sdk.window]);

  useEffect(() => {
    const detach = contentField.onValueChanged((value) => {
      const totalStringList = findAllByKey(value, 'value').filter((e: string) => e).join(' ');
      const newReadingTime = readingTime(totalStringList);
      console.log(findAllByKey(value, 'value').filter((e: string) => e))
      if (newReadingTime !== readTime) {
        setReadTime(newReadingTime);
      }
    });
    return () => detach();
  }, [contentField]); // eslint-disable-line 


  return (
    <div>
      <Paragraph>Reading time for Body Field</Paragraph>
      <Subheading>Total Words: {readTime.words}</Subheading>
      <Subheading>Reading time: {readTime.text}</Subheading>
    </div>
  )
};

export default Field;
