export default function () {
  return `
TY  - ${this.resourceDescription}
T1  - ${this.title}
AU  - ${this.author}
DO  - ${this.DOI}
UR  - ${this.url}
AB  - ${this.abstract}
${this.subjects
  .map(
    sub => `KW  - ${sub.subject.trim()}
`
  )
  .join('')}PY  - ${this.publicationYear}
PB  - ${this.publisher}
LA  - ${this.language}
ER  - `
}
