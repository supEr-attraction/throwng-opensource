package com.sieum.batch.job;

import com.sieum.batch.feign.MusicFeignClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.JobScope;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class UpdatePopularMusic {

    private static final String JOB_NAME = "_UPDATE_POPULAR_MUSIC";
    private static final String BEAN_PREFIX = JOB_NAME + "_";

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final MusicFeignClient musicFeignClient;

    /*@Bean(BEAN_PREFIX + "dateTimeJobParameter")
    @JobScope
    public DateTimeJobParameter dateTimeJobParameter() {
        return new DateTimeJobParameter();
    }*/

    @Bean(JOB_NAME)
    public Job updatePopularMusicJob() {
        return jobBuilderFactory
                .get(JOB_NAME)
                .preventRestart()
                .start(updatePopularMusicStep())
                .build();
    }

    @Bean(BEAN_PREFIX + "step")
    @JobScope
    public Step updatePopularMusicStep() {
        return stepBuilderFactory
                .get(BEAN_PREFIX + "step")
                .tasklet(
                        (contribution, chunkContext) -> {
                            log.info(">>>>> Run Updating popular music");
                            // LocalDateTime time = dateTimeJobParameter().getTime();
                            // List<Event> events =
                            // eventService.closeExpiredEventsEndAtBefore(time);
                            musicFeignClient.popularMusic();
                            log.info(">>>>> successful executions of Updating popular music");
                            return RepeatStatus.FINISHED;
                        })
                .build();
    }
}
