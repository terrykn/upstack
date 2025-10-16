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
      className="min-h-screen"
      style={{
        fontFamily: layout.fontFamily || 'system-ui',
        fontSize: `${(layout.fontSizeScale || 1) * 16}px`,
        backgroundColor: layout.backgroundColor || '#F9FAFB',
      }}
    >
      {/* Header Section */}
      <header className="bg-white shadow-sm py-12">
        <div className="container mx-auto px-4 text-center">
          {data.pfp && (
            <img 
              src={data.pfp} 
              alt={`${data.firstName} ${data.lastName}`}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
            />
          )}
          <h1 className="text-4xl font-bold mb-2">
            {data.firstName} {data.lastName}
          </h1>
          <p className="text-xl text-gray-600 mb-2">{data.currentRole}</p>
          <p className="text-gray-500">{data.location}</p>
          {data.bio && (
            <p className="mt-4 text-gray-700 max-w-2xl mx-auto">{data.bio}</p>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-16">
        
        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6" style={{ color: layout.primaryColor }}>
              Skills
            </h2>
            <SkillsComponent skills={data.skills} />
          </section>
        )}

        {/* Experience Section */}
        {data.experiences && data.experiences.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6" style={{ color: layout.primaryColor }}>
              Experience
            </h2>
            <ExperiencesComponent experiences={data.experiences} />
          </section>
        )}

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6" style={{ color: layout.primaryColor }}>
              Education
            </h2>
            <div className="space-y-6">
              {data.education.map((edu, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">{edu.schoolName}</h3>
                      <p className="text-gray-600">{edu.location}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}
                    </span>
                  </div>
                  
                  {edu.majors && (
                    <p className="mb-2">
                      <span className="font-semibold">Major(s):</span> {edu.majors.join(', ')}
                    </p>
                  )}
                  
                  {edu.minors && edu.minors.length > 0 && (
                    <p className="mb-2">
                      <span className="font-semibold">Minor(s):</span> {edu.minors.join(', ')}
                    </p>
                  )}
                  
                  {edu.gpa && (
                    <p className="mb-2">
                      <span className="font-semibold">GPA:</span> {edu.gpa}
                    </p>
                  )}
                  
                  {edu.awards && edu.awards.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Awards:</h4>
                      <ul className="list-disc list-inside text-gray-600">
                        {edu.awards.map((award, i) => (
                          <li key={i}>{award}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section (if you have projects data) */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6" style={{ color: layout.primaryColor }}>
              Projects
            </h2>
            <ProjectsComponent projects={data.projects} />
          </section>
        )}

        {/* Contact Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6" style={{ color: layout.primaryColor }}>
            Contact
          </h2>
          <ContactsComponent user={data} />
        </section>

        {/* Resume Download */}
        {data.resume && (
          <section className="text-center">
            <a 
              href={data.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              style={{ backgroundColor: layout.primaryColor }}
            >
              Download Resume
            </a>
          </section>
        )}
      </main>

      {/* Footer */}
      <FooterComponent user={data} />
    </div>
  );
}