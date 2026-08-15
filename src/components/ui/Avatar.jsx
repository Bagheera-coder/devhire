import './Avatar.css';

export function Avatar({ src, alt, fallback }) {
  return (
    <div className="avatar" title={alt}>
      {src ? (
        <img src={src} alt={alt || 'User avatar'} className="avatar-image" />
      ) : (
        <span className="avatar-fallback">{fallback}</span>
      )}
    </div>
  );
}
