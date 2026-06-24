import {NextResponse} from 'next/server';
import {readSheet} from '@/lib/google-sheets';
import {mockRules} from '@/lib/mock-data';
export async function GET(){try{const rows=await readSheet('Rules'); return NextResponse.json({source:rows?.length?'google sheets':'mock',rules:rows?.length?rows:mockRules});}catch{return NextResponse.json({source:'mock',rules:mockRules})}}
