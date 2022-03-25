import BookmarkSharpIcon from '@mui/icons-material/BookmarkSharp';
const SavedPost = () => {
    return (
        <div className="col-md-8 ml-2 border">
            <div className="row">
                <div className="col-12 p-5">
                    <div className="h4">Tin đã lưu</div>
                    <div className="row">
                        <div className="col-10">
                            <div className="py-2 text-truncate">
                                some thing really longgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
                            </div>
                            
                        </div>
                        <div className="col-auto py-2">
                                <BookmarkSharpIcon sx={{ fontSize: 25 }} color="primary" />
                            </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-auto border border-dark rounded-pill lh-lg mt-4">Xem thêm</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavedPost;
