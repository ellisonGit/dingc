package com.hnjca.wechat;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.scheduling.annotation.EnableScheduling;


@EnableScheduling//启动定时任务配置


@SpringBootApplication
public class DingCApplication extends SpringBootServletInitializer{

    public static void main(String[] args)  {
        SpringApplication.run(DingCApplication.class, args);

    }


 /*   @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {

        System.out.println("———————启动——————!");
        return application.sources(DingCApplication.class);
    }*/
}

