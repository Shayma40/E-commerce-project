import React, { useState } from 'react';
import axios from 'axios';

const NewsletterForm = ({ showSnackbar }) => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSendNewsletter = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    try {
      await axios.post('http://localhost:7800/api/admin/newsletter', { subject, content },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Newsletter sent successfully!');
      setSubject('');
      setContent('');
      if (showSnackbar) showSnackbar('Newsletter sent successfully!', 'success');
    } catch (error) {
      setMessage('Failed to send the newsletter.');
      if (showSnackbar) showSnackbar('Failed to send the newsletter.', 'error');
    }
  };

  return (
    <div>
      <h2>Send Newsletter</h2>
      <form onSubmit={handleSendNewsletter}>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Newsletter</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NewsletterForm;
