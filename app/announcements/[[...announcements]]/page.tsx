import SideNav from "@/app/components/sidebar"
import announcements from "../../components/announcements"

export default function Home()
{
    return announcements({senderName:"Carly", senderEmail:"carly@gmail.com", messageTitle:"hi", imageUrl:"image", date:"11/15"})
}
