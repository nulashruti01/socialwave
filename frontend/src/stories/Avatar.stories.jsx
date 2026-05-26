import React from 'react';
import Avatar from '../components/PostCard';
import MockAuthProvider from './MockAuthProvider';

export default { title: 'Design/Avatar' };

const Template = (args) => (
  <MockAuthProvider>
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <div className="avatar avatar-sm">{args.username?.[0]?.toUpperCase()}</div>
        <div className="avatar avatar-md">{args.username?.[0]?.toUpperCase()}</div>
        <div className="avatar avatar-lg">{args.username?.[0]?.toUpperCase()}</div>
      </div>
    </div>
  </MockAuthProvider>
);

export const Default = Template.bind({});
Default.args = { username: 'jdoe' };
