/**
 * Google Apps Script Web App for Talos Advisory Lead Form
 * 
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Copy and paste this entire code into the editor
 * 4. Click "Deploy" → "New deployment"
 * 5. Click the gear icon and select "Web app"
 * 6. Set "Execute as" to "Me"
 * 7. Set "Who has access" to "Anyone" (allows CORS from your website)
 * 8. Click "Deploy"
 * 9. Copy the Web App URL (looks like: https://script.google.com/macros/s/XXXXXX/exec)
 * 10. Use this URL in your frontend adapter
 */

// Configuration
const CONFIG = {
  TO_EMAIL: 'chase@talos-advisory.com', // Your email address
  SHEET_NAME: 'Leads', // Name of the sheet to store submissions
  SUBJECT_PREFIX: 'Talos Advisory Lead'
};

/**
 * Handle POST requests from the frontend
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Missing required fields: name, email, message'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Record to spreadsheet
    recordToSheet(data);
    
    // Send email notification
    sendEmailNotification(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Thank you! Your message has been sent.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Form submission error:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: 'An error occurred while processing your submission.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'OK',
      message: 'Talos Advisory Form Endpoint is running'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Record submission to Google Sheet
 */
function recordToSheet(data) {
  // Get or create the spreadsheet
  let spreadsheet;
  try {
    // Try to get existing spreadsheet by name
    const files = DriveApp.getFilesByName('Talos Advisory Leads');
    if (files.hasNext()) {
      const file = files.next();
      spreadsheet = SpreadsheetApp.openById(file.getId());
    } else {
      // Create new spreadsheet
      spreadsheet = SpreadsheetApp.create('Talos Advisory Leads');
      const sheet = spreadsheet.getActiveSheet();
      sheet.setName(CONFIG.SHEET_NAME);
      // Add headers
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Email',
        'Message',
        'Source',
        'UTM Source',
        'UTM Medium',
        'UTM Campaign'
      ]);
      // Format header row
      sheet.getRange(1, 1, 1, 8)
        .setFontWeight('bold')
        .setBackground('#e07a5f')
        .setFontColor('#ffffff');
    }
  } catch (error) {
    console.error('Error accessing spreadsheet:', error);
    throw error;
  }
  
  // Get the leads sheet
  let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
    sheet.appendRow([
      'Timestamp',
      'Name',
      'Email',
      'Message',
      'Source',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign'
    ]);
  }
  
  // Append the form data
  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.message,
    data.source || 'website',
    data.utmSource || '',
    data.utmMedium || '',
    data.utmCampaign || ''
  ]);
}

/**
 * Send email notification
 */
function sendEmailNotification(data) {
  const subject = `${CONFIG.SUBJECT_PREFIX}: ${data.name}`;
  
  const body = `
New lead submission from Talos Advisory website:

Name: ${data.name}
Email: ${data.email}
Source: ${data.source || 'website'}
Timestamp: ${new Date().toLocaleString()}

Message:
${data.message}

---
Reply directly to this email to respond to ${data.name} at ${data.email}
  `;
  
  try {
    GmailApp.sendEmail(
      CONFIG.TO_EMAIL,
      subject,
      body,
      {
        name: 'Talos Advisory Website',
        replyTo: data.email
      }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    // Try alternative method
    try {
      MailApp.sendEmail({
        to: CONFIG.TO_EMAIL,
        subject: subject,
        body: body,
        name: 'Talos Advisory Website',
        replyTo: data.email
      });
    } catch (fallbackError) {
      console.error('Fallback email also failed:', fallbackError);
      throw fallbackError;
    }
  }
}

/**
 * Test function (run this in the Apps Script editor to test)
 */
function testSubmission() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test submission',
    source: 'test',
    timestamp: new Date().toISOString()
  };
  
  // Simulate POST request
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
}
