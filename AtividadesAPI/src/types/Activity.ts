import { PDF } from "./PDF";
import { User } from "./User";

export interface Activity {
  id: string;
  title: string;
  summary: string | null;
  objectives: string;
  bncc_skills: string[];
  total_time: string;
  required_resources: string;
  step_by_step_guide: string;
  user_id?: string | null;
  status: Boolean;
  createdAt: Date;
  user?: User | null;
  pdfs?: PDF[] | null;
}
