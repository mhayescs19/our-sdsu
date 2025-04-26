"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

// type Props = {
//     params: {
//         course: string
//     }
// };

type Course = {
    course_id: number,
    code: string,
    title: string
    description: string
};

export default function CoursePage() {
    const params = useParams<{ code: string}>();
    const [course, setCourse] = useState<Course>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("CODE:", params.code);
        fetch(`/api/courses/${params.code}`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setCourse(data.course);

            })
            .catch((err) => {
                console.error("failed to load courses:", err);
                setError("Failed to load courses");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading</p>;

    if (!course) return <p>Course not found.</p>;

    return (
        <div className="flex justify-center items-center">
            <h1 className="">{course.title}</h1>
            <p className="text-amber-300">{course.description}</p>
        </div>
    );
}