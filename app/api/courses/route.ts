import { NextResponse } from 'next/server';
import { supabaseClerkServerClient } from "@/config/supabase";

export async function GET(req: Request) {

    const {data: courses, error} = await supabaseClerkServerClient
        .from('courses')
        .select('*')
        .order('course_id')
    
    if (error) {
        console.error('supabase error:', error);
        return NextResponse.json(
            {error: error},
            {status: 500}
        );
    }

    console.log(courses);
    return NextResponse.json(
        {courses: courses},
        {status: 200}
    );
}