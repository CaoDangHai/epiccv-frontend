// Gửi file PDF/DOC
export const uploadJDFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:3000/api/jd/process", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error(`Lỗi: ${response.status}`);
  return response.json();
};

// Gửi text
export const uploadJDText = async (content: string) => {
  const response = await fetch("http://localhost:3000/api/jd/process", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (!response.ok) throw new Error(`Lỗi: ${response.status}`);
  return response.json();
};
