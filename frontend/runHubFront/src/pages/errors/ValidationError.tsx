import { Message, MessageItem, MessageList } from "semantic-ui-react";

interface Props {
  errors: string[];
}

export default function ValidationErrors({ errors }: Props) {
  return (
    <Message negative>
      {errors && (
        <MessageList>
          {errors.map((err: string, i) => (
            <MessageItem key={i}>{err}</MessageItem>
          ))}
        </MessageList>
      )}
    </Message>
  );
}
