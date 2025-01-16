import React, { useState } from 'react';
import { X } from 'lucide-react';
import Login from './Login';
import Register from './Register';
import ResetPasswordModal from './ResetPasswordModal';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onSwitchMode: () => void;
}

function AuthModal({ isOpen, onClose, mode, onSwitchMode }: AuthModalProps) {
  const [showResetPassword, setShowResetPassword] = useState(false);

  if (!isOpen && !showResetPassword) return null;

  const handleResetPassword = () => {
    setShowResetPassword(true);
  };

  const handleCloseResetPassword = () => {
    setShowResetPassword(false);
  };

  if (showResetPassword) {
    return <ResetPasswordModal isOpen={true} onClose={handleCloseResetPassword} />;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          {mode === 'login' ? (
            <Login 
              onSwitchMode={onSwitchMode} 
              isModal={true} 
              onClose={onClose}
              onResetPassword={handleResetPassword}
            />
          ) : (
            <Register onSwitchMode={onSwitchMode} isModal={true} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;