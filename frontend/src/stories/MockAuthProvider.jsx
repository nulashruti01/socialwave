import React from 'react';
import { AuthContext } from '../context/AuthContext';

const MockAuthProvider = ({ children, user }) => {
  const mockUser = user || { _id: 'user1', username: 'jdoe', avatar: '' };
  const value = { user: mockUser, token: 'mock', loading: false, login: async () => {}, register: async () => {}, logout: () => {}, updateUser: () => {} };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default MockAuthProvider;
