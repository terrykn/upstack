export function FooterMinimal({ user }) {
  return (
    <footer className="bg-gray-100 py-6 mt-12">
      <div className="container mx-auto text-center text-gray-600">
        <p>© {new Date().getFullYear()} {user.firstName} {user.lastName}. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function FooterDetailed({ user }) {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">{user.firstName} {user.lastName}</h3>
          <p className="text-gray-300">{user.bio}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <p className="text-gray-300">{user.contactEmail}</p>
          <p className="text-gray-300">{user.contactPhone}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Links</h4>
          <div className="space-y-2">
            {user.links?.map((link, idx) => (
              <a key={idx} href={link.url} className="block text-gray-300 hover:text-white">
                {link.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto text-center mt-8 pt-8 border-t border-gray-700">
        <p className="text-gray-400">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}

export function FooterCompact({ user }) {
  return (
    <footer className="bg-white border-t py-6 mt-12">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-gray-600">© {new Date().getFullYear()} {user.firstName} {user.lastName}</p>
        <div className="flex gap-4">
          {user.links?.map((link, idx) => (
            <a key={idx} href={link.url} className="text-gray-600 hover:text-gray-900">
              {link.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}