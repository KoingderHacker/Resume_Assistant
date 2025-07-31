// src/components/ResumePreview.tsx

interface ResumeData {
  contact?: {
    name?: string
    email?: string
    phone?: string
    linkedin?: string
    github?: string
    portfolio?: string
  }
  summary?: string
  skills?: string[]
  education?: {
    degree: string
    field_of_study: string
    institution: string
    start_year: string
    end_year: string
  }[]
  experience?: {
    job_title: string
    company: string
    start_date: string
    end_date: string
    description: string
  }[]
  projects?: {
    title: string
    description: string
    technologies: string[]
  }[]
  certifications?: {
    name: string
    issuer: string
    date_earned: string
  }[]
}

export default function ResumePreview({ data }: { data: ResumeData }) {
  if (!data) return null

  return (
    <div className="w-full max-w-4xl mx-auto p-6 mt-4 bg-white rounded shadow border text-sm space-y-6">
      <h2 className="text-xl font-semibold border-b pb-2">📄 Resume Preview</h2>

      {/* Contact Info */}
      {data.contact && (
        <div>
          <h3 className="font-semibold mb-1">👤 Contact Info</h3>
          <ul className="ml-4 list-disc">
            {Object.entries(data.contact).map(([key, value]) =>
              value ? (
                <li key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                  {value}
                </li>
              ) : null
            )}
          </ul>
        </div>
      )}

      {/* Summary */}
      {data.summary && (
        <div>
          <h3 className="font-semibold mb-1">📝 Summary</h3>
          <p className="ml-2 text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div>
          <h3 className="font-semibold mb-1">🛠️ Skills</h3>
          <div className="flex flex-wrap gap-2 ml-2">
            {data.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div>
          <h3 className="font-semibold mb-1">🎓 Education</h3>
          <ul className="ml-4 list-disc">
            {data.education.map((edu, idx) => (
              <li key={idx}>
                <strong>{edu.degree}</strong> in {edu.field_of_study} at{" "}
                {edu.institution} ({edu.start_year} – {edu.end_year})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div>
          <h3 className="font-semibold mb-1">💼 Experience</h3>
          <ul className="ml-4 list-disc">
            {data.experience.map((exp, idx) => (
              <li key={idx}>
                <strong>{exp.job_title}</strong> at {exp.company} (
                {exp.start_date} – {exp.end_date})
                <p className="text-gray-700 ml-2">{exp.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div>
          <h3 className="font-semibold mb-1">🚀 Projects</h3>
          <ul className="ml-4 list-disc">
            {data.projects.map((proj, idx) => (
              <li key={idx}>
                <strong>{proj.title}</strong>: {proj.description}
                <br />
                <span className="text-xs text-gray-500 ml-2">
                  Tech: {proj.technologies.join(", ")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <div>
          <h3 className="font-semibold mb-1">📚 Certifications</h3>
          <ul className="ml-4 list-disc">
            {data.certifications.map((cert, idx) => (
              <li key={idx}>
                <strong>{cert.name}</strong> by {cert.issuer} (
                {cert.date_earned})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
