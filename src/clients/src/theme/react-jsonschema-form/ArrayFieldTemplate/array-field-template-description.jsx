export default ({ DescriptionField, idSchema, description }) => {
  if (!description) {
    return null
  }

  const id = `${idSchema.$id}__description`
  return <DescriptionField id={id} description={description} />
}
