import React from 'react'
import PromptCard from './PromptCard'
function Profile({ name, desc, daa, handleEdit, handleDelete }) {
  return (
    <section className='w-full'>
      <h1>{name} Profile</h1>
    </section>
  )
}

export default Profile