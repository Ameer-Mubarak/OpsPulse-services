export const Loading = ({ label = 'Loading' }: { label?: string }) => (
  <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
    <span className="spinner" />
    <small>{label}...</small>
  </div>
);
