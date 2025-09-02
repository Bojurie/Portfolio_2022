import { toast } from "react-toastify";

/**
 * Handles API errors consistently across contexts and components
 * @param {object} err - The error object from Axios
 * @param {function} [setErrors] - Optional setter for inline form errors
 * @param {boolean} [showToast=true] - Whether to display toast notifications
 */
export const handleApiError = (err, setErrors = null, showToast = true) => {
  const errorResponse = err.response?.data;

  if (errorResponse?.errors && setErrors) {
    setErrors(errorResponse.errors);
    return;
  }

  if (errorResponse?.errors) {
    if (showToast) {
      Object.values(errorResponse.errors).forEach((msg) => toast.error(msg));
    }
    return;
  }

  if (errorResponse?.message && showToast) {
    toast.error(errorResponse.message);
    return;
  }

  if (showToast) {
    toast.error("Something went wrong. Please try again.");
  }
};
