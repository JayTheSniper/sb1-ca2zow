import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

export async function appendToSheet(range: string, values: any[][]) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error appending to Google Sheet:', error);
    throw error;
  }
}

export async function readFromSheet(range: string) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range,
    });

    return response.data.values;
  } catch (error) {
    console.error('Error reading from Google Sheet:', error);
    throw error;
  }
}

export async function updateSheet(range: string, values: any[][]) {
  try {
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error updating Google Sheet:', error);
    throw error;
  }
}