import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

export function ContactsIcons({ user }) {
  const platformIcons = {
    GitHub: Github,
    LinkedIn: Linkedin,
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {user.contactEmail && (
        <a href={`mailto:${user.contactEmail}`} className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
          <Mail size={20} />
          <span>{user.contactEmail}</span>
        </a>
      )}
      {user.contactPhone && (
        <a href={`tel:${user.contactPhone}`} className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
          <Phone size={20} />
          <span>{user.contactPhone}</span>
        </a>
      )}
      {user.location && (
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">
          <MapPin size={20} />
          <span>{user.location}</span>
        </div>
      )}
      {user.links?.map((link, idx) => {
        const Icon = platformIcons[link.platform] || Github;
        return (
          <a 
            key={idx} 
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <Icon size={20} />
            <span>{link.platform}</span>
          </a>
        );
      })}
    </div>
  );
}

export function ContactsList({ user }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      {user.contactEmail && (
        <div>
          <label className="text-sm font-semibold text-gray-600">Email</label>
          <p className="text-lg">{user.contactEmail}</p>
        </div>
      )}
      {user.contactPhone && (
        <div>
          <label className="text-sm font-semibold text-gray-600">Phone</label>
          <p className="text-lg">{user.contactPhone}</p>
        </div>
      )}
      {user.location && (
        <div>
          <label className="text-sm font-semibold text-gray-600">Location</label>
          <p className="text-lg">{user.location}</p>
        </div>
      )}
      {user.links && user.links.length > 0 && (
        <div>
          <label className="text-sm font-semibold text-gray-600">Links</label>
          <ul className="space-y-2 mt-2">
            {user.links.map((link, idx) => (
              <li key={idx}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {link.platform}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function ContactsCards({ user }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {user.contactEmail && (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Mail size={32} className="mx-auto mb-3 text-blue-600" />
          <h3 className="font-semibold mb-2">Email</h3>
          <p className="text-sm text-gray-600">{user.contactEmail}</p>
        </div>
      )}
      {user.contactPhone && (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Phone size={32} className="mx-auto mb-3 text-green-600" />
          <h3 className="font-semibold mb-2">Phone</h3>
          <p className="text-sm text-gray-600">{user.contactPhone}</p>
        </div>
      )}
      {user.location && (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <MapPin size={32} className="mx-auto mb-3 text-red-600" />
          <h3 className="font-semibold mb-2">Location</h3>
          <p className="text-sm text-gray-600">{user.location}</p>
        </div>
      )}
    </div>
  );
}