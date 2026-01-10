import { MessageBox } from "./components/message-box/message-box";

type Props = {
  result: {
    data?: { message?: string };
    serverError?: string;
    validationErrors?: Record<string, string[] | undefined>;
  };
};

export function DisplayServerActionResponse(props: Props) {
  if (props.result.data) {
    return (
      <MessageBox
        type="success"
        content={`Success: ${props.result.data.message}`}
      />
    );
  }

  if (props.result.serverError) {
    return <MessageBox type="error" content={props.result.serverError} />;
  }

  if (props.result.validationErrors) {
    return (
      <MessageBox
        type="error"
        content={Object.keys(props.result.validationErrors).map((key) => {
          return (
            <p key={key}>
              ${key}:{" "}
              {
                props.result?.validationErrors![
                  key as keyof typeof props.result.validationErrors
                ]
              }
            </p>
          );
        })}
      />
    );
  }
}
