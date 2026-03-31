import { useState } from 'react';

const initialState = {
  name: '',
  email: '',
  message: '',
};

export const useLeadForm = ({ adapter, source }) => {
  const [values, setValues] = useState(initialState);
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const updateField = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async () => {
    setStatus('submitting');
    setFeedback('');

    const payload = {
      ...values,
      source,
      timestamp: new Date().toISOString(),
    };

    const result = await adapter.submit(payload);

    if (!result.ok) {
      setStatus('error');
      setFeedback(result.error || 'Something went wrong. Please try again.');
      return;
    }

    setStatus('success');
    setFeedback(result.message || 'Thanks. I will follow up soon.');
    setValues(initialState);
  };

  return {
    values,
    status,
    feedback,
    updateField,
    submit,
  };
};
