export type ResponseFormat<T> = {
  data: T[];
  success: boolean;
  metadata: {
    messages: Message[];
  };
}

type Message = {
  errorCode: string;
  errorMessage: string;
  field: string | null;
}
