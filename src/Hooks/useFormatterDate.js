const useFormatterDate = () => {
  const formatter = new Intl.DateTimeFormat("es-Es", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  });
  return formatter;
};export default useFormatterDate;