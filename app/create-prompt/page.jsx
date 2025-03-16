'use client'
import React from 'react'
import { useState } from 'react'
import { useSession } from '@node_modules/next-auth/react'
import { useRouter } from '@node_modules/next/navigation'
import Form from '@components/Form'
function page() {
    const router = useRouter();
    const { data: session } = useSession()
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })
    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        console.log("Submitting prompt:", post); // ✅ Debug log

        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // ✅ Ensure JSON header
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user?.id, // ✅ Ensure session data is valid
                    tag: post.tag,
                }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            router.push('/');
        } catch (error) {
            console.error("Error submitting prompt:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form type="Create" post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt} />
    )
}

export default page