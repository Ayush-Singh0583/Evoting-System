export const getAuthUser = () => {
  try {
    const stored = localStorage.getItem('authUser');
    return stored ? JSON.parse(stored) : null;
  } catch (err) {
    return null;
  }
};