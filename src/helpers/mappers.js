export function mapUser(container, userData) {
  // map user data to store
  container.id = userData.user["id"];
  container.profilePhoto = userData["profile_photo"];
  container.backgroundPhoto = userData["background_photo"];
  container.displayName = userData["display_name"];
  container.bio = userData["bio"];
  container.firstName = userData.user["first_name"];
  container.lastName = userData.user["last_name"];
  container.email = userData.user["email"];
  container.emailValid = userData["email_valid"];
  container.isStaff = userData.user["is_staff"];
  container.isActive = userData.user["is_active"];
}
