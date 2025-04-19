// src/contexts/AccentColorContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AccentColorContext = createContext();

export const AccentColorProvider = ({ children }) => {
  const [accentColor, setAccentColor] = useState(() => {
    // Try to get saved accent color from localStorage
    const savedColor = localStorage.getItem('accentColor');
    return savedColor || '#00A3FF'; // Default blue
  });

  // Apply accent color to CSS variables
  const applyAccentColor = (color) => {
    // Set the main accent color
    document.documentElement.style.setProperty('--accent-color', color);
    document.documentElement.style.setProperty('--accent-color-500', color);
    
    // Generate color variations
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Generate lighter shades
    document.documentElement.style.setProperty('--accent-color-50', adjustColor(r, g, b, 0.9));
    document.documentElement.style.setProperty('--accent-color-100', adjustColor(r, g, b, 0.8));
    document.documentElement.style.setProperty('--accent-color-200', adjustColor(r, g, b, 0.6));
    document.documentElement.style.setProperty('--accent-color-300', adjustColor(r, g, b, 0.4));
    document.documentElement.style.setProperty('--accent-color-400', adjustColor(r, g, b, 0.2));
    
    // Generate darker shades
    document.documentElement.style.setProperty('--accent-color-600', darkenColor(r, g, b, 0.2));
    document.documentElement.style.setProperty('--accent-color-700', darkenColor(r, g, b, 0.4));
    document.documentElement.style.setProperty('--accent-color-800', darkenColor(r, g, b, 0.6));
    document.documentElement.style.setProperty('--accent-color-900', darkenColor(r, g, b, 0.8));
  };

  // Helper function to lighten a color
  const adjustColor = (r, g, b, factor) => {
    // Mix with white based on factor
    const newR = Math.round(r + (255 - r) * factor);
    const newG = Math.round(g + (255 - g) * factor);
    const newB = Math.round(b + (255 - b) * factor);
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  };
  
  // Helper function to darken a color
  const darkenColor = (r, g, b, factor) => {
    const newR = Math.round(r * (1 - factor));
    const newG = Math.round(g * (1 - factor));
    const newB = Math.round(b * (1 - factor));
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  };

  // Update localStorage and apply styles when accent color changes
  useEffect(() => {
    localStorage.setItem('accentColor', accentColor);
    applyAccentColor(accentColor);
  }, [accentColor]);

  // Apply the accent color on initial load
  useEffect(() => {
    applyAccentColor(accentColor);
  }, []);

  return (
    <AccentColorContext.Provider value={{ accentColor, setAccentColor }}>
      {children}
    </AccentColorContext.Provider>
  );
};

export const useAccentColor = () => useContext(AccentColorContext);