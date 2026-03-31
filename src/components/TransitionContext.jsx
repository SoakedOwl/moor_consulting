import { createContext, useContext, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const TransitionContext = createContext(null);

export const usePageTransition = () => useContext(TransitionContext);

export const TransitionProvider = ({ children, curtainRef }) => {
  const navigate = useNavigate();
  const isAnimating = useRef(false);

  const transitionTo = useCallback((to) => {
    if (isAnimating.current) return;
    const curtain = curtainRef.current;
    if (!curtain) { navigate(to); return; }

    isAnimating.current = true;

    // Reset curtain: position it below the viewport (hidden)
    curtain.style.transition = 'none';
    curtain.style.transform = 'translateY(100%)';
    curtain.style.opacity = '1';

    // Double rAF ensures the browser actually paints the reset state
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Phase 1: Sweep UP to cover the full screen
        curtain.style.transition = 'transform 0.38s cubic-bezier(0.76, 0, 0.24, 1)';
        curtain.style.transform = 'translateY(0%)';

        // Wait LONGER than the transition to ensure full paint coverage before navigating
        setTimeout(() => {
          navigate(to);
          window.scrollTo({ top: 0, behavior: 'instant' });

          // Give the new page one rAF to paint, THEN reveal
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              // Phase 2: Sweep UP off the top to reveal new page
              curtain.style.transition = 'transform 0.42s cubic-bezier(0.76, 0, 0.24, 1)';
              curtain.style.transform = 'translateY(-100%)';

              setTimeout(() => {
                isAnimating.current = false;
              }, 440);
            });
          });
        }, 420); // Must be > 380ms (transition) + paint margin
      });
    });
  }, [navigate, curtainRef]);

  return (
    <TransitionContext.Provider value={{ transitionTo }}>
      {children}
    </TransitionContext.Provider>
  );
};
