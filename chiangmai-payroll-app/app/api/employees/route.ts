import {NextResponse} from 'next/server';
import {readSheet} from '@/lib/google-sheets';
import {mockEmployees} from '@/lib/mock-data';
export async function GET(){try{const rows=await readSheet('Employees'); return NextResponse.json({source:rows?.length?'google sheets':'mock',employees:rows?.length?rows:mockEmployees});}catch{return NextResponse.json({source:'mock',employees:mockEmployees})}}
