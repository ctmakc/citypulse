export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#F3F0E8' }}>
      {children}
    </div>
  );
}
