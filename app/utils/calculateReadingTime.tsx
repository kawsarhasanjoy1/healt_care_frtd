const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200; 
  const cleanContent = content.replace(/<[^>]*>/g, ""); 
  const words = cleanContent.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time.toLocaleString('bn-BD');
};

export default calculateReadingTime