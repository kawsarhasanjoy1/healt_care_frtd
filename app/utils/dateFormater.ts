export const dateFormatter = (value: string) => {
  const date = new Date(value);
  
  // UTC মেথডগুলো ব্যবহার করুন যাতে লোকাল টাইমজোনের প্রভাব না পড়ে
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};