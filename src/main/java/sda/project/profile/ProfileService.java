package sda.project.profile;

import org.springframework.stereotype.Service;
import sda.project.auth.AuthService;
import sda.project.user.User;
import sda.project.user.UserService;

@Service
public class ProfileService {

    ProfileRepository profileRepository;
    UserService userService;
    AuthService authService;

    public ProfileService(ProfileRepository profileRepository, UserService userService, AuthService authService) {
        this.profileRepository = profileRepository;
        this.userService = userService;
        this.authService = authService;
    }

    public Profile update(Profile profile,Profile updatedProfile)
    {
        profile.setSurName(updatedProfile.getSurName());
        profile.setBio(updatedProfile.getBio());
        profile.setCountryFrom(updatedProfile.getCountryFrom());
        profile.setLiveIn(updatedProfile.getLiveIn());
        profile.setMentorArea(updatedProfile.getMentorArea());
        profile.setMentor(updatedProfile.isMentor());
        return profile;
     }

    public boolean isAuthorized(Profile profile)
    {
        User owner = profile.getOwner();
        User userInSession = userService.findUserByEmail(authService.getLoggedInUserEmail());
        return owner.equals(userInSession);
    }
}
