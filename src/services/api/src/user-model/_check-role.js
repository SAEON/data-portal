export default async ({ userRoles }, role) => userRoles.includes(role._id.toString())
