export const createHttpAdapter = ({ endpoint, fetchImpl = window.fetch.bind(window) }) => ({
  async submit(payload) {
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { ok: false, error: 'Unable to submit your request right now.' };
    }

    return { ok: true, message: 'Thanks. Your request has been submitted.' };
  },
});
