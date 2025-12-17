'use strict';

const AWS = require('aws-sdk');
const ses = new AWS.SES({ apiVersion: '2010-12-01' });

const TO = process.env.TO_ADDRESS;
const FROM = process.env.FROM_ADDRESS;
const ORIGINS = (process.env.ALLOWED_ORIGIN || '*')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

function corsHeaders(event) {
  const reqOrigin = event?.headers?.origin || event?.headers?.Origin;
  let allow = ORIGINS.includes('*') ? '*' : (ORIGINS.includes(reqOrigin) ? reqOrigin : (ORIGINS[0] || '*'));
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin'
  };
}

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

exports.handler = async (event) => {
  if (event.requestContext?.http?.method === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders(event), body: '' };
  }

  let data;
  try {
    data = typeof event.body === 'string' ? JSON.parse(event.body) : (event.body || {});
  } catch (e) {
    return { statusCode: 400, headers: corsHeaders(event), body: 'Invalid JSON' };
  }

  const name = (data.name || '').trim();
  const email = (data.email || '').trim();
  const subject = (data.subject || '').trim();
  const message = (data.message || '').trim();
  const honey = (data.company || '').trim();

  if (honey) {
    return { statusCode: 200, headers: corsHeaders(event), body: JSON.stringify({ ok: true }) };
  }
  if (!name || !email || !message || !isEmail(email)) {
    return { statusCode: 422, headers: corsHeaders(event), body: 'Missing or invalid fields' };
  }

  const subj = subject || `Website contact from ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    subject ? `Subject: ${subject}` : null,
    '',
    message,
  ].filter(Boolean).join('\n');

  const params = {
    Destination: { ToAddresses: [TO] },
    Message: {
      Body: { Text: { Charset: 'UTF-8', Data: text } },
      Subject: { Charset: 'UTF-8', Data: subj }
    },
    Source: FROM,
    ReplyToAddresses: [email]
  };

  try {
    await ses.sendEmail(params).promise();
    return { statusCode: 200, headers: corsHeaders(event), body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('SES error', err);
    return { statusCode: 502, headers: corsHeaders(event), body: 'Email failed' };
  }
};
