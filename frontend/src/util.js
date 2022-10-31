export const renderErrors = (error) => {
  return (
    <>{error.summaries.reduce((prev, current) => [...prev, <br />, current])}</>
  )
}

export const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1)
