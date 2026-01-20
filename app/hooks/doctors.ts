

export const getDoctorsData = async () => {
  try {
    const res = await fetch(
      `http://localhost:4000/api/v1/doctors`,
      {
        next: { revalidate: 30 },
      }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error("Data fetch failed:", err);
    return null;
  }
};


export const getDoctorData = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:4000/api/v1/doctors/${id}`,
      {
        next: { revalidate: 30 },
      }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error("Data fetch failed:", err);
    return null;
  }
};

