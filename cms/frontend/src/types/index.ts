export interface User {
  id: number;
  github_id: number;
  username: string;
  avatar_url: string | null;
  created_at: string;
}

export interface Site {
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
  frontmatter_schema: FrontmatterField[];
  locale: string;
  created_at: string;
  updated_at: string;
}

export interface FrontmatterField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'boolean' | 'date' | 'select' | 'tags' | 'array';
  required: boolean;
  default?: string | number | boolean | string[];
  options?: string[];
}

export interface Post {
  name: string;
  path: string;
  sha: string;
  size: number;
  frontmatter: Record<string, unknown>;
  content: string;
}

export interface MediaFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  download_url: string;
  type: 'file' | 'dir';
}

export interface Build {
  id: number;
  run_id: number;
  name: string;
  branch: string;
  status: 'pending' | 'in_progress' | 'success' | 'failure' | 'cancelled' | 'unknown';
  triggered_at: string;
  completed_at: string | null;
  html_url: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
