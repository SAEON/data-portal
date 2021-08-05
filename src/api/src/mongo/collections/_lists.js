export default {
  name: 'lists',
  indices: [
    {
      index: 'hashedSearch',
      options: {
        unique: true,
      },
    },
  ],
}
