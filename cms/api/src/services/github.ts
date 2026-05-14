export async function listFiles(token: string, repo: string, path: string, branch: string): Promise<Array<{ name: string; path: string; sha: string; size: number; download_url: string | null }>> {
  const res = await fetch(
    `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}?ref=${branch}`,
    { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' } }
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json() as Array<{ name: string; path: string; sha: string; size: number; download_url: string | null }>;
  return Array.isArray(data) ? data : [data];
}

export async function getFile(token: string, repo: string, path: string, branch: string): Promise<{ content: string; sha: string }> {
  const res = await fetch(
    `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}?ref=${branch}`,
    { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' } }
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json<{ content: string; sha: string; encoding: string }>();
  return {
    content: data.encoding === 'base64' ? atob(data.content.replace(/\n/g, '')) : data.content,
    sha: data.sha,
  };
}

export async function putFile(token: string, repo: string, path: string, content: string, branch: string, sha?: string): Promise<{ content: { sha: string } }> {
  const body: Record<string, unknown> = {
    message: `CMS: update ${path}`,
    content: btoa(unescape(encodeURIComponent(content))),
    branch,
  };
  if (sha) body.sha = sha;

  const res = await fetch(
    `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}`,
    {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) {
    const err = await res.json() as { message?: string };
    throw new Error(err.message || `GitHub API error: ${res.status}`);
  }
  return res.json();
}

export async function deleteFile(token: string, repo: string, path: string, branch: string, sha: string): Promise<void> {
  const res = await fetch(
    `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' },
      body: JSON.stringify({ message: `CMS: delete ${path}`, sha, branch }),
    }
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
}

export async function triggerDispatch(token: string, repo: string, eventType: string): Promise<void> {
  const res = await fetch(
    `https://api.github.com/repos/${repo}/dispatches`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' },
      body: JSON.stringify({ event_type: eventType }),
    }
  );
  if (!res.ok && res.status !== 204) throw new Error(`GitHub API error: ${res.status}`);
}

export async function listWorkflowRuns(token: string, repo: string): Promise<Array<{ id: number; status: string; conclusion: string | null; created_at: string; updated_at: string }>> {
  const res = await fetch(
    `https://api.github.com/repos/${repo}/actions/runs?per_page=10`,
    { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' } }
  );
  if (!res.ok) return [];
  const data = await res.json<{ workflow_runs: Array<{ id: number; status: string; conclusion: string | null; created_at: string; updated_at: string }> }>();
  return data.workflow_runs || [];
}

export async function uploadFile(token: string, repo: string, path: string, content: string, branch: string): Promise<{ content: { sha: string } }> {
  return putFile(token, repo, path, content, branch);
}
