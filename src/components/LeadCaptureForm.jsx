import { useLeadForm } from '../forms/useLeadForm';

const LeadCaptureForm = ({ adapter, source, ctaLabel = 'Send message' }) => {
  const { values, status, feedback, updateField, submit } = useLeadForm({ adapter, source });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await submit();
  };

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div className="lead-form-grid">
        <label className="field">
          <span>Name</span>
          <input
            type="text"
            required
            value={values.name}
            onChange={(event) => updateField('name', event.target.value)}
            name="name"
            autoComplete="name"
          />
        </label>

        <label className="field">
          <span>Email</span>
          <input
            type="email"
            required
            value={values.email}
            onChange={(event) => updateField('email', event.target.value)}
            name="email"
            autoComplete="email"
          />
        </label>
      </div>

      <label className="field">
        <span>Message</span>
        <textarea
          required
          value={values.message}
          onChange={(event) => updateField('message', event.target.value)}
          name="message"
          rows={4}
        />
      </label>

      <div className="lead-form-actions">
        <button
          type="submit"
          disabled={status === 'submitting' || status === 'success'}
          className={`btn-primary ${status === 'success' ? 'is-success' : ''}`.trim()}
        >
          {status === 'submitting' ? 'Sending...' : status === 'success' ? "We'll speak soon!" : ctaLabel}
        </button>
      </div>

      {status === 'error' && feedback ? (
        <p className="form-feedback form-feedback--error">
          {feedback}
        </p>
      ) : null}
    </form>
  );
};

export default LeadCaptureForm;
