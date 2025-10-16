import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export function ContactsIcons({ user }) {
  const platformIcons = {
    GitHub: 'pi-github',
    LinkedIn: 'pi-linkedin',
  };

  return (
    <div className="contacts-icons">
      {user.contactEmail && (
        <Button 
          label={user.contactEmail}
          icon="pi pi-envelope"
          className="p-button-outlined contact-button"
          onClick={() => window.location.href = `mailto:${user.contactEmail}`}
        />
      )}
      {user.contactPhone && (
        <Button 
          label={user.contactPhone}
          icon="pi pi-phone"
          className="p-button-outlined contact-button"
          onClick={() => window.location.href = `tel:${user.contactPhone}`}
        />
      )}
      {user.location && (
        <Button 
          label={user.location}
          icon="pi pi-map-marker"
          className="p-button-outlined contact-button"
          disabled
        />
      )}
      {user.links?.map((link, idx) => (
        <Button 
          key={idx}
          label={link.platform}
          icon={`pi ${platformIcons[link.platform] || 'pi-link'}`}
          className="p-button-outlined contact-button"
          onClick={() => window.open(link.url, '_blank')}
        />
      ))}
    </div>
  );
}

export function ContactsList({ user }) {
  return (
    <Card className="contacts-list-card">
      {user.contactEmail && (
        <div className="contact-item">
          <label className="contact-label">Email</label>
          <p className="contact-value">{user.contactEmail}</p>
        </div>
      )}
      {user.contactPhone && (
        <div className="contact-item">
          <label className="contact-label">Phone</label>
          <p className="contact-value">{user.contactPhone}</p>
        </div>
      )}
      {user.location && (
        <div className="contact-item">
          <label className="contact-label">Location</label>
          <p className="contact-value">{user.location}</p>
        </div>
      )}
      {user.links && user.links.length > 0 && (
        <div className="contact-item">
          <label className="contact-label">Links</label>
          <ul className="contact-links-list">
            {user.links.map((link, idx) => (
              <li key={idx}>
                <Button 
                  label={link.platform}
                  link
                  onClick={() => window.open(link.url, '_blank')}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}

export function ContactsCards({ user }) {
  return (
    <div className="contacts-cards">
      {user.contactEmail && (
        <Card className="contact-card">
          <i className="pi pi-envelope contact-card-icon"></i>
          <h3>Email</h3>
          <p>{user.contactEmail}</p>
        </Card>
      )}
      {user.contactPhone && (
        <Card className="contact-card">
          <i className="pi pi-phone contact-card-icon"></i>
          <h3>Phone</h3>
          <p>{user.contactPhone}</p>
        </Card>
      )}
      {user.location && (
        <Card className="contact-card">
          <i className="pi pi-map-marker contact-card-icon"></i>
          <h3>Location</h3>
          <p>{user.location}</p>
        </Card>
      )}
    </div>
  );
}