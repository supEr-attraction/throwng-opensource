package com.sieum.music.common.validator;

import com.sieum.music.annotation.IsLongitude;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class LongitudeValidator implements ConstraintValidator<IsLongitude, Double> {
    private static final double MIN_LONGITUDE = -180;
    private static final double MAX_LONGITUDE = 180;

    @Override
    public boolean isValid(Double value, ConstraintValidatorContext context) {
        return value == null || !(value < MIN_LONGITUDE) && !(value > MAX_LONGITUDE);
    }
}
