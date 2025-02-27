// utils/authUtils.js
export const validateAddress = (address) => {
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!ethAddressRegex.test(address)) return false;
    
    // Add any additional validation logic here
    return true;
  };
  
  export const sessionTimeRemaining = (lastActivity) => {
    const SESSION_TIMEOUT = 3600000; // 1 hour
    return Math.max(0, SESSION_TIMEOUT - (Date.now() - lastActivity));
  };
  