import styles from "./ChatMembers.module.css";
import Menu from "@/components/Menu/Menu";
import Image from "@/components/Image/Image";

export default function ChatMembers({ members, selectionHandler }) {
  return (
    <>
      <h3>Members</h3>
      <div className={styles.members}>
        {members.map((member) => {
          if (member.user)
            return (
              <div key={member.user.id} className={styles.member}>
                <Image
                  src={member.user.image}
                  alt={`${member.user.username} picture`}
                />
                <div>
                  <h4>
                    {member.user.username}
                    {member.role === "ADMIN" && <span>ADMIN</span>}
                  </h4>
                </div>
                <Menu selectionHandler={() => selectionHandler(member)} />
              </div>
            );
        })}
      </div>
    </>
  );
}
