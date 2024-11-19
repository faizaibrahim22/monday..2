"use client";

import { useState, useEffect } from "react";

interface Post {
    id: number;
    title: string;
    body: string;
}
export default function Page() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch("/api/external")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setPosts(data.data); // Save posts to state
                } else {
                    setError(data.message); // Save error message from API
                }
            })
            .catch(() => setError("An unexpected error occurred")) // Handle fetch errors
            .finally(() => setLoading(false)); // Stop loading after fetch
    }, []);

    // Conditional Rendering
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className=" bg-black text-amber-600 rounded-md">
            <h1 >Posts</h1>
            {posts.length > 0 ? (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>{post.title}</li> // Render post title
                    ))}
                </ul>
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
}
