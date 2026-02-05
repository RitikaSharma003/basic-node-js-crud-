class ErrorResponse extends Error{
    constructor(messgage,statusCode)
    {
        super(message)
        
            this.statusCode=statusCode;

        
    }
}

export default ErrorResponse;
