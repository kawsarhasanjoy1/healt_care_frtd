const useBlog = async () => {
  try {
    const res = await fetch(`https://healthcareserver-two.vercel.app/api/v1/blogs/public-all-blog`, {
      next: {
        revalidate: 30,
      },
    });
    if (!res?.ok) return null;
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export default useBlog;
