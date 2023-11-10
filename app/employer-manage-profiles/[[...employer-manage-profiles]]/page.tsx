import profileList from "../../components/profileList";
import React from "react";
//creates a way to store the types for each part of the profileList
// interface profileData {
//   firstName: string;
//   lastName: string;
//   role: string;
//   image: any;
// }
// //stores profileData into a map that can be parsed through
// interface NameListProps {
//   people: profileData[];
// }

// const NameList: React.FC<NameListProps> = ({ people }) => (
//   <ul>
//     {people.map((person, index) => (
//       <li key={index}>
//         {person.firstName} {person.lastName} - {person.role}
//       </li>
//     ))}
//   </ul>
// );
// //makes an array out of profileData with actual hardcoded values
// const listProfile: React.FC = () => {
//   // Hardcoded array of objects with person details
//   const peopleArray: profileData[] = [
//     { firstName: 'Maddie', lastName: 'Rogers', role: 'Volunteer', image: 'john.jpg' },
//     { firstName: 'Naomi', lastName: 'Eliana', role: 'Manager', image: 'jane.jpg' },
//     // Add more people as needed
//   ];

//   //returns what we want: a list of the hardcoded profileData
//   return (
//     <div>
//       <h1>Profile List</h1>
//       <NameList people={peopleArray} />
//     </div>
//   );
// };

// export default listProfile;

interface profileData {
  firstName: string;
  lastName: string;
  role: string;
  image: string;
}

interface NameListProps {
  people: profileData[];
}

// const profileList = (person: { firstName: any; lastName: any; role: any; imageUrl: any }) => {
//   // Implement your profileList function logic here
//   // console.log(person);
//   // You can use the data to render a profile or perform any other actions
// };

const NameList: React.FC<NameListProps> = ({ people }) => (
  <div>
    
    {people.map((person, index) => (
        <li key={index}>
          {/* {person.firstName} {person.lastName} - {person.role} */}
          <br /> {/* Add a line break between the two lines */}
          {profileList({
            firstName: person.firstName,
            lastName: person.lastName,
            role: person.role,
            imageUrl: person.image,
          })}
        </li>
      ))}
    
  </div>
);

const listProfile: React.FC = () => {
  // Hardcoded array of objects with person details
  const peopleArray: profileData[] = [
    { firstName: 'Maddie', lastName: 'Rogers', role: 'Volunteer', image: 'nothing.jpg' },
    { firstName: 'Naomi', lastName: 'Gillis', role: 'Designer', image: 'jane.jpg' },
    { firstName: 'Eliana', lastName: 'Longoria', role: 'Designer', image: 'jane.jpg' }
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






















// const names = [ 
//   {
//     firstName: "Maddie",
//     lastName: "Rogers",
//     role: "volunteer",
//     image: "image",

//   }
// ]
// return names;
  // {
  //   firstName: "Naomi",
  //   lastName: "Gillis",
  //   role: "volunteer",
  //   image: "image",

  // },
  // {
  //   firstName: "Elliana",
  //   lastName: "Longoria-Valenzuela",
  //   role: "volunteer",
  //   image: "image",

  // }


// for (let i = 0; i < names.length; i++) {
//   const element = names[i];
//   console.log(`Element at index ${i}: ${element}`);
// }


//p to create an array of ProfileList components
  // const namesArray = names.map((info,index) => (
  //   <profileList 
  //   firstName= {info.firstName},
  //   lastName={info.lastName},
  //   role={info.role},
  //   imageUrl={info.image}
  //   />
  // ));

//   return <div>{namesArray}</div>;
// };



// names.map((info) => (
//   <div>
//       for(var i = 0; i < names.length; i++)
//       {
//         var namesArray = profileList({firstName: names[i].firstName, lastName: names[i].lastName, role: names[i].role, imageUrl: names[i].image})
//       }
//   </div>
// ));
//     }
// return nameList;



// function nameList () {
//   for (let i = 0; i < names.length; i++) {
//     const element = names[i];
//     console.log(`Element at index ${i}: ${element}`);
//   }
  
// }
// const names = [ 
//   {
//     firstName: "Maddie",
//     lastName: "Rogers",
//     role: "volunteer",
//     image: "image",

//   },
//   {
//     firstName: "Naomi",
//     lastName: "Gillis",
//     role: "volunteer",
//     image: "image",

//   },
//   {
//     firstName: "Elliana",
//     lastName: "Longoria-Valenzuela",
//     role: "volunteer",
//     image: "image",

//   }
// ]
// arr info = nameList ();
// return nameList;