import React, { useEffect, useState, useRef } from "react";
import { Comment } from "semantic-ui-react";
import { formatDateFunc } from "../helper/FormatDate";

export default function Comments({ myUser, myDate, myContent }) {
  return (
    <Comment>
      <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />

      <Comment.Content>
        <Comment.Author as="a">{myUser}</Comment.Author>
        <Comment.Metadata>
          <div>{formatDateFunc(myDate)}</div>
        </Comment.Metadata>
        <Comment.Text>{myContent}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
}
