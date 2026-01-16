const getPatiantData = async () => {
  try {
    const res = await fetch(`https://healthcareserver-two.vercel.app/api/v1/patients`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error("Data fetch failed:", err);
    return null;
  }
};

export default getPatiantData;
