import {google} from 'googleapis';
function sheetsClient(){
 const email=process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL; const key=process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g,'\n');
 if(!email||!key||!process.env.GOOGLE_SHEET_ID) return null;
 const auth=new google.auth.JWT({email,key,scopes:['https://www.googleapis.com/auth/spreadsheets']});
 return google.sheets({version:'v4',auth});
}
export async function readSheet(tab:string){
 const sheets=sheetsClient(); if(!sheets) return null;
 const res=await sheets.spreadsheets.values.get({spreadsheetId:process.env.GOOGLE_SHEET_ID!,range:`${tab}!A:Z`});
 const rows=res.data.values||[]; if(rows.length<1) return [];
 const headers=rows[0].map(String);
 return rows.slice(1).filter(r=>r.some(Boolean)).map(r=>Object.fromEntries(headers.map((h,i)=>[h,r[i]??''])));
}
export async function appendRows(tab:string,headers:string[],rows:any[]){
 const sheets=sheetsClient(); if(!sheets) return null;
 const values=rows.map(row=>headers.map(h=>row[h]??''));
 await sheets.spreadsheets.values.append({spreadsheetId:process.env.GOOGLE_SHEET_ID!,range:`${tab}!A:Z`,valueInputOption:'USER_ENTERED',requestBody:{values}});
 return {ok:true,count:rows.length};
}
