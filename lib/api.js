const API_BASE_URL = process.env.NEXT_PUBLIC_CHAT_API_URL;

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

// This function is no longer used as we want to preserve markdown formatting
// Keeping it for reference or future use
const convertLatexToText = (text) => {
  // Remove LaTeX commands and special characters
  return text
    .replace(/\$\$?/g, '') // Remove $ and $$
    .replace(/\\operatorname{([^}]+)}/g, '$1') // Convert \operatorname{...} to text
    .replace(/\\[a-zA-Z]+/g, '') // Remove other LaTeX commands
    .replace(/{([^}]+)}/g, '$1') // Remove curly braces
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
};

export const chatApi = {
  async sendMessage(message, chatId = null) {
    try {
      console.log('API URL:', `${API_BASE_URL}/chat`);
      console.log('Sending message to API:', { question: message });

      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: message }),
      });

      console.log('API Response status:', response.status);

      let data;
      try {
        data = await response.json();
        console.log('API Response data:', data);
      } catch (e) {
        console.error('Error parsing response:', e);
        throw new ApiError('Invalid response from server', 500);
      }

      if (!response.ok) {
        console.error('API Error Response:', data);
        throw new ApiError(
          data?.message || data?.error || 'Failed to send message',
          response.status
        );
      }

      if (!data) {
        throw new ApiError('Empty response from server', 500);
      }

      // The API returns the answer in the 'answer' field
      const content = data.answer;

      if (!content) {
        throw new ApiError('No answer in response', 500);
      }

      // Return the raw content without modifying LaTeX formatting
      // This allows markdown and LaTeX to be rendered properly by the markdown renderer
      return {
        content: content,
      };
    } catch (error) {
      console.error('API Error:', error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error.message ||
          'Network error occurred. Please check your connection.',
        500
      );
    }
  },
};
