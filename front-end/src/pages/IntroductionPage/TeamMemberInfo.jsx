import "./Introduction.css";
import TeamMember from "./TeamMember";
const MeetTheTeam = () => {

    return (
        <div className="MemberCardContainer">
            <div className="Title">
                <h2>Meet The Team</h2>
            </div>
            {TeamMember.map((member, key) => (
                <div key={key} className="MemberCard">
                    <h3>{member.name}</h3>
                    <img
                        className="MemberImage"
                        src={member.imageURL}
                        alt={member.name}
                        onError={(e) => e.target.style.display = 'none'} />
                    <p><strong>Student ID:</strong> {member.studentID}</p>
                    <p><strong>Role:</strong> {member.role}</p>
                </div>
            ))}
        </div>
    );
}
export default MeetTheTeam;