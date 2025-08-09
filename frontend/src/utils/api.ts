export const api = {
  async post(path: string, body: any) {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      let data: any;
      try { data = await res.json(); } catch { /* ignore */ }
      const error: any = new Error("Request failed");
      (error.response as any) = { data, status: res.status };
      throw error;
    }
    return res.json();
  },
  async get(path: string, token?: string) {
    const res = await fetch(path, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    if (!res.ok) throw new Error(`GET ${path} failed`);
    return res.json();
  }
};
