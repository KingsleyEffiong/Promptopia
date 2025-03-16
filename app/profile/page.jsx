'use client';

import { useState, useEffect } from "react";
import { useSession } from "@node_modules/next-auth/react";
import { useRouter } from "@node_modules/next/navigation";
import Profile from "@components/Profile";
function MyProfile() {
    const { data: session } = useSession();

    const [posts, setPosts] = useState()
    const handleEdit = () => {

    }
    const handleDelete = () => {

    }
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data)
        }

        if (session?.user.id) fetchPosts();

    })
    return (
        <Profile
            name="My"
            desc="Welcome to your personalised profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile