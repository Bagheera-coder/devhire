import React from 'react';
import './RichText.css';

export function RichText({ text, className = '' }) {
  if (!text) return null;

  // 1. Prevent XSS: Escape raw HTML tags so users cannot inject <script> or malicious DOM nodes
  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const escapedText = escapeHtml(text);

  // 2. Parse Markdown Syntax using Regex
  const parsedHtml = escapedText
    // Bold: **text**
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    
    // Italic: *text*
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    
    // Inline Code: `code`
    .replace(/`(.*?)`/g, '<code class="md-code">$1</code>')
    
    // Links: [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="md-link">$1</a>')
    
    // Line breaks
    .replace(/\n/g, '<br />');

  // 3. Render safely
  return (
    <div 
      className={`rich-text-container ${className}`} 
      dangerouslySetInnerHTML={{ __html: parsedHtml }} 
    />
  );
}
