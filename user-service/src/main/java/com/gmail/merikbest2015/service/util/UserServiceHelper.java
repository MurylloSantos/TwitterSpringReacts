package com.gmail.merikbest2015.service.util;

import com.gmail.merikbest2015.commons.exception.ApiRequestException;
import com.gmail.merikbest2015.commons.exception.InputFieldException;
import com.gmail.merikbest2015.constants.UserErrorMessage;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.BlockUserRepository;
import com.gmail.merikbest2015.repository.FollowerUserRepository;
import com.gmail.merikbest2015.repository.MuteUserRepository;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.repository.projection.SameFollower;
import com.gmail.merikbest2015.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.List;

@Component
@RequiredArgsConstructor
public class UserServiceHelper {

    @Lazy
    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;
    private final FollowerUserRepository followerUserRepository;
    private final BlockUserRepository blockUserRepository;
    private final MuteUserRepository muteUserRepository;

    public void processInputErrors(BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
    }

    public void validateUserProfile(Long userId) {
        checkIsUserExist(userId);
        Long authUserId = authenticationService.getAuthenticatedUserId();

        if (!userId.equals(authUserId)) {
            checkIsUserBlocked(userId);
            checkIsUserHavePrivateProfile(userId);
        }
    }

    public void checkIsUserExistOrMyProfileBlocked(Long userId) {
        checkIsUserExist(userId);
        checkIsUserBlocked(userId);
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ApiRequestException(String.format(UserErrorMessage.USER_ID_NOT_FOUND, userId), HttpStatus.NOT_FOUND));
    }

    public void checkIsUserExist(Long userId) {
        if (!userRepository.isUserExist(userId)) {
            throw new ApiRequestException(String.format(UserErrorMessage.USER_ID_NOT_FOUND, userId), HttpStatus.NOT_FOUND);
        }
    }

    public void checkIsUserBlocked(Long userId, Long authUserId) {
        if (blockUserRepository.isUserBlocked(userId, authUserId)) {
            throw new ApiRequestException(UserErrorMessage.USER_PROFILE_BLOCKED, HttpStatus.BAD_REQUEST);
        }
    }

    public void checkIsUserBlocked(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();

        if (blockUserRepository.isUserBlocked(userId, authUserId)) {
            throw new ApiRequestException(UserErrorMessage.USER_PROFILE_BLOCKED, HttpStatus.BAD_REQUEST);
        }
    }

    public void checkIsUserHavePrivateProfile(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();

        if (!userRepository.isUserHavePrivateProfile(userId, authUserId)) {
            throw new ApiRequestException(UserErrorMessage.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    public boolean isUserFollowByOtherUser(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return followerUserRepository.isUserFollowByOtherUser(authUserId, userId);
    }

    public boolean isUserBlockedByMyProfile(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return blockUserRepository.isUserBlocked(authUserId, userId);
    }

    public boolean isUserMutedByMyProfile(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return muteUserRepository.isUserMuted(authUserId, userId);
    }

    public boolean isMyProfileBlockedByUser(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return blockUserRepository.isUserBlocked(userId, authUserId);
    }

    public boolean isMyProfileWaitingForApprove(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.isMyProfileWaitingForApprove(userId, authUserId);
    }

    public boolean isMyProfileSubscribed(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.isMyProfileSubscribed(userId, authUserId);
    }

    public List<SameFollower> getSameFollowers(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return followerUserRepository.getSameFollowers(userId, authUserId, SameFollower.class);
    }
}
