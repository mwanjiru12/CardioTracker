import { useCallback } from 'react';

const useAuthorizedFetch = () => {
  const authFetch = useCallback(async (url, method = 'GET', body = null) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error in fetch:', error);
      throw error; // Re-throw error for further handling
    }
  }, []);

  return authFetch;
};

export default useAuthorizedFetch;
