'use client';
import { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};

function Feed() {
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredPosts, setFilteredPosts] = useState([]); // FIX: Initialize as an array


    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/prompt');
                const data = await response.json();
                setPosts(data);
                setFilteredPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);
    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        setSearchText(searchValue);

        if (searchValue.trim() === '') {
            setFilteredPosts(posts); // Reset to all posts
        } else {
            const regex = new RegExp(searchValue, 'i'); // Case-insensitive search
            const filtered = posts.filter((post) =>
                regex.test(post.prompt) ||
                regex.test(post.tag) ||
                regex.test(post.creator?.email) // Ensure creator exists before accessing email
            );

            setFilteredPosts(filtered.length > 0 ? filtered : []); // Set empty array if no matches
        }
    };




    const handleTagClick = (tag) => {
        setSearchText(tag);
        const regex = new RegExp(tag, 'i');
        const filtered = posts.filter((post) => regex.test(post.tag));
        setFilteredPosts(filtered);
    };




    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>
            {isLoading ? (
                <p className="text-gray-500 text-center mt-4">Loading posts...</p>
            ) : filteredPosts.length > (
                <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
            )}
        </section>
    );
}

export default Feed;
