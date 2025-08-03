
import React from 'react';

export const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="px-4 py-2 bg-primary text-white rounded hover:bg-accent transition">
      {children}
    </button>
  );
};
