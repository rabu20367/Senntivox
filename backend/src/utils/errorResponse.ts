class ErrorResponse extends Error {
  statusCode: number;
  data: any;

  constructor(message: string, statusCode: number, data?: any) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;

    // Ensure the correct prototype is set for instanceof checks
    Object.setPrototypeOf(this, ErrorResponse.prototype);
  }

  // Format the error response
  toJSON() {
    return {
      success: false,
      message: this.message,
      statusCode: this.statusCode,
      data: this.data,
      stack: process.env.NODE_ENV === 'development' ? this.stack : undefined,
    };
  }
}

export { ErrorResponse };
export default ErrorResponse;
