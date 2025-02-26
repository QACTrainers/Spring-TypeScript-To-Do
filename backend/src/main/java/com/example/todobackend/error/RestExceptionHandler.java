package com.example.todobackend.error;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    protected ResponseEntity<Object> handleResourceNotFound(ResourceNotFoundException ex) {
        ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
        apiError.setMessage(ex.getMessage());
        return buildResponseEntity(apiError);
    }

    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(
            HttpRequestMethodNotSupportedException ex, 
            HttpHeaders headers, 
            HttpStatusCode status, 
            WebRequest request) {
        ApiError apiError = new ApiError(HttpStatus.METHOD_NOT_ALLOWED);
        apiError.setMessage("The requested HTTP method is not supported for this endpoint");
        apiError.setDebugMessage(ex.getMessage());
        return buildResponseEntity(apiError);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    protected ResponseEntity<Object> handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex) {
        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST);
        apiError.setMessage(String.format("The parameter '%s' with value '%s' could not be converted to type '%s'", 
            ex.getName(), ex.getValue(), ex.getRequiredType().getSimpleName()));
        apiError.setDebugMessage(ex.getMessage());
        return buildResponseEntity(apiError);
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<Object> handleAllExceptions(Exception ex) {
        ApiError apiError = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR);
        apiError.setMessage("An unexpected error occurred");
        apiError.setDebugMessage(ex.getMessage());
        return buildResponseEntity(apiError);
    }

    private ResponseEntity<Object> buildResponseEntity(ApiError apiError) {
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }
}
