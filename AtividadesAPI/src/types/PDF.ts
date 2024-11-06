import { Activity } from "./Activity";

export interface PDF {
  id: string;
  file_path: string;
  generatedAt: Date;
  activity_id?: string;
  activity?: Activity;
}
