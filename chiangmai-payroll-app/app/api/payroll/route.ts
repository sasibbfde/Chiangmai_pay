import {NextRequest,NextResponse} from 'next/server';
import {calculatePayroll,filterPunches,summarize} from '@/lib/payroll';
import {mockPunches,mockRules} from '@/lib/mock-data';
import {readSheet} from '@/lib/google-sheets';
import {EmployeeRule,Punch} from '@/lib/types';
function toNum(v:any){const n=Number(v); return Number.isFinite(n)?n:0}
export async function GET(req:NextRequest){
 const sp=req.nextUrl.searchParams; const year=Number(sp.get('year')||new Date().getFullYear()); const month=Number(sp.get('month')||new Date().getMonth()+1); const period=sp.get('period')||'month';
 let source='mock'; let punches:Punch[]=mockPunches; let rules:EmployeeRule[]=mockRules;
 try{
  const sheetPunches=await readSheet('Punches'); const sheetRules=await readSheet('Rules');
  if(sheetPunches?.length){source='google sheets'; punches=sheetPunches.map((r:any)=>({punch_id:r.punch_id,employee_id:r.employee_id,employee_name:r.employee_name,location:r.location,department:r.department,role:r.role,clocked_in:r.clocked_in,clocked_out:r.clocked_out,hours:toNum(r.hours),wage:toNum(r.wage),source:r.source||'sheet'}));}
  if(sheetRules?.length){rules=sheetRules.map((r:any)=>({employee_name:r.employee_name,rule_type:r.rule_type,rule_value:r.rule_value,combined_locations:r.combined_locations,payroll_location:r.payroll_location,notes:r.notes,active:String(r.active).toLowerCase()!=='false',effective_from:r.effective_from,effective_to:r.effective_to}));}
 }catch(e){source='mock - sheets not connected yet'}
 const periodPunches=filterPunches(punches,year,month,period); const rows=calculatePayroll(periodPunches,rules); const summary=summarize(rows);
 const monthly=Array.from({length:12},(_,i)=>{const p=filterPunches(punches,year,i+1,'month'); const r=calculatePayroll(p,rules); return {month:new Date(year,i,1).toLocaleString('en',{month:'short'}),payrollAmount:summarize(r).payrollAmount,totalHours:summarize(r).totalHours}});
 const yearly=[{year,payrollAmount:monthly.reduce((s,m)=>s+m.payrollAmount,0),totalHours:monthly.reduce((s,m)=>s+m.totalHours,0)}];
 return NextResponse.json({summary,rows,monthly,yearly,source});
}
