export function FooterMinimal({ user }) {
  return (
    <footer className="footer-minimal">
      <div className="container">
        <p>© {new Date().getFullYear()} {user.firstName} {user.lastName}. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function FooterDetailed({ user }) {
  return (
    <footer className="footer-detailed">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>{user.firstName} {user.lastName}</h3>
            <p>{user.bio}</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>{user.contactEmail}</p>
            <p>{user.contactPhone}</p>
          </div>
          <div className="footer-section">
            <h4>Links</h4>
            <div className="footer-links">
              {user.links?.map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export function FooterCompact({ user }) {
  return (
    <footer className="footer-compact">
      <div className="container">
        <p>© {new Date().getFullYear()} {user.firstName} {user.lastName}</p>
        <div className="footer-compact-links">
          {user.links?.map((link, idx) => (
            <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer">
              {link.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}