export default class FetchRequest {
  constructor(params) {
    this.host = params.host;
    this.port = params?.port ?? '80';
    this.secureMode = params?.secureMode ?? false;
    this.query = params?.query ?? {};
  }

  getAddress(path = '/', query = {}) {
    // prettier-ignore
    const address = `${this.secureMode ? "https" : "http"}://${this.host}:${this.port}${path}`;
    const entries = Object.entries(Object.assign({}, this.query, query));

    let queryView = '';
    if (entries.length) {
      queryView =
        '?' + entries.map(([key, value]) => `${key}=${value}`).join('&');
    }

    return address + queryView;
  }

  async get(path = '/', query = {}) {
    const address = this.getAddress(path, query);

    const answer = await fetch(address, { method: 'GET' });
    const json = await answer.json();

    const result = { data: json };

    if (answer.headers.has('X-Total-Count')) {
      result.count = Number(answer.headers.get('X-Total-Count'));
    }

    return result;
  }

  async post(path = '/', body = {}, query = {}) {
    const address = this.getAddress(path, query);

    const answer = await fetch(address, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    return await answer.json();
  }

  async delete(path = '/') {
    const address = this.getAddress(path);

    const answer = await fetch(address, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    return await answer.json();
  }

  async put(path = '/', body = {}) {
    const address = this.getAddress(path);

    const answer = await fetch(address, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    return await answer.json();
  }
}
