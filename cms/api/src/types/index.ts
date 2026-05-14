export interface Env {
  DB: D1Database;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  JWT_SECRET: string;
  FRONTEND_URL: string;
}

export type AppType = { Bindings: Env; Variables: { userId: number; user: { id: number; github_id: number; username: string; avatar_url: string | null } } };

export interface UserRow {
  id: number;
  github_id: number;
  username: string;
  avatar_url: string | null;
  access_token: string;
  created_at: string;
  updated_at: string;
}

export interface SiteRow {
  id: number;
  user_id: number;
  name: string;
  repo_full_name: string;
  branch: string;
  content_dir: string;
  media_dir: string;
  framework: string;
  build_command: string;
  output_dir: string;
  frontmatter_schema: string;
  locale: string;
  created_at: string;
  updated_at: string;
}

export interface BuildRow {
  id: number;
  site_id: number;
  run_id: number | null;
  status: string;
  triggered_at: string;
  completed_at: string | null;
}
