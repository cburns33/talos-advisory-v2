const toMailto = ({ to, subject, body }) => {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  return `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`;
};

export const createMailtoAdapter = ({ to, subjectPrefix = 'Talos Advisory Lead' }) => ({
  async submit(payload) {
    const subject = `${subjectPrefix}: ${payload.name}`;
    const body = [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      '',
      'Message:',
      payload.message,
      '',
      `Source: ${payload.source}`,
      `Timestamp: ${payload.timestamp}`,
    ].join('\n');

    window.location.href = toMailto({ to, subject, body });
    return { ok: true };
  },
});
