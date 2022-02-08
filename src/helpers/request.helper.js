
export const callAPI = async (url, requestOptions) => {
  return fetch(url, requestOptions)
    .then((response) => {
      response.json()
    })
}