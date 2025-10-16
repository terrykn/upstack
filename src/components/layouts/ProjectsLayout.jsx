export function ProjectsGallery({ projects }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects?.map((project, idx) => (
        <div key={idx} className="group relative overflow-hidden rounded-lg shadow-lg">
          {project.image && (
            <img 
              src={project.image} 
              alt={project.name}
              className="w-full h-64 object-cover transition-transform group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-white text-xl font-bold">{project.name}</h3>
            <p className="text-gray-200 text-sm">{project.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProjectsCards({ projects }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects?.map((project, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-bold mb-3">{project.name}</h3>
          <p className="text-gray-600 mb-4">{project.description}</p>
          {project.technologies && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          )}
          {project.link && (
            <a href={project.link} className="text-blue-600 hover:underline">
              View Project →
            </a>
          )}
        </div>
      ))}
    </div>
  );
}