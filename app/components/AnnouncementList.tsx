import Announcement from "../components/announcements";
import { FC } from "react";

const AnnouncementList: FC = () => {
  return (

    <div>
      {/* Pass arguments to Announcemnet Component*/}
      <div style={{ paddingBottom: 10 }}>
        <Announcement
          imageUrl="imageUrl"
          senderName="SenderNameThatIsTooLong"
          messageTitle="This is a sample announement title"
          date="1/12/23"
        />
      </div>

      <div style={{ paddingBottom: 10 }}>
        <Announcement
          imageUrl="imageUrl"
          senderName="Carly"
          messageTitle="message Title That Is Way Too Loooooooong"
          date="4/5/16"
        />
      </div>

      <div style={{ paddingBottom: 10 }}>
        <Announcement
          imageUrl="imageUrl"
          senderName="Casa Myrna"
          messageTitle="short title"
          date="12/10/23"
        />
      </div>

      <div style={{ paddingBottom: 10 }}>
        <Announcement
          imageUrl="imageUrl"
          senderName="Taylor Swift"
          messageTitle="Free Eras Tour Tickets"
          date="2/20/24"
        />
      </div>
    </div>
  );
};

export default AnnouncementList;
