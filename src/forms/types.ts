export type LeadFormPayload = {
  name: string;
  email: string;
  message: string;
  source: 'hero' | 'footer' | string;
  timestamp: string;
};

export type LeadFormResult = {
  ok: boolean;
  message?: string;
  error?: string;
};

export interface FormAdapter {
  submit(payload: LeadFormPayload): Promise<LeadFormResult>;
}
