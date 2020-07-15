export const formattingData = (data) => {
  let res = {}
  data.map((value, index, arr) => {
    if (index % 2 == 0) {
      res[value] = arr[index + 1]
    }
  })
  return res
}