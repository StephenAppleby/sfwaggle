export const renderErrors = (error) => {
  return (
    <>{error.summaries.reduce((prev, current) => [...prev, <br />, current])}</>
  )
}
