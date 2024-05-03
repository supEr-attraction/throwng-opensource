package com.sieum.user.service;

import static com.sieum.user.common.CustomExceptionStatus.FAIL_TO_GENERATE_RANDOM_NICKNAME;

import com.sieum.user.domain.User;
import com.sieum.user.domain.UserHistory;
import com.sieum.user.domain.enums.Level;
import com.sieum.user.domain.enums.Violation;
import com.sieum.user.exception.AuthException;
import com.sieum.user.infrastructure.JwtProvider;
import com.sieum.user.infrastructure.oauthprovider.OauthProvider;
import com.sieum.user.infrastructure.oauthprovider.OauthProviders;
import com.sieum.user.infrastructure.oauthuserinfo.OauthUserInfo;
import com.sieum.user.repository.UserHistoryRepository;
import com.sieum.user.repository.UserRepository;
import com.sieum.user.util.RandomNicknameUtil;
import com.sieum.user.util.RedisUtil;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class LoginService {

    private static final int MAX_TRY_COUNT = 5;
    private static final int FOUR_DIGIT_RANGE = 10000;

    private final OauthProviders oauthProviders;
    private final UserRepository userRepository;
    private final RedisUtil redisUtil;
    private final JwtProvider jwtProvider;
    private final UserHistoryRepository userHistoryRepository;

    public User login(final String providerName, final String code) {
        final OauthProvider provider = oauthProviders.mapping(providerName);
        final OauthUserInfo oauthUserInfo = provider.getUserInfo(code);
        return findOrCreateMember(
                providerName, oauthUserInfo.getSocialLoginId(), oauthUserInfo.getNickname());
    }

    private User findOrCreateMember(
            final String providerName, final String socialLoginId, final String nickname) {
        return userRepository
                .findBySocialId(socialLoginId)
                .orElseGet(() -> createUser(providerName, socialLoginId, nickname, true));
    }

    private User createUser(
            final String providerName,
            final String socialLoginId,
            final String nickName,
            final boolean isSignIn) {
        int tryCount = 0;
        while (tryCount < MAX_TRY_COUNT) {
            final String nicknameWithRandom = RandomNicknameUtil.getRamdomNinkname();
            if (!userRepository.existsByNickName(nicknameWithRandom)) {
                return userRepository.save(
                        User.builder()
                                .socialId(socialLoginId)
                                .platform(providerName)
                                .name(nickName)
                                .nickName(nicknameWithRandom)
                                .level(Level.EARPHONES.getValue())
                                .violation(Violation.NONE.getValue())
                                .isSignIn(isSignIn)
                                .build());
            }
            tryCount += 1;
        }
        throw new AuthException(FAIL_TO_GENERATE_RANDOM_NICKNAME);
    }

    public void logout(String accessToken) {
        redisUtil.deleteData(jwtProvider.getUserId(accessToken));
    }

    public long getUsername(String accessToken) {
        String userId = jwtProvider.getUserId(accessToken);
        return userRepository.findBySocialId(userId).get().getId();
    }

    public void saveLogOnLogin(UserHistory userHistory) {
        userHistoryRepository.save(userHistory);
    }
}
