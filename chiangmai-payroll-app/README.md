# Chiang Mai Payroll Dashboard

Next.js + Google Sheets payroll management web app for 7shifts data.

## What is included
- Period dashboard: 1-15, 16-end, weekly, custom date range
- Monthly dashboard
- Yearly dashboard
- Employee roster view
- Editable employee rules/exceptions using Google Sheets
- 7shifts sync backend placeholder using server-only environment variables
- Payroll engine for cash/cheque split, cash-only, salary, hold payroll, and hour caps

## Safe token setup
Never paste your 7shifts token into code or GitHub. Add it only in Vercel:

`SEVENSHIFTS_API_KEY=your_token`

## Google Sheet tabs required
Create one Google Sheet with these tabs:

### Employees
`employee_id,first_name,last_name,full_name,location,department,role,wage,active,source`

### Rules
`employee_name,rule_type,rule_value,combined_locations,payroll_location,notes,active,effective_from,effective_to`

### Punches
`punch_id,employee_id,employee_name,location,department,role,clocked_in,clocked_out,hours,wage,source`

### Settings
`key,value`

## Install
```bash
npm install
npm run dev
```

## Deploy
1. Upload this folder to GitHub.
2. Import repository in Vercel.
3. Add environment variables from `.env.example`.
4. Deploy.

## Notes
The app currently includes a mock dashboard if Google Sheets is not connected, so you can test the interface first.
