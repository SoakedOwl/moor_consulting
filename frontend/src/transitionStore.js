// Shared mutable store — breaks the circular dependency
// between Layout.jsx (sets fn) and Navbar.jsx (calls fn)
export const transitionStore = {
  transitionTo: null,
};
