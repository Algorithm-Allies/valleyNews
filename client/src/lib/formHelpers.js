export const PROHIBITED_PASSWORDS = [
  "password",
  "123",
  "1234",
  "12345",
  "123456",
];
export function formValidationErrorResponse({ data, message }) {
  throw new Response(
    JSON.stringify({
      data,
      message,
    }),
    { status: 400 }
  );
}

export function sanitizeFormData(formData) {
  return Array.from(formData).map(([key, value]) => [key, value.trim()]);
}
