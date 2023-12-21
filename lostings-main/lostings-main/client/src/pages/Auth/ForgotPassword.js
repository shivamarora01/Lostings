import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth-context';

const ForgotPassword = () => {
const auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetPassword = async () => {
    setIsSubmitting(true);
    const url = `http://localhost:3000/password/reset`;
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}password/forgot`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email ,url}),
      });

      if (response.ok) {
        const responseData = await response.json();
        setMessage(responseData.message);
      } else {
        console.error('Error sending reset password link:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending reset password link:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isSubmitting}
      />
      <button onClick={handleResetPassword} disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Reset Password'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
