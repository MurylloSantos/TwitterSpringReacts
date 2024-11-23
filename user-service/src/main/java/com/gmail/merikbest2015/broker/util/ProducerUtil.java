package com.gmail.merikbest2015.broker.util;

import com.gmail.merikbest2015.commons.constants.HeaderConstants;
import lombok.experimental.UtilityClass;
import org.apache.kafka.clients.producer.ProducerRecord;

@UtilityClass
public class ProducerUtil {

    public static <V> ProducerRecord<String, V> authHeaderWrapper(String topic, V event, Long authUserId) {
        ProducerRecord<String, V> producerRecord = new ProducerRecord<>(topic, event);
        producerRecord.headers().add(HeaderConstants.AUTH_USER_ID_HEADER, authUserId.toString().getBytes());
        return producerRecord;
    }
}
