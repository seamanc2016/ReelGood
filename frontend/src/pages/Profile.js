//Import stuff here
import MyFavoriteList from "../../src/components/favoriteslist/FavoritesList"
import AccountInfo from "../components/accountinfo/AccountInfo";

function Profile() {

    return (
        <>
            <MyFavoriteList />
            {/*Put stuff here */}
            <AccountInfo/>
        </>
    )
}

export default Profile;