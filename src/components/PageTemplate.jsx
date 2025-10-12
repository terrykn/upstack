import React from "react";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";

export default function PageTemplate({ data }) {
  if (!data) return null;

  const name = `${data.firstName || ""} ${data.lastName || ""}`.trim();

  return (
    <div className="container">
      {/* Hero */}
      <section id="hero" className="section hero">
        {data.pfp ? (
          <Avatar image={data.pfp} alt={`${name} profile`} shape="circle" size="xlarge" className="profile-img" />
        ) : (
          <Avatar label={name.split(" ")[0] || "U"} shape="circle" size="xlarge" className="profile-img" />
        )}

        <div>
          <h1 className="text-3xl font-bold">{name}</h1>
          {data.currentRole && <p className="text-lg">{data.currentRole}</p>}
          {data.location && <p className="text-sm text-gray-500">{data.location}</p>}
          <div className="mt-2">
            {Array.isArray(data.links) && data.links.map((l, i) => (
              <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" className="inline-block mr-2">
                <Tag value={l.platform} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <h2 className="section-title">About</h2>
        <div className="section-content">
          <Card>
            <p>{data.bio || "No bio available."}</p>
            {data.resume && (
              <div className="mt-4">
                <Button label="View Resume" icon="pi pi-file" onClick={() => window.open(data.resume, "_blank")} />
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <h2 className="section-title">Projects</h2>
        <div className="section-content">
          {Array.isArray(data.projects) && data.projects.length > 0 ? (
            data.projects.map((p, i) => (
              <Card key={i} title={p.title} subTitle={p.link} className="mb-3">
                {p.description && <p>{p.description}</p>}
                {p.link && (
                  <Button className="mt-2" label="Open" icon="pi pi-external-link" onClick={() => window.open(p.link, "_blank")} />
                )}
              </Card>
            ))
          ) : (
            <p className="text-gray-500">No projects listed.</p>
          )}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="section">
        <h2 className="section-title">Experience</h2>
        <div className="section-content">
          {Array.isArray(data.experiences) && data.experiences.length > 0 ? (
            data.experiences.map((exp, i) => (
              <Card key={i} className="mb-3">
                <h3 className="font-semibold">{exp.position} <span className="text-sm text-gray-600">@ {exp.companyName}</span></h3>
                <div className="text-sm text-gray-600">{exp.startDate} - {exp.endDate || "Present"}</div>
                {exp.description && <p className="mt-2">{exp.description}</p>}
              </Card>
            ))
          ) : (
            <p className="text-gray-500">No experience listed.</p>
          )}
        </div>
      </section>

      {/* Education */}
      <section id="education" className="section">
        <h2 className="section-title">Education</h2>
        <div className="section-content">
          {Array.isArray(data.education) && data.education.length > 0 ? (
            data.education.map((edu, i) => (
              <Card key={i} className="mb-3">
                <h3 className="font-semibold">{edu.schoolName}</h3>
                <div className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</div>
                {edu.degree && <div className="mt-2">{edu.degree}</div>}
              </Card>
            ))
          ) : (
            <p className="text-gray-500">No education listed.</p>
          )}
        </div>
      </section>
    </div>
  );
}
