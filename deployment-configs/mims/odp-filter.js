export default record => {
  const { institution = '', id } = record
  if (institution.toUpperCase() === 'CHIEF DIRECTORATE: OCEANS AND COASTAL RESEARCH') {
    return true
  }

  console.info('Skipping record (not MIMS)', id)
  return false
}
