package com.sieum.quiz.service;

import com.google.gson.Gson;
import com.sieum.quiz.dto.response.MattermostMessageResponse;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
public class MattermostSenderService {

    private static final String PROPERTIES_PATH = "${notification.mattermost.";

    private final RestTemplate restTemplate;

    protected final boolean mmEnabled;

    protected final String webhookUrl;

    protected final String channel;

    protected final String color;

    protected final String authorName;

    protected final String authorIcon;

    protected final String footer;

    public MattermostSenderService(
            @Value(PROPERTIES_PATH + "enabled}") final boolean mmEnabled,
            @Value(PROPERTIES_PATH + "webhook-url}") final String webhookUrl,
            @Value(PROPERTIES_PATH + "channel}") final String channel,
            @Value(PROPERTIES_PATH + "author-name}") final String authorName,
            @Value(PROPERTIES_PATH + "author-icon}") final String authorIcon) {
        this.mmEnabled = mmEnabled;
        this.webhookUrl = webhookUrl;
        this.channel = channel;
        this.color = "#FF0000";
        this.authorName = authorName;
        this.authorIcon = authorIcon;
        this.footer = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        this.restTemplate = new RestTemplate();
    }

    public void sendMessage(Exception excpetion, String uri, String params) {
        if (!mmEnabled) return;

        try {
            MattermostMessageResponse.Attachment attachment =
                    MattermostMessageResponse.Attachment.builder()
                            .channel(this.channel)
                            .authorIcon(this.authorIcon)
                            .authorName(this.authorName)
                            .color(this.color)
                            .text("")
                            .footer(this.footer)
                            .build();

            attachment.addExceptionInfo(excpetion, uri, params);
            MattermostMessageResponse.Attachments attachments =
                    new MattermostMessageResponse.Attachments(attachment);
            attachments.addProps(excpetion);
            String payload = new Gson().toJson(attachments);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-type", MediaType.APPLICATION_JSON_VALUE);

            HttpEntity<String> entity = new HttpEntity<>(payload, headers);
            restTemplate.postForEntity(webhookUrl, entity, String.class);

        } catch (Exception e) {
            log.error("#### ERROR!! Notification Manager : {}", e.getMessage());
        }
    }
}
