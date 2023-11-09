import profileList from "../../components/profileList"
import React from "react"
const names = [ 
  {
    name: "Maddy",
    lastName: "Rogers",
    role: "volunteer",
    image: "image",

  },
  {
    name: "Naomi",
    lastName: "Gillis",
    role: "volunteer",
    image: "image",

  },
  {
    name: "Elliana",
    lastName: "Longoria-Valenzuela",
    role: "volunteer",
    image: "image",

  }
]
// export default function Page(any: hello) {
//   return hello 
// }
console.log(
<div>
    for(var i = 0; i < names.length; i++)
      {
        var x = profileList({firstName: names[i].name, lastName: names[i].lastName, role: names[i].role, imageUrl: names[i].image});
      }
  </div>
)
return ()
