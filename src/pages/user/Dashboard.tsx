import ContentArea from "components/user/ContentArea";
import {useAppProvider} from "hooks/useAppProvider";

export default function Dashboard(){
    const {appUser} = useAppProvider()
    return (
        <ContentArea title="Dashboard">
            <div className="my-14">
                <p>Welcome, {appUser?.name}</p>
            </div>
        </ContentArea>
    )
}