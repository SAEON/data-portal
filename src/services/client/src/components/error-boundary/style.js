export default theme => ({
  errorBlock: {
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.grey[200]}`,
    whiteSpace: 'break-spaces',
    wordBreak: 'break-all',
    padding: theme.spacing(1),
  },
})
