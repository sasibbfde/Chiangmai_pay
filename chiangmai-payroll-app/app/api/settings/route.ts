import {NextResponse} from 'next/server';
export async function GET(){return NextResponse.json({locations:['Chiang Mai Danforth','Chiang Mai Junction','Chiang Mai Liberty Village','Chiang Mai Parklawn','Chiang Mai York Mills','Imm Thai Kitchen','Mississauga','Office'],periods:['1-15','16-end','month','weekly','custom'],backend:'Google Sheets'})}
