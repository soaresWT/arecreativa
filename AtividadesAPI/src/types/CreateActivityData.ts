export interface ICreateActivityData {
  title: string;
  summary?: string;
  objectives: string;
  bncc_skills: string;
  total_time: string;
  required_resources: string;
  step_by_step_guide: string;
  status: Boolean;
  user_id?: string | null;
}
