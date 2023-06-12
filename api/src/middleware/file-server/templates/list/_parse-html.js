/**
 * Users can save lists with HTML in the description
 *
 * This is shown correctly on the title in the UI,
 * but needs to be stripped when added to the .html
 * file as that MUST be plain text
 */

export default description => description.replace(/<[^>]*>?/gm, '')
