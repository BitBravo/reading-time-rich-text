import React, { useEffect, useState } from "react";
import { List, ListItem, Note } from "@contentful/forma-36-react-components";
import { SidebarExtensionSDK } from "@contentful/app-sdk";
import readingTime from "reading-time";
import { CONTENT_FIELD_ID } from '../config';

interface SidebarProps {
  sdk: SidebarExtensionSDK;
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

const Sidebar = (props: SidebarProps) => {
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
    if(!contentField) return;
    const detach = contentField.onValueChanged((value) => {
      const totalStringList = findAllByKey(value, 'value').filter((e: string) => e).join(' ');
      const newReadingTime = readingTime(totalStringList);

      if (newReadingTime !== readTime) {
        contentField.setValue(newReadingTime);
        setReadTime(newReadingTime);
      }
    });
    return () => detach();
  }, []); // eslint-disable-line 

  return (
    <>
      <Note style={{ marginBottom: "12px" }}>
        Blog Reading Time (Body):
        <List style={{ marginTop: "12px" }}>
          <ListItem>Word count: {readTime.words}</ListItem>
          <ListItem>Reading time: {readTime.text}</ListItem>
        </List>
      </Note>
    </>
  );
};
export default Sidebar;
