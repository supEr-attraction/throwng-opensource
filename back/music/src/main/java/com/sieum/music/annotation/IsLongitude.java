package com.sieum.music.annotation;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import com.sieum.music.common.validator.LongitudeValidator;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;

@Target(FIELD)
@Retention(RUNTIME)
@Constraint(validatedBy = LongitudeValidator.class)
public @interface IsLongitude {

    String message() default "Not valid longitude, must be between -180 and 180";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
