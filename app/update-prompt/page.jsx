'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter, useSearchParams } from '@node_modules/next/navigation'
import Form from '@components/Form'
function EditPrompt() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })


    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }
        if (promptId) getPromptDetails()
    }, [promptId])


    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) return alert('No prompt Id ')

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json', // ✅ Ensure JSON header
                },
                body: JSON.stringify({
                    prompt: post.prompt,
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
        <Form type="Edit" post={post} setPost={setPost} submitting={submitting} handleSubmit={updatePrompt} />
    )
}

export default EditPrompt