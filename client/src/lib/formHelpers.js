export const PROHIBITED_PASSWORDS = [
  "password",
  "123",
  "1234",
  "12345",
  "123456",
];

const TEST_PASSWORDS = [
  "MyStrongPassword123!",
  "SecureP@ssw0rd123",
  "P@ssw0rd123456!",
  "Qwerty!12345",
  "!Password123456",
  "LongerPassword1234567890!",
];

export function validatePassword(password) {
  /* 
    Password must contain a uppercase letter, a lowercase letter, a number, a special character, and be atleast 12 characters long
  */
  if (
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{12,}$/.test(password) === false
  ) {
    return {
      valid: false,
      message: [
        "A password must contain the following",
        "At least 12 characters",
        "Lowercase letter (a-z)",
        "Uppercase letter (A-Z)",
        "Numbers (0-9)",
        "Special Characters (e.g !@#$%^&*)",
      ],
    };
  }
  // prevents the use of prohibited passwords
  if (
    PROHIBITED_PASSWORDS.some((badPassword) =>
      password.toLowerCase().includes(badPassword)
    )
  ) {
    return {
      valid: false,
      message: [
        "A password can't contain the following sequence regardless of case",
        ...PROHIBITED_PASSWORDS,
      ],
    };
  }
  return { valid: true, message: null };
}

export function formValidationErrorResponse({ data, message }) {
  throw new Response(
    JSON.stringify({
      data,
      message,
    }),
    { status: 400 }
  );
}

/*
    Going through the form entries and removing any extra whitespace.  Gets rid of some edge cases
      From client: formData: [["password", "     password1234556 "]]
      after trimming whitespace: [["password", "password1234556"]]
  */
export function sanitizeFormData(formData) {
  return Array.from(formData).map(([key, value]) => [key, value.trim()]);
}
