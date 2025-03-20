"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = () => {
    const router = useRouter();
    const { id } = useParams(); // ✅ Get user ID from URL
    const [posts, setPosts] = useState([]);
    const searchParams = useSearchParams(); // ✅ Use URL search parameters to get username
    const username = searchParams.get("username");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`/api/users/${id}/posts`);
                if (!response.ok) throw new Error("Failed to fetch user posts");

                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }
        };

        if (id) fetchPosts();
    }, [id]);

    return (
        <Profile
            name={username || "User"} // ✅ Show username or fallback
            desc={`Welcome to  ${username ? username + "'s" : "this user's"} personal profile page. Explore ${username ? username + "'s" : "this user's"} exeptional prompts and be inspired by the power of the imaginations.`}
            data={posts}
        />
    );
};

export default UserProfile;
