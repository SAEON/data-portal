var _share = {
  uri: undefined,
  params: undefined,
}

export const getShareLink = () => _share

export const setShareLink = link => (_share = link)
