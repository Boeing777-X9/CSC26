export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member" | "user";
  createdAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
