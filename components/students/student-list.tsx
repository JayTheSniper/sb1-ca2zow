// Update the handleViewProfile function in StudentList component
const handleViewProfile = (username: string) => {
  router.push(`/profile/${username}`);
};

// Update the Button onClick handler
<Button 
  className="flex-1"
  onClick={() => handleViewProfile(student.username)}
>
  View Profile
</Button>