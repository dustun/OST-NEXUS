'use client';

export function Vignette() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9998]"
      style={{
        background: 'radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.4) 100%)',
      }}
    />
  );
}
