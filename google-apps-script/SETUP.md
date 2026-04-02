# Google Apps Script Setup Instructions

## Overview
This setup creates a free backend that:
- Receives form submissions from your website
- Records them in a Google Sheet (for your records)
- Sends you an email notification immediately
- Requires no third-party services or paid subscriptions

## Step-by-Step Setup

### Step 1: Create the Google Apps Script Project

1. Go to https://script.google.com
2. Sign in with your Google account (chase@talos-advisory.com or any Gmail)
3. Click "New project" (the + button)
4. Delete any code that's in the editor by default
5. Copy and paste the **entire contents** of `google-apps-script/Code.gs` from this project
6. Click the disk icon or press Ctrl+S to save
7. Give your project a name (top left): "Talos Advisory Form Handler"

### Step 2: Deploy as Web App

1. Click "Deploy" button (top right)
2. Select "New deployment"
3. Click the gear icon next to "Select type"
4. Choose "Web app"
5. Configure the deployment:
   - **Description**: "Form submission endpoint"
   - **Execute as**: "Me" (your Google account)
   - **Who has access**: "Anyone" ← **Important! This allows your website to submit**
6. Click "Deploy"
7. Review and authorize the permissions (it needs to send email and access Drive/Sheets)
8. Copy the **Web App URL** (looks like: `https://script.google.com/macros/s/AKfycbxxxxx/exec`)

### Step 3: Update Your Website

1. Open `src/pages/HomePage.jsx`
2. Find this line:
   ```javascript
   endpointUrl: 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE'
   ```
3. Replace it with your actual Web App URL:
   ```javascript
   endpointUrl: 'https://script.google.com/macros/s/YOUR_ACTUAL_URL/exec'
   ```
4. Save the file

### Step 4: Test It

1. Start your dev server: `npx vite --host`
2. Open the site in your browser
3. Fill out the form and submit
4. Check:
   - Your email inbox (should receive notification within seconds)
   - Google Drive (new spreadsheet "Talos Advisory Leads" will be created)

## How It Works

1. **User submits form** on your website
2. **Frontend adapter** sends POST request to Google Apps Script
3. **Apps Script** receives data, validates it
4. **Two things happen simultaneously**:
   - Data is appended to Google Sheet (automatic backup/record)
   - Email is sent to chase@talos-advisory.com via Gmail
5. **Success message** is returned to the user

## Customization Options

### Change the recipient email
In `google-apps-script/Code.gs`, modify:
```javascript
const CONFIG = {
  TO_EMAIL: 'chase@talos-advisory.com', // Change this
  // ...
};
```

### Add more form fields
1. Update the form component to collect new data
2. Add the fields to the adapter payload
3. Update the Apps Script to handle and email the new fields
4. Add columns to the spreadsheet headers in the `recordToSheet` function

### Add spam protection
Consider adding a honeypot field or reCAPTCHA:
- Frontend: Add a hidden field that bots fill out
- Backend: Check if that field is empty before processing

## Troubleshooting

### "Access denied" errors
- Make sure the Web App is deployed with "Who has access" set to "Anyone"
- Check the Apps Script execution logs (View → Executions in the script editor)

### Emails not sending
- Verify the `TO_EMAIL` is correct in the script
- Check spam/junk folders
- Ensure Gmail hasn't disabled the sending account

### CORS errors in browser
- This usually means the Web App URL is wrong or the deployment failed
- Try re-deploying the Web App
- Check that the URL in HomePage.jsx exactly matches the deployment URL

### Form submissions not appearing in Sheet
- The sheet is created automatically on first submission
- Check your Google Drive root folder for "Talos Advisory Leads"
- Check the Apps Script execution logs for errors

## Security Notes

- The endpoint is public (required for CORS), but only accepts POST requests
- No API keys or authentication required for the user
- The script validates that required fields are present
- All data is stored in your Google account, not third-party servers
- Consider adding rate limiting if you receive spam submissions

## Maintenance

- The Apps Script runs in your Google account indefinitely
- Free tier includes:
  - 20,000 URL fetches per day (form submissions)
  - 100 emails per day (via Gmail)
  - Unlimited Google Sheet storage
- To update the script, edit in the Apps Script editor and create a new deployment

## Need Help?

Check the Apps Script execution logs:
1. Go to https://script.google.com
2. Open your project
3. Click "View" → "Executions"
4. Look for any failed executions and error messages
