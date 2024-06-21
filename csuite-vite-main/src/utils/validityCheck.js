export function isValidEmail(email) {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isStrongPassword(password) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  return (
    hasUpperCase &&
    hasLowerCase &&
    hasDigit &&
    hasSpecialChar &&
    password.length >= 8
  );
}

export function isValidName(name) {
    if (!name) return false;
    if (!/^[a-zA-Z '-]+$/.test(name)) return false;
    if (name.length < 3 || name.length > 20) return false;
    const repetationCheck = () => {
      let count = {};
      for (let i = 0; i < name.length; i++) {
        const letter = name[i];
        count[letter] = (count[letter] || 0) + 1;
        if (count[letter] > 4) return false;
      }
      return true;
    };
    return repetationCheck();
  }
