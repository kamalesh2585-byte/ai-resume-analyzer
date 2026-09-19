import { TemplateProps, Header, Items, Section } from './template-types';

export function AtsTemplate({ data }: TemplateProps) {
  return <div className="resume-document template-ats">
    <Header data={data} />
    {data.summary && <Section title="Professional Summary"><p>{data.summary}</p></Section>}
    {data.skills.length > 0 && <Section title="Skills"><p>{data.skills.join(', ')}</p></Section>}
    {data.experience.length > 0 && <Section title="Professional Experience"><Items items={data.experience} /></Section>}
    {data.projects.length > 0 && <Section title="Projects"><Items items={data.projects} /></Section>}
    {data.education.length > 0 && <Section title="Education"><Items items={data.education} /></Section>}
    {data.certifications.length > 0 && <Section title="Certifications"><Items items={data.certifications} /></Section>}
    {data.achievements.length > 0 && <Section title="Achievements"><Items items={data.achievements} /></Section>}
    {data.languages.length > 0 && <Section title="Languages"><Items items={data.languages} /></Section>}
  </div>;
}
