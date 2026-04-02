/**
 * Google Apps Script Form Adapter
 * 
 * This adapter submits form data to a Google Apps Script Web App endpoint
 * which then records the data to a Google Sheet and sends an email notification.
 * 
 * USAGE:
 * 1. Deploy the Google Apps Script (see /google-apps-script/Code.gs)
 * 2. Copy the Web App URL from the deployment
 * 3. Create the adapter: createGoogleAppsScriptAdapter({ endpointUrl: 'YOUR_URL' })
 * 4. Pass it to LeadCaptureForm: <LeadCaptureForm adapter={formAdapter} />
 */

/**
 * Creates a form adapter that submits to Google Apps Script
 * @param {Object} config - Configuration object
 * @param {string} config.endpointUrl - The Google Apps Script Web App URL
 * @returns {Object} Form adapter with submit method
 */
export const createGoogleAppsScriptAdapter = ({ endpointUrl }) => ({
  async submit(payload) {
    try {
      // Validate endpoint URL
      if (!endpointUrl) {
        throw new Error('Google Apps Script endpoint URL is required');
      }

      // Prepare the submission data
      const submissionData = {
        name: payload.name,
        email: payload.email,
        message: payload.message,
        source: payload.source || 'website',
        timestamp: payload.timestamp || new Date().toISOString(),
        // Optional UTM parameters for tracking
        utmSource: payload.utmSource || '',
        utmMedium: payload.utmMedium || '',
        utmCampaign: payload.utmCampaign || ''
      };

      // Submit to Google Apps Script
      const response = await fetch(endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(submissionData),
      });

      // Google Apps Script can return non-JSON/opaque responses depending on deployment/CORS.
      const raw = await response.text();
      let result = null;
      try {
        result = raw ? JSON.parse(raw) : null;
      } catch {
        result = null;
      }

      if (!response.ok) {
        throw new Error('Form endpoint returned a non-success status');
      }

      // Check for success
      if (result && result.success === false) {
        throw new Error(result.error || 'Submission failed');
      }

      return {
        ok: true,
        message: result?.message || 'Thanks. Your message was sent.',
      };

    } catch (error) {
      console.error('Form submission error:', error);
      
      // Return user-friendly error message
      return {
        ok: false,
        error: error.message || 'Failed to send message. Please try again.',
      };
    }
  },
});

/**
 * Test the adapter (for development)
 * Run this in your browser console to test:
 * 
 * const adapter = createGoogleAppsScriptAdapter({ endpointUrl: 'YOUR_URL' });
 * adapter.submit({
 *   name: 'Test',
 *   email: 'test@test.com',
 *   message: 'Test message',
 *   source: 'test'
 * }).then(console.log);
 */
