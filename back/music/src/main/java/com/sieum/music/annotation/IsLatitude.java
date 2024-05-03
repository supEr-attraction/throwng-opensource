package com.sieum.music.annotation;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import com.sieum.music.common.validator.LatitudeValidator;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;

@Target(FIELD)
@Retention(RUNTIME)
@Constraint(validatedBy = LatitudeValidator.class)
public @interface IsLatitude {
    String message() default "Not valid latitude, must be between -90 and 90";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
