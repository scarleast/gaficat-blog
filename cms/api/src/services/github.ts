export async function listFiles(token: string, repo: string, path: string, branch: string): Promise<Array<{ name: string; path: string; sha: string; size: number; download_url: string | null }>> {
  // Use Git Trees API for recursive listing (Contents API is flat-only)
  const res = await fetch(
    `https://api.github.com/repos/${repo}/git/trees/${branch}:${encodeURIComponent(path)}?recursive=1`,
    { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json', 'User-Agent': 'gaficat-cms' } }
  );
  if (!res.ok) {
    // Fallback: try Contents API for flat directories
    const fb = await fetch(
      `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}?ref=${branch}`,
      { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json', 'User-Agent': 'gaficat-cms' } }
    );
    if (!fb.ok) throw new Error(`GitHub API error: ${fb.status}`);
    const data = await fb.json() as Array<{ name: string; path: string; sha: string; size: number; download_url: string | null }>;
    return Array.isArray(data) ? data : [data];
  }
  const data = await res.json<{ tree: Array<{ path: string; sha: string; size: number; type: string }> }>();
  return data.tree
    .filter((item) => item.type === 'blob')
    .map((item) => ({
      name: item.path.split('/').pop() || item.path,
      path: item.path,
      sha: item.sha,
      size: item.size,
      download_url: null,
    }));
}

export async function getBlob(token: string, repo: string, sha: string): Promise<string> {
  const res = await fetch(
    `https://api.github.com/repos/${repo}/git/blobs/${sha}`,
    { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json', 'User-Agent': 'gaficat-cms' } }
  );
  if (!res.ok) throw new Error(`GitHub Blob API error: ${res.status}`);
  const data = await res.json<{ content: string; encoding: string }>();
  if (data.encoding === 'base64') {
    return new TextDecoder().decode(Uint8Array.from(atob(data.content.replace(/\n/g, '')), (c) => c.charCodeAt(0)));
  }
  return data.content;
}

export async function getFile(token: string, repo: string, path: string, branch: string): Promise<{ content: string; sha: string }> {
  const res = await fetch(
    `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}?ref=${branch}`,
    { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json', 'User-Agent': 'gaficat-cms' } }
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json<{ content: string; sha: string; encoding: string }>();
  const raw = data.encoding === 'base64'
    ? new TextDecoder().decode(Uint8Array.from(atob(data.content.replace(/\n/g, '')), (c) => c.charCodeAt(0)))
    : data.content;
  return {
    content: raw,
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
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json', 'User-Agent': 'gaficat-cms' },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) {
    const errText = await res.text();
    console.log('[DEBUG] putFile GitHub error:', res.status, errText.slice(0, 300));
    let errMsg = `GitHub API error: ${res.status}`;
    try { errMsg = JSON.parse(errText).message || errMsg; } catch {}
    throw new Error(errMsg);
  }
  return res.json();
}

export async function deleteFile(token: string, repo: string, path: string, branch: string, sha: string): Promise<void> {
  const res = await fetch(
    `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json', 'User-Agent': 'gaficat-cms' },
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
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json', 'User-Agent': 'gaficat-cms' },
      body: JSON.stringify({ event_type: eventType }),
    }
  );
  if (!res.ok && res.status !== 204) throw new Error(`GitHub API error: ${res.status}`);
}

export interface WorkflowRun {
  id: number;
  name: string;
  head_branch: string;
  status: string;
  conclusion: string | null;
  created_at: string;
  updated_at: string;
  html_url: string;
}

export async function listWorkflowRuns(token: string, repo: string, perPage = 15): Promise<WorkflowRun[]> {
  const res = await fetch(
    `https://api.github.com/repos/${repo}/actions/runs?per_page=${perPage}`,
    { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json', 'User-Agent': 'gaficat-cms' } }
  );
  if (!res.ok) return [];
  const data = await res.json<{ workflow_runs: WorkflowRun[] }>();
  return data.workflow_runs || [];
}

export async function uploadFile(token: string, repo: string, path: string, content: string, branch: string): Promise<{ content: { sha: string } }> {
  return putFile(token, repo, path, content, branch);
}
