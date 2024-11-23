package com.gmail.merikbest2015.controller.api;

import com.gmail.merikbest2015.commons.constants.HeaderConstants;
import com.gmail.merikbest2015.commons.constants.PathConstants;
import com.gmail.merikbest2015.commons.util.TestConstants;
import com.gmail.merikbest2015.constants.UserErrorMessage;
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
@Sql(value = {"/sql-test/clear-user-db.sql", "/sql-test/populate-user-db.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/sql-test/clear-user-db.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class AuthenticationApiControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("[200] GET /api/v1/auth/user/test2015@test.test - Get user principal by email")
    public void getUserPrincipalByEmail() throws Exception {
        mockMvc.perform(get(PathConstants.API_V1_AUTH + PathConstants.USER_EMAIL, "test2015@test.test")
                        .header(HeaderConstants.AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(TestConstants.USER_ID))
                .andExpect(jsonPath("$.email").value(TestConstants.USER_EMAIL))
                .andExpect(jsonPath("$.activationCode").isEmpty());
    }

    @Test
    @DisplayName("[404] GET /api/v1/auth/user/test9999@test.test - Should user principal Not Found by email")
    public void getUserPrincipalByEmail_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(PathConstants.API_V1_AUTH + PathConstants.USER_EMAIL, "test9999@test.test")
                        .header(HeaderConstants.AUTH_USER_ID_HEADER, TestConstants.USER_ID))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(UserErrorMessage.USER_NOT_FOUND)));
    }
}
