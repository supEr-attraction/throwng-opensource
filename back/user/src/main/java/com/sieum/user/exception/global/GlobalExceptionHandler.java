package com.sieum.user.exception.global;

import static com.sieum.user.common.CustomExceptionStatus.*;

import com.sieum.user.exception.BadRequestException;
import com.sieum.user.util.NotificationManagerUtil;
import java.util.Enumeration;
import java.util.Objects;
import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private final NotificationManagerUtil notificationManagerUtil;

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            final MethodArgumentNotValidException e,
            final HttpHeaders headers,
            final HttpStatus status,
            final WebRequest request) {
        log.warn(e.getMessage(), e);

        final String errMessage =
                Objects.requireNonNull(e.getBindingResult().getFieldError()).getDefaultMessage();
        return ResponseEntity.badRequest()
                .body(new ExceptionResponse(INVALID_REQUEST.getCode(), errMessage));
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ExceptionResponse> handleBadRequestException(
            final BadRequestException e, HttpServletRequest req) {
        log.warn(e.getMessage(), e);
        return ResponseEntity.badRequest().body(new ExceptionResponse(e.getCode(), e.getMessage()));
    }

    @ExceptionHandler(value = {ConstraintViolationException.class})
    public ResponseEntity<Object> handleConstraintViolation(
            ConstraintViolationException e, WebRequest request) {
        log.warn(e.getMessage(), e);

        return ResponseEntity.badRequest()
                .body(new ExceptionResponse(INVALID_REQUEST.getCode(), e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleException(
            final Exception e, HttpServletRequest req) {
        log.error(e.getMessage(), e);
        notificationManagerUtil.sendNotification(e, req.getRequestURI(), getParams(req));

        return ResponseEntity.internalServerError()
                .body(
                        new ExceptionResponse(
                                INTERNAL_SERVER_ERROR.getCode(),
                                INTERNAL_SERVER_ERROR.getMessage()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ExceptionResponse> illegalArgumentException(
            IllegalArgumentException e, HttpServletRequest req) {
        logger.error(e.getMessage());
        notificationManagerUtil.sendNotification(e, req.getRequestURI(), getParams(req));
        return ResponseEntity.badRequest()
                .body(new ExceptionResponse(REQUEST_ERROR.getCode(), REQUEST_ERROR.getMessage()));
    }

    private String getParams(HttpServletRequest req) {
        StringBuilder params = new StringBuilder();
        Enumeration<String> keys = req.getParameterNames();
        while (keys.hasMoreElements()) {
            String key = keys.nextElement();
            params.append("- ")
                    .append(key)
                    .append(" : ")
                    .append(req.getParameter(key))
                    .append("/n");
        }

        return params.toString();
    }
}
