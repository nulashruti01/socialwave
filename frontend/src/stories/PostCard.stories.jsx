import React from 'react';
import PostCard from '../components/PostCard';
import MockAuthProvider from './MockAuthProvider';

export default { title: 'Feed/PostCard' };

const samplePost = {
  _id: 'p1',
  author: { _id: 'user1', username: 'jdoe' },
  content: 'Sunset at the coast — feeling blessed! #sunset #vibes',
  images: ['https://placekitten.com/600/600'],
  likes: [],
  comments: [],
  createdAt: new Date().toISOString()
};

export const Default = () => (
  <MockAuthProvider user={{ _id: 'user1', username: 'jdoe' }}>
    <div style={{ padding: 16, maxWidth: 520 }}>
      <PostCard post={samplePost} />
    </div>
  </MockAuthProvider>
);

export const WithComments = () => {
  const post = { ...samplePost, comments: [{ _id: 'c1', user: { _id: 'u2', username: 'anna' }, text: 'Lovely!' }] };
  return (
    <MockAuthProvider user={{ _id: 'user1', username: 'jdoe' }}>
      <div style={{ padding: 16, maxWidth: 520 }}>
        <PostCard post={post} />
      </div>
    </MockAuthProvider>
  );
};
