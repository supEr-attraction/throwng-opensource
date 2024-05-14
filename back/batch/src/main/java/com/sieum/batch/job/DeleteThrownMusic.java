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
public class DeleteThrownMusic {
    private static final String JOB_NAME = "_DELETE_MUSIC";
    private static final String BEAN_PREFIX = JOB_NAME + "_";

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    // private final ThrowItemAdaptor throwItemAdaptor;
    private final MusicFeignClient musicFeignClient;

    /*@Bean(BEAN_PREFIX + "dateTimeJobParameter")
    @JobScope
    public DateTimeJobParameter dateTimeJobParameter() {
        return new DateTimeJobParameter();
    }*/

    @Bean(JOB_NAME)
    public Job eventCreateJob() {
        return jobBuilderFactory.get(JOB_NAME).preventRestart().start(eventCreationStep()).build();
    }

    @Bean("NONE")
    public Job eventNoneJob() {
        return jobBuilderFactory.get("NONE").preventRestart().start(eventCreationStep()).build();
    }

    @Bean("_NONE" + "step")
    @JobScope
    public Step noneStep() {
        return stepBuilderFactory
                .get(BEAN_PREFIX + "step")
                .tasklet(
                        (contribution, chunkContext) -> {
                            log.info("none job");
                            return RepeatStatus.FINISHED;
                        })
                .build();
    }

    @Bean(BEAN_PREFIX + "step")
    @JobScope
    public Step eventCreationStep() {
        return stepBuilderFactory
                .get(BEAN_PREFIX + "step")
                .tasklet(
                        (contribution, chunkContext) -> {
                            log.info(">>>>> Run Deleting thrown music");
                            // LocalDateTime time = dateTimeJobParameter().getTime();
                            // List<Event> events =
                            // eventService.closeExpiredEventsEndAtBefore(time);
                            final long successCount = musicFeignClient.deleteNotFamousMusic();
                            log.info(
                                    ">>>>> {} successful executions of throwing music deletion",
                                    successCount);
                            return RepeatStatus.FINISHED;
                        })
                .build();
    }
}
