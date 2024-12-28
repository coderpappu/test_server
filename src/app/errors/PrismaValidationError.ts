class PrismaClientValidationError extends Error {
  statusCode: number;
  prismaCode: string;
  message: string;

  constructor(statusCode: number, message: string, prismaCode: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.prismaCode = prismaCode;
  }
}

export default PrismaClientValidationError;
