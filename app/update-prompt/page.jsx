"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

function EditPrompt() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [promptId, setPromptId] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });

    // Set promptId after mount to prevent hydration mismatch
    useEffect(() => {
        setPromptId(searchParams.get("id"));
    }, [searchParams]);

    useEffect(() => {
        const getPromptDetails = async () => {
            if (!promptId) return;
            try {
                const response = await fetch(`/api/prompt/${promptId}`);
                if (!response.ok) throw new Error("Failed to fetch prompt");
                const data = await response.json();
                setPost({ prompt: data.prompt, tag: data.tag });
            } catch (error) {
                console.error("Error fetching prompt:", error);
            }
        };
        getPromptDetails();
    }, [promptId]);

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) {
            alert("No prompt Id");
            setSubmitting(false);
            return;
        }

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: post.prompt, tag: post.tag }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            router.push("/");
        } catch (error) {
            console.error("Error submitting prompt:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    );
}

export default EditPrompt;
