import { createContext, useContext, useState } from "react";

// Create the context
const AuthContext = createContext();

// Create the provider component
export function AuthProvider({ children }) {
  // Initialize registered accounts from localStorage
  const [accounts, setAccounts] = useState(() => {
    const storedAccounts = localStorage.getItem("buchshelf_accounts");
    if (storedAccounts) {
      try {
        return JSON.parse(storedAccounts);
      } catch (error) {
        console.error("Failed to load accounts from localStorage:", error);
        return [];
      }
    }
    return [];
  });

  // Initialize current user state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedUser = localStorage.getItem("buchshelf_user");
    return !!storedUser;
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("buchshelf_user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Failed to load user from localStorage:", error);
        return null;
      }
    }
    return null;
  });

  // Signup function - create new account
  const signup = (email, username, password) => {
    // Check if email already exists
    if (accounts.some((acc) => acc.email === email)) {
      throw new Error("Email already registered");
    }

    // Check if username already exists
    if (accounts.some((acc) => acc.username === username)) {
      throw new Error("Username already taken");
    }

    // Create new account
    const newAccount = { email, username, password };
    const updatedAccounts = [...accounts, newAccount];
    setAccounts(updatedAccounts);
    localStorage.setItem("buchshelf_accounts", JSON.stringify(updatedAccounts));

    // Auto-login after signup
    const userData = { email, username };
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("buchshelf_user", JSON.stringify(userData));
  };

  // Login function - verify credentials
  const login = (email, password) => {
    // Find account with matching email and password
    const account = accounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (!account) {
      throw new Error("Invalid email or password");
    }

    // Login successful
    const userData = { email, username: account.username };
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("buchshelf_user", JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("buchshelf_user");
  };

  // Update profile (username and/or email)
  const updateProfile = ({ username, email }) => {
    if (!isLoggedIn || !user) {
      throw new Error("Not authenticated");
    }

    const currentEmail = user.email;
    const accountIndex = accounts.findIndex(
      (acc) => acc.email === currentEmail
    );
    if (accountIndex === -1) {
      throw new Error("Account not found");
    }

    const updated = { ...accounts[accountIndex] };

    // If changing email, ensure it's unique
    if (email && email !== currentEmail) {
      if (
        accounts.some((acc, i) => i !== accountIndex && acc.email === email)
      ) {
        throw new Error("Email already registered");
      }
      updated.email = email;
    }

    // If changing username, ensure it's unique
    if (username && username !== updated.username) {
      if (
        accounts.some(
          (acc, i) => i !== accountIndex && acc.username === username
        )
      ) {
        throw new Error("Username already taken");
      }
      updated.username = username;
    }

    const newAccounts = [...accounts];
    newAccounts[accountIndex] = updated;
    setAccounts(newAccounts);
    localStorage.setItem("buchshelf_accounts", JSON.stringify(newAccounts));

    // Update current user payload (email/username only)
    const newUser = { email: updated.email, username: updated.username };
    setUser(newUser);
    localStorage.setItem("buchshelf_user", JSON.stringify(newUser));
    return newUser;
  };

  // Change password (verify current password)
  const updatePassword = (currentPassword, newPassword) => {
    if (!isLoggedIn || !user) {
      throw new Error("Not authenticated");
    }
    const accountIndex = accounts.findIndex((acc) => acc.email === user.email);
    if (accountIndex === -1) {
      throw new Error("Account not found");
    }
    const account = accounts[accountIndex];
    if (account.password !== currentPassword) {
      throw new Error("Current password is incorrect");
    }
    const newAccounts = [...accounts];
    newAccounts[accountIndex] = { ...account, password: newPassword };
    setAccounts(newAccounts);
    localStorage.setItem("buchshelf_accounts", JSON.stringify(newAccounts));
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        signup,
        logout,
        updateProfile,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
