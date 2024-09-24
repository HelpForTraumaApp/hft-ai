import { CoreMessage } from 'ai'

export type Message = CoreMessage & {
  id: string
}

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
    error: string
  }
>

export interface Session {
  user: {
    id: string
    email: string
  }
}

export interface AuthResult {
  type: string
  message: string
}

export interface User extends Record<string, any> {
  id: string
  email: string
  password: string
  salt: string
}

export type TitleProps = {
  id: string;
  title: string;
  ghost: string;
}

export type MessageProps = {
  id: string;
  titleId: string;
  isSelf: boolean;
  msgData: string;
  timeStamp: Date;
}

export type MessageComponentProps = {
  msg: MessageProps;
  deleteMessage: (id: string) => void;
  updateMessage: (id: string, updatedMessage: string) => void;
}
