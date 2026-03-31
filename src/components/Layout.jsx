import { Outlet, useNavigate } from 'react-router-dom';
import { useRef, useCallback, useEffect } from 'react';
import { transitionStore } from '../transitionStore';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const curtainRef = useRef(null);
  const navigate = useNavigate();
  const isAnimating = useRef(false);

  const transitionTo = useCallback((to) => {
    if (isAnimating.current) return;
    const curtain = curtainRef.current;
    if (!curtain) { navigate(to); return; }

    isAnimating.current = true;
    curtain.style.transition = 'none';
    curtain.style.transform = 'translateY(100%)';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        curtain.style.transition = 'transform 0.38s cubic-bezier(0.76, 0, 0.24, 1)';
        curtain.style.transform = 'translateY(0%)';

        setTimeout(() => {
          navigate(to);
          window.scrollTo({ top: 0, behavior: 'instant' });

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              curtain.style.transition = 'transform 0.40s cubic-bezier(0.76, 0, 0.24, 1)';
              curtain.style.transform = 'translateY(-100%)';
              setTimeout(() => { isAnimating.current = false; }, 420);
            });
          });
        }, 420);
      });
    });
  }, [navigate]);

  useEffect(() => {
    transitionStore.transitionTo = transitionTo;
    return () => { transitionStore.transitionTo = null; };
  }, [transitionTo]);

  return (
    <div className="layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div
        ref={curtainRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'linear-gradient(160deg, #0284c7 0%, #4f46e5 100%)',
          transform: 'translateY(100%)',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
      <Navbar />
      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
