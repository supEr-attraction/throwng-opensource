package com.sieum.user.exception;

public class UnAuthorizedException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public UnAuthorizedException() {
        super("You do not have permission. Try to login again");
    }
}
