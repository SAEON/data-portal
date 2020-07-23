export default function () {
  const {
    resourceDescription,
    title,
    authors,
    DOI,
    url,
    abstract,
    subjects,
    publicationYear,
    publisher,
    language,
  } = this

  return `
TY  - ${resourceDescription}
T1  - ${title}
AU  - ${authors}
DO  - ${DOI}
UR  - ${url}
AB  - ${abstract}
${subjects.map(sub => `KW  - ${sub.subject.trim()}`).join('')}PY  - ${publicationYear}
PB  - ${publisher}
LA  - ${language}
ER  - `
}
