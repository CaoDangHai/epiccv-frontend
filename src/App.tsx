import React from 'react';
// Import SignIn từ folder bạn đã tạo. Sửa lại đường dẫn tương đối nếu alias '@/' chưa hoạt động
import { SignIn } from './features/auth/components/SignIn';

function App() {
  return (
    // Render thẳng màn hình SignIn ra để test
    <SignIn />
  );
}

export default App;