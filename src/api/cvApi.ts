export const uploadCV = async (file: File) => {
  const token = localStorage.getItem('access_token');

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://localhost:3000/api/cv/process', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`, // ← gửi token
    },
    body: formData,
  });
  if (!response.ok) throw new Error(`Lỗi: ${response.status}`);
  return response.json();
};