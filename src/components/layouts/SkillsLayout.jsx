import { Chip } from 'primereact/chip';
import { ProgressBar } from 'primereact/progressbar';
import { Card } from 'primereact/card';

export function SkillsChips({ skills }) {
  const groupedSkills = skills?.reduce((acc, skill) => {
    if (!acc[skill.type]) acc[skill.type] = [];
    acc[skill.type].push(skill.name);
    return acc;
  }, {});

  return (
    <div className="skills-chips">
      {Object.entries(groupedSkills || {}).map(([type, skillNames]) => (
        <div key={type} className="skill-group">
          <h3 className="skill-group-title">{type}</h3>
          <div className="skill-chips-container">
            {skillNames.map((name, idx) => (
              <Chip key={idx} label={name} className="skill-chip" />
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
    acc[skill.type].push({name: skill.name, level: Math.random() * 30 + 70});
    return acc;
  }, {});

  return (
    <div className="skills-bars">
      {Object.entries(groupedSkills || {}).map(([type, skillData]) => (
        <div key={type} className="skill-group">
          <h3 className="skill-group-title">{type}</h3>
          <div className="skill-bars-container">
            {skillData.map((skill, idx) => (
              <div key={idx} className="skill-bar-item">
                <div className="skill-bar-header">
                  <span>{skill.name}</span>
                  <span>{Math.round(skill.level)}%</span>
                </div>
                <ProgressBar value={skill.level} showValue={false} />
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
    <div className="skills-grid">
      {skills?.map((skill, idx) => (
        <Card key={idx} className="skill-grid-card">
          <div className="skill-grid-content">
            <i className="pi pi-code skill-grid-icon"></i>
            <p className="skill-name">{skill.name}</p>
            <p className="skill-type">{skill.type}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}