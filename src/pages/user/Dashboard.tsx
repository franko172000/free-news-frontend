import ContentArea from "components/user/ContentArea";
import {useAuthUser} from "hooks/useAuthUser";

export default function Dashboard(){
    const {appUser} = useAuthUser()
    return (
        <ContentArea title="Dashboard">
            <div className="my-14">
                <p>Welcome, {appUser?.name}</p>
            </div>
        </ContentArea>
    )
}