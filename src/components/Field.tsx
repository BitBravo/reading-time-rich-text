import React, { useEffect, useState } from 'react';
import readingTime from "reading-time"; // eslint-disable-this-line
import { Typography, Subheading } from '@contentful/forma-36-react-components';
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
  
  console.log("old read time", contentField?.getValue())
  useEffect(() => {
    sdk.window.startAutoResizer();
    return () => {
      sdk.window.stopAutoResizer();
    };
  }, [sdk.window]);

  useEffect(() => {
    if(!contentField) return;

    const detach = contentField.onValueChanged((value) => {
      const totalStringList = findAllByKey(value, 'value').filter((e: string) => e).join(' ');
      const newReadingTime = readingTime(totalStringList);

      if (newReadingTime !== readTime) {
        console.log("new reading time", newReadingTime)
        contentField.setValue(newReadingTime);
        setReadTime(newReadingTime);
      }
    });
    return () => detach();
  }, []); // eslint-disable-line 


  return (
    <div>
      <Typography>For body field</Typography>
      <Subheading>Total Words: {readTime.words}</Subheading>
      <Subheading>Reading time: {readTime.text}</Subheading>
    </div>
  )
};

export default Field;
