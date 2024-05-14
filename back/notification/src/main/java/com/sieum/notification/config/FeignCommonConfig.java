package com.sieum.notification.config;

import com.sieum.notification.controller.feign.BaseFeignClientPackage;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients(basePackageClasses = BaseFeignClientPackage.class)
public class FeignCommonConfig {}
