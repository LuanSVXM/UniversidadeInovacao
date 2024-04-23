export const changeMask = (value, mask) => {
  const valueTrim = value.replace(/\D/g, '')

  let resultText = ''
  let inputIndex = 0

  for (let i = 0; i < mask.length; i++) {
    const maskChar = mask[i]
    if (maskChar === '9') {
      if (inputIndex < valueTrim.length) {
        resultText += valueTrim[inputIndex]
        inputIndex++
      } else {
        break
      }
    } else {
      resultText += maskChar
    }
  }

  return resultText
}
