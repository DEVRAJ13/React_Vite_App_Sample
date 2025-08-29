export const validate = (email, password) => {
  const newErrors = {};
  if (!email) {
    newErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = 'Email is invalid';
  }

  if (!password) {
    newErrors.password = 'Password is required';
  } else if (password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters';
  }
  return {'status': Object.keys(newErrors).length === 0, "type": newErrors};
};