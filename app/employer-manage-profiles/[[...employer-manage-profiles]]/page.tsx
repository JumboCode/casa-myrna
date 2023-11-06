import profileList from "../../components/profileList"

export default function Page() {
  return profileList({firstName: "N", lastName: "P", role: "volunteer", imageUrl: "image"});
}