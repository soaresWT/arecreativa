import { Activity } from "./Activity";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  activities?: Activity[];
}
