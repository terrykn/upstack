import { Card } from 'primereact/card';
import { Timeline } from 'primereact/timeline';
import { Tag } from 'primereact/tag';

export function ExperiencesTimeline({ experiences }) {
  const formatDate = (date) => {
    if (!date) return "Present";
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const events = experiences?.map(exp => ({
    ...exp,
    dateLabel: `${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}`
  }));

  const customizedContent = (item) => {
    return (
      <Card className="experience-timeline-card">
        <h3 className="experience-position">{item.position}</h3>
        <p className="experience-company">{item.companyName}</p>
        <p className="experience-location">{item.location}</p>
        
        {item.awards && item.awards.length > 0 && (
          <div className="experience-awards">
            <h4>Awards:</h4>
            <ul>
              {item.awards.map((award, i) => (
                <li key={i}>{award}</li>
              ))}
            </ul>
          </div>
        )}
        
        {item.media && item.media.length > 0 && (
          <div className="experience-media">
            {item.media.map((mediaItem, i) => (
              mediaItem.type === 'image' ? (
                <img key={i} src={mediaItem.url} alt="" className="experience-media-image" />
              ) : null
            ))}
          </div>
        )}
      </Card>
    );
  };

  return (
    <Timeline 
      value={events} 
      align="left"
      className="experiences-timeline"
      marker={() => <i className="pi pi-circle-fill timeline-marker"></i>}
      content={customizedContent}
      opposite={(item) => item.dateLabel}
    />
  );
}

export function ExperiencesGallery({ experiences }) {
  return (
    <div className="experiences-gallery">
      {experiences?.map((exp, idx) => (
        <Card key={idx} className="experience-gallery-card">
          {exp.media && exp.media[0]?.type === 'image' && (
            <img src={exp.media[0].url} alt="" className="experience-gallery-image" />
          )}
          <h3 className="experience-position">{exp.position}</h3>
          <p className="experience-company">{exp.companyName}</p>
          <p className="experience-location">{exp.location}</p>
        </Card>
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
    <div className="experiences-cards">
      {experiences?.map((exp, idx) => (
        <Card key={idx} className="experience-card">
          <div className="experience-card-header">
            <div>
              <h3 className="experience-position">{exp.position}</h3>
              <p className="experience-company">{exp.companyName}</p>
              <p className="experience-location">{exp.location}</p>
            </div>
            <span className="experience-dates">
              {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
            </span>
          </div>
          {exp.awards && exp.awards.length > 0 && (
            <div className="experience-awards-tags">
              {exp.awards.map((award, i) => (
                <Tag key={i} value={award} icon="pi pi-trophy" severity="warning" />
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}