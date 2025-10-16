import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { ProjectsGallery, ProjectsCards } from './layouts/ProjectsLayout';
import { ExperiencesTimeline, ExperiencesGallery, ExperiencesCards } from './layouts/ExperiencesLayout';
import { SkillsChips, SkillsBars, SkillsGrid } from './layouts/SkillsLayout';
import { ContactsIcons, ContactsList, ContactsCards } from './layouts/ContactsLayout';
import { FooterMinimal, FooterDetailed, FooterCompact } from './layouts/FooterLayout';

export default function PageTemplate({ data }) {
  const layout = data.layout || {};

  // Layout component mappings
  const projectsLayouts = {
    gallery: ProjectsGallery,
    cards: ProjectsCards,
  };

  const experiencesLayouts = {
    timeline: ExperiencesTimeline,
    gallery: ExperiencesGallery,
    cards: ExperiencesCards,
  };

  const skillsLayouts = {
    chips: SkillsChips,
    bars: SkillsBars,
    grid: SkillsGrid,
  };

  const contactsLayouts = {
    icons: ContactsIcons,
    list: ContactsList,
    cards: ContactsCards,
  };

  const footerLayouts = {
    minimal: FooterMinimal,
    detailed: FooterDetailed,
    compact: FooterCompact,
  };

  // Get components based on layout settings
  const ProjectsComponent = projectsLayouts[layout.projectsLayout] || ProjectsGallery;
  const ExperiencesComponent = experiencesLayouts[layout.experiencesLayout] || ExperiencesTimeline;
  const SkillsComponent = skillsLayouts[layout.skillsLayout] || SkillsChips;
  const ContactsComponent = contactsLayouts[layout.contactsLayout] || ContactsIcons;
  const FooterComponent = footerLayouts[layout.footerLayout] || FooterMinimal;

  return (
    <div 
      className="portfolio-template"
      style={{
        fontFamily: layout.fontFamily || 'system-ui',
        fontSize: `${(layout.fontSizeScale || 1) * 16}px`,
        backgroundColor: layout.backgroundColor || '#F9FAFB',
      }}
    >
      {/* Header Section */}
      <header className="portfolio-header">
        <div className="container">
          {data.pfp && (
            <img 
              src={data.pfp} 
              alt={`${data.firstName} ${data.lastName}`}
              className="portfolio-pfp"
            />
          )}
          <h1 className="portfolio-name">
            {data.firstName} {data.lastName}
          </h1>
          <p className="portfolio-role">{data.currentRole}</p>
          <p className="portfolio-location">{data.location}</p>
          {data.bio && (
            <p className="portfolio-bio">{data.bio}</p>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="portfolio-main container">
        
        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <section className="portfolio-section">
            <h2 className="section-title" style={{ color: layout.primaryColor }}>
              Skills
            </h2>
            <SkillsComponent skills={data.skills} />
          </section>
        )}

        {/* Experience Section */}
        {data.experiences && data.experiences.length > 0 && (
          <section className="portfolio-section">
            <h2 className="section-title" style={{ color: layout.primaryColor }}>
              Experience
            </h2>
            <ExperiencesComponent experiences={data.experiences} />
          </section>
        )}

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <section className="portfolio-section">
            <h2 className="section-title" style={{ color: layout.primaryColor }}>
              Education
            </h2>
            <div className="education-cards">
              {data.education.map((edu, idx) => (
                <Card key={idx} className="education-card">
                  <div className="education-header">
                    <div>
                      <h3>{edu.schoolName}</h3>
                      <p className="education-location">{edu.location}</p>
                    </div>
                    <span className="education-dates">
                      {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}
                    </span>
                  </div>
                  
                  {edu.majors && (
                    <p className="education-field">
                      <strong>Major(s):</strong> {edu.majors.join(', ')}
                    </p>
                  )}
                  
                  {edu.minors && edu.minors.length > 0 && (
                    <p className="education-field">
                      <strong>Minor(s):</strong> {edu.minors.join(', ')}
                    </p>
                  )}
                  
                  {edu.gpa && (
                    <p className="education-field">
                      <strong>GPA:</strong> {edu.gpa}
                    </p>
                  )}
                  
                  {edu.awards && edu.awards.length > 0 && (
                    <div className="education-awards">
                      <h4>Awards:</h4>
                      <ul>
                        {edu.awards.map((award, i) => (
                          <li key={i}>{award}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section (if you have projects data) */}
        {data.projects && data.projects.length > 0 && (
          <section className="portfolio-section">
            <h2 className="section-title" style={{ color: layout.primaryColor }}>
              Projects
            </h2>
            <ProjectsComponent projects={data.projects} />
          </section>
        )}

        {/* Contact Section */}
        <section className="portfolio-section">
          <h2 className="section-title" style={{ color: layout.primaryColor }}>
            Contact
          </h2>
          <ContactsComponent user={data} />
        </section>

        {/* Resume Download */}
        {data.resume && (
          <section className="portfolio-section resume-section">
            <Button 
              label="Download Resume"
              icon="pi pi-download"
              className="p-button-raised"
              style={{ backgroundColor: layout.primaryColor }}
              onClick={() => window.open(data.resume, '_blank')}
            />
          </section>
        )}
      </main>

      {/* Footer */}
      <FooterComponent user={data} />
    </div>
  );
}