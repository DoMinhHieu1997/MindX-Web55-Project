import PostItem from "./PostItem";

const MostFavorite = () => {
    return <div>
        <h4 className="text-center">Ưa thích nhất</h4>
        <hr className="text-secondary"/>
        <div className="mt-4 row">
            <div><PostItem /></div>
            <div><PostItem /></div>
            <div><PostItem /></div>
        </div>
    </div>
}

export default MostFavorite;