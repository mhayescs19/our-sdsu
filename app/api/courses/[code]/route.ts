import { NextResponse } from 'next/server';
import { supabaseClerkServerClient } from "@/config/supabase";

interface Params {
    params: { code: string}
}

export async function GET(req: Request, context: { params: Promise<{ code: string }> }) {
    const { code } = await context.params;

    console.log("CODE:", code);
    const { data: course, error } = await supabaseClerkServerClient
        .from('courses')
        .select('*')
        .eq('code', code)
        .single()
    
    if (error) {
        console.error('supabase error', error, code);
        return NextResponse.json(
            {error: error},
            {status: 500},
        );
    }

    console.log(course);
    return NextResponse.json(
        {course: course},
        {status: 200}
    )

}
