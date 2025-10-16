import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';

export function ProjectsGallery({ projects }) {
  return (
    <div className="projects-gallery">
      {projects?.map((project, idx) => (
        <div key={idx} className="project-gallery-item">
          {project.image && (
            <img 
              src={project.image} 
              alt={project.name}
              className="project-gallery-image"
            />
          )}
          <div className="project-gallery-overlay">
            <h3 className="project-gallery-title">{project.name}</h3>
            <p className="project-gallery-description">{project.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProjectsCards({ projects }) {
  return (
    <div className="projects-cards">
      {projects?.map((project, idx) => (
        <Card key={idx} className="project-card">
          <h3 className="project-card-title">{project.name}</h3>
          <p className="project-card-description">{project.description}</p>
          {project.technologies && (
            <div className="project-technologies">
              {project.technologies.map((tech, i) => (
                <Chip key={i} label={tech} className="project-tech-chip" />
              ))}
            </div>
          )}
          {project.link && (
            <Button 
              label="View Project" 
              icon="pi pi-arrow-right" 
              iconPos="right"
              link
              onClick={() => window.open(project.link, '_blank')}
            />
          )}
        </Card>
      ))}
    </div>
  );
}