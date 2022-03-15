import MostFavorite from "./shared/MostFavorite";
import PostContent from "./posts/PostContent";

const Detail = () => {
    const listExp = [
        {
            id:1,
            userid:1,
            authorName:'Minh Hiếu',
            title:'Cảm nhận bản thân về đồ ăn đường phố Hàn Quốc sau chuyến du lịch dài ngày tại xứ sở kim chi',
            description:'Bài viết sẽ phân tích về ưu diểm và nhược điểm chung của các món ăn đường phố tại Hàn Quốc, về tác động của danh sách các món ăn này đối với sức khỏe con người',
            content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            avatar:'https://yt3.ggpht.com/ytc/AKedOLRnTRRXf6mT_gGQUTaCCZeLLc2FUB8lJOFq7CElow=s88-c-k-c0x00ffffff-no-rj',
            type:1,
            totalcalories:null,
            createdAt:'13/3/2022',
            ingredients:[],
            countLike:5,
            usersLike:[1,2,3,4,5]
        },{
            id:1,
            userid:1,
            authorName:'Minh Hiếu',
            title:'Hướng dẫn làm món trứng rán thịt băm',
            description:'đây là công thức 1',
            content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            avatar:'https://yt3.ggpht.com/ytc/AKedOLRnTRRXf6mT_gGQUTaCCZeLLc2FUB8lJOFq7CElow=s88-c-k-c0x00ffffff-no-rj',
            type:2,
            totalcalories:'300kcal',
            createdAt:'13/3/2022',
            ingredients:[
                {name:"trứng gà",quantity:"3 quả"},
                {name:"Thịt lợn băm",quantity:"100 gram"},
                {name:"Hành lá",quantity:"2 cây"},
            ],
            countLike:5,
            usersLike:[1,2,3,4,5]
        }
    ];

    return <div className="container py-5">
        <div className="row">
            <div className="col-md-9">
                <PostContent postContent={listExp[0]}/>
            </div>
            <div className="col-md-3">
                <MostFavorite />
            </div>
        </div>
    </div>
}

export default Detail;