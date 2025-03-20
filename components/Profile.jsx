import React from 'react';
import PromptCard from './PromptCard';
import { usePathname } from 'next/navigation';

function Profile({ name, desc, data, handleEdit, handleDelete }) {
  const pathName = usePathname();

  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className="mt-10 prompt_layout">
        {/* ✅ Show this message only if the user is on their profile and has no prompts */}
        {pathName === '/profile' && data.length === 0 && (
          <p className='desc text-left'>Add your own first prompt</p>
        )}

        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={handleEdit ? () => handleEdit(post) : undefined}
            handleDelete={handleDelete ? () => handleDelete(post) : undefined}
          />
        ))}
      </div>
    </section>
  );
}

export default Profile;
