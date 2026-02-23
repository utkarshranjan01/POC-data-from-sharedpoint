export const getIcons = (extension: string) => {
  if (extension === "") return "/folder.png";
  if (extension === "word") return "/word.png";
  if (extension === "pdf") return "/pdf.png";
  if (extension === "xls") return "/xls.png";
  return "/folder.png";
};
