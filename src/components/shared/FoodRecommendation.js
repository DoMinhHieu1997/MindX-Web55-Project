import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import TextField from '@mui/material/TextField';

const FoodRecommendation = () => {
    return <div className="position-fixed start-0 top-0 bottom-0 end-0  z-index-3" style={{backgroundColor:"rgba(0,0,0,.4)"}}>
        <div className="h-100 w-100 position-relative">
            <div className="col-6 col-sm-9 col-md-5 mx-auto bg-light p-3 mt-5 border rounded">
                <div className="d-flex align-items-center">
                    <ContentPasteSearchIcon/>
                    <h5 class="mb-0 ms-2">Gợi ý món ăn</h5>
                </div>
                <div className="mt-4">
                    <div className="position-relative">
                        <TextField id="filled-basic" label="Nguyên liệu" variant="filled" className="w-100"/>
                        <div className="position-absolute top-50 end-0 translate-middle-y me-2">
                            <FindInPageOutlinedIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default FoodRecommendation;