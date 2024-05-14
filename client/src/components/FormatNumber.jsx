import React from "react"

const FormatNumber = ({ count }) => {
  const floatCount = parseFloat(count)

  const BILLION = 1e9
  const MILLION = 1e6
  const THOUSAND = 1e3

  let formattedNumber

  if (floatCount >= BILLION) {
    const result = floatCount / BILLION
    formattedNumber = (floatCount % BILLION === 0)
      ? `${result}b`
      : `${result.toFixed(2)}b`
  } else if (floatCount >= MILLION) {
    const result = floatCount / MILLION
    formattedNumber = (floatCount % MILLION === 0)
      ? `${result}m`
      : `${result.toFixed(2)}m`
  } else if (floatCount >= THOUSAND) {
    const result = floatCount / THOUSAND
    formattedNumber = (floatCount % THOUSAND === 0)
      ? `${result}k`
      : `${result.toFixed(2)}k`
  } else {
    formattedNumber = floatCount.toString()
  }

  return <p className="text-sm">{formattedNumber}</p>
}

export default FormatNumber
