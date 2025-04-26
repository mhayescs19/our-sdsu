"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';

type Course = {
    course_id: number,
    code: string,
    title: string
};

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/courses")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setCourses(data.courses);
            })
            .catch((err) => {
                console.error("Failed to load courses:", err);
                setError("Failed to load courses");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); // run once on mount (empty dependency array?)

    return (
        <div className="flex justify-center items-center">
            <h1>Courses</h1>
            <ul>
                {courses.map((c) => (
                    <li key={c.course_id}>
                        <Link href={`/courses/${c.code}`}>
                        {c.code}: {c.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}