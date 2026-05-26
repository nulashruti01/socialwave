import React from 'react';
import '../index.css';

export default {
  title: 'Design/Button',
  argTypes: { onClick: { action: 'clicked' } }
};

export const Primary = (args) => (
  <button className="btn btn-primary" {...args}>Primary Action</button>
);

export const Ghost = (args) => (
  <button className="btn btn-ghost" {...args}>Ghost</button>
);
