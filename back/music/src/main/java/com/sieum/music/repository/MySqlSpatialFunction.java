package com.sieum.music.repository;

import static com.querydsl.core.types.dsl.Expressions.stringTemplate;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.StringTemplate;
import org.locationtech.jts.geom.Point;

public class MySqlSpatialFunction {
    public static StringTemplate mySqlDistanceSphereFunction(
            Expression<? extends Point> point1, Point point2) {
        return stringTemplate("ST_Distance_Sphere({0}, {1})", point1, point2);
    }
}
