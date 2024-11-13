package com.gmail.merikbest2015.controller.api;

import com.gmail.merikbest2015.commons.constants.PathConstants;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(value = {"/sql-test/clear-localization-db.sql", "/sql-test/populate-localization-db.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/sql-test/clear-localization-db.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class CountryCodeApiControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("[200] GET /api/v1/localization/phone/code - Is Phone Code Exists")
    public void isPhoneCodeExists() throws Exception {
        mockMvc.perform(get(PathConstants.API_V1_LOCALIZATION + PathConstants.PHONE_CODE, "+374"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(true)));
    }
}
