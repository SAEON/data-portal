export default {
  title: async ({ metadata: { titles } } = {}) => titles?.[0]?.title || '',
}
