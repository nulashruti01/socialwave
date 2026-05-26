import React from 'react';
import MockAuthProvider from './MockAuthProvider';

export default { title: 'Feed/StoryBubble' };

export const Default = () => (
  <MockAuthProvider>
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <div className="avatar avatar-lg" style={{ border: '3px solid linear-gradient(90deg,#7AF7E1,#7B83FF)', padding: 6 }}>A</div>
        <div className="avatar avatar-lg" style={{ boxShadow: '0 6px 18px rgba(2,6,23,0.45)' }}>B</div>
      </div>
    </div>
  </MockAuthProvider>
);
