export const uploadCV = async (file: File) => {

  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch('http://localhost:3000/api/cv/process', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error(`Lỗi: ${response.status}`);
  return response.json();
};