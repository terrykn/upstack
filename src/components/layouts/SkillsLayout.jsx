export function SkillsChips({ skills }) {
  const groupedSkills = skills?.reduce((acc, skill) => {
    if (!acc[skill.type]) acc[skill.type] = [];
    acc[skill.type].push(skill.name);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(groupedSkills || {}).map(([type, skillNames]) => (
        <div key={type}>
          <h3 className="text-lg font-semibold mb-3">{type}</h3>
          <div className="flex flex-wrap gap-2">
            {skillNames.map((name, idx) => (
              <span 
                key={idx} 
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkillsBars({ skills }) {
  const groupedSkills = skills?.reduce((acc, skill) => {
    if (!acc[skill.type]) acc[skill.type] = [];
    acc[skill.type].push(skill.name);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(groupedSkills || {}).map(([type, skillNames]) => (
        <div key={type}>
          <h3 className="text-lg font-semibold mb-3">{type}</h3>
          <div className="space-y-3">
            {skillNames.map((name, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{name}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${Math.random() * 30 + 70}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkillsGrid({ skills }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {skills?.map((skill, idx) => (
        <div 
          key={idx} 
          className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow"
        >
          <div className="text-3xl mb-2">💻</div>
          <p className="font-semibold">{skill.name}</p>
          <p className="text-xs text-gray-500">{skill.type}</p>
        </div>
      ))}
    </div>
  );
}