import { toast } from "react-toastify";

/**
 * Handles API errors consistently across contexts and components
 * @param {object} err - The error object from Axios
 * @param {function} [setErrors] - Optional setter for inline form errors
 * @param {boolean} [showToast=true] - Whether to display toast notifications
 */
export const handleApiError = (err, setErrors = null, showToast = true) => {
  const errorResponse = err.response?.data;

  // ✅ Handle inline form errors if `setErrors` is provided
  if (errorResponse?.errors && setErrors) {
    setErrors(errorResponse.errors);
    return;
  }

  // ✅ Display individual error messages (if `errors` object exists)
  if (errorResponse?.errors) {
    if (showToast) {
      Object.values(errorResponse.errors).forEach((msg) => toast.error(msg));
    }
    return;
  }

  // ✅ Display a single message (if available)
  if (errorResponse?.message && showToast) {
    toast.error(errorResponse.message);
    return;
  }

  // ✅ Default fallback
  if (showToast) {
    toast.error("Something went wrong. Please try again.");
  }
};
