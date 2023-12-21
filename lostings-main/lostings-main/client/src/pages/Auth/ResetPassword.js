import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth-context';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
    const auth = useContext(AuthContext);
  const handleResetPassword = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}password/reset/01fe00be7e386800a75304ec3364b437bd3a255b`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword,confirmPassword }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("success");
        setMessage(responseData.message);
      } else {
        console.error('Error resetting password:', response.statusText);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <label>New Password</label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        disabled={isSubmitting}
      />
      <label>Confirm Password</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={isSubmitting}
      />
      <button onClick={handleResetPassword} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Reset Password'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
