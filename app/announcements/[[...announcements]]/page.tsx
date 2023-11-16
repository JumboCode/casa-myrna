import SideNav from "@/app/components/sidebar"
import announcements from "../../components/announcements"


interface announcement {
    senderName: string;
    senderEmail: string;
    messageTitle: string;
    imageUrl: string;
    date: string; 
  }
  
  interface NameListProps {
    people: announcement[];
  }
  
  const NameList: React.FC<NameListProps> = ({ people }) => (
    <div>
      
      {people.map((person, index) => (
          <li key={index}>
            <br /> {/* Add a line break between the two lines */}
            {announcements({
              senderName: person.senderName,
              senderEmail: person.senderEmail,
              messageTitle: person.messageTitle,
              imageUrl: person.imageUrl,
              date: person.date,
            })}
          </li>
        ))}
      
    </div>
  );
  
  const listProfile: React.FC = () => {
    // Hardcoded array of objects with person details
    const peopleArray: announcement[] = [
      { senderName: 'Carly', senderEmail: 'carly@gmail.com', messageTitle: 'hi', imageUrl: 'nothing.jpg',date: '06/14/2005' },
      { senderName: 'Naomi', senderEmail: 'naomi@yahoo.com', messageTitle: 'greetings', imageUrl: 'jane.jpg', date: '04/16/2004' },
      { senderName: 'Eliana', senderEmail: 'eliana@hotmail.com', messageTitle: 'WASSSSUUUUP', imageUrl: 'jane.jpg', date: '11/15/2023' }
      // Add more people as needed
    ];
  
    return (
      <div>
        {/* Rendering NameList component with the hardcoded array of people */}
        <NameList people={peopleArray} />
      </div>
    );
  };
    
  export default listProfile;
  
  
  
  
  
  
  
  
  
  
  