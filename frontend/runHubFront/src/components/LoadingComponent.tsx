import { Dimmer, Loader } from "semantic-ui-react";
import "semantic-ui-css/components/dimmer.min.css";
import "semantic-ui-css/components/loader.min.css";

interface Props {
  inverted?: boolean;
  content?: string;
}

export default function LoadingComponent({
  inverted = true,
  content = "Ładowanie...",
}: Props) {
  return (
    <Dimmer active={true} inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
}
