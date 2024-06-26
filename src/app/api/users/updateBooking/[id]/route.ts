import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/db/db';
import BookRequest from "@/models/bookRequest.model"

export async function PUT(request: NextRequest, { params }: { params: { id: string }}) {
    try {

        connect();    
        const searchParams = request.nextUrl.searchParams
        let param:string | null = ""
        param = searchParams.get('params')
        const [action, otp]:any = param?.split(',');

        if(otp !== "011110"){
            return NextResponse.json({ status: 'error', message: "Invalid OTP!"})
        }

        if (action === 'cancel' || action === 'complete') {
            const updateData = { status: action === 'cancel' ? 'cancelled' : 'completed' };

            let updatedBooking = await BookRequest.findByIdAndUpdate(
                params.id,
                updateData,
                { new: true }
            );
            return NextResponse.json({ status: 'success', data: updatedBooking})
        }

        return NextResponse.json({ status: 'error', message: "error while updatation"})
        
    } catch (error: any) {
        return NextResponse.json({ status: 'error', message: error.message})
    }
}