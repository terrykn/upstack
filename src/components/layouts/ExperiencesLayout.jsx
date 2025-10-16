export function ExperiencesTimeline({ experiences }) {
  const formatDate = (date) => {
    if (!date) return "Present";
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
      {experiences?.map((exp, idx) => (
        <div key={idx} className="relative pl-20 pb-12">
          <div className="absolute left-6 w-5 h-5 bg-blue-600 rounded-full border-4 border-white"></div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold">{exp.position}</h3>
              <span className="text-sm text-gray-500">
                {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
              </span>
            </div>
            <p className="text-gray-700 font-medium mb-1">{exp.companyName}</p>
            <p className="text-gray-500 text-sm mb-4">{exp.location}</p>
            
            {exp.awards && exp.awards.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2">Awards:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {exp.awards.map((award, i) => (
                    <li key={i}>{award}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {exp.media && exp.media.length > 0 && (
              <div className="flex gap-2 mt-4">
                {exp.media.map((item, i) => (
                  item.type === 'image' ? (
                    <img key={i} src={item.url} alt="" className="w-20 h-20 object-cover rounded" />
                  ) : null
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ExperiencesGallery({ experiences }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {experiences?.map((exp, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
          {exp.media && exp.media[0]?.type === 'image' && (
            <img src={exp.media[0].url} alt="" className="w-full h-48 object-cover" />
          )}
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{exp.position}</h3>
            <p className="text-gray-700 font-medium">{exp.companyName}</p>
            <p className="text-gray-500 text-sm">{exp.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ExperiencesCards({ experiences }) {
  const formatDate = (date) => {
    if (!date) return "Present";
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {experiences?.map((exp, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold">{exp.position}</h3>
              <p className="text-lg text-gray-700">{exp.companyName}</p>
              <p className="text-gray-500">{exp.location}</p>
            </div>
            <span className="text-sm text-gray-500 whitespace-nowrap">
              {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
            </span>
          </div>
          {exp.awards && exp.awards.length > 0 && (
            <div className="mt-4">
              {exp.awards.map((award, i) => (
                <span key={i} className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm mr-2">
                  🏆 {award}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}