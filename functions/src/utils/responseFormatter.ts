import {ResponseFormat} from "../types/Response";

/**
 * Formats a successful API response.
 * @template T - The type of the data being returned.
 * @param {T[]} data - The data to be included in the response.
 * @param {string} message - A success message.
 * @return {ResponseFormat<T>} The formatted response.
 */
export function formatSuccessResponse<T>(
  data: T[],
  message: string
): ResponseFormat<T> {
  return {
    data: data,
    success: true,
    metadata: {
      messages: [
        {
          errorCode: "INFO",
          errorMessage: message,
          field: null,
        },
      ],
    },
  };
}

/**
 * Formats an error API response.
 * @param {string} errorCode - The error code.
 * @param {string} errorMessage - The error message.
 * @return {ResponseFormat<null>} The formatted response.
 */
export function formatErrorResponse(
  errorCode: string,
  errorMessage: string
): ResponseFormat<null> {
  return {
    data: [],
    success: false,
    metadata: {
      messages: [
        {
          errorCode: errorCode,
          errorMessage: errorMessage,
          field: null,
        },
      ],
    },
  };
}
