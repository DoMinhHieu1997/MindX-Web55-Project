import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import TextField from '@mui/material/TextField';

const TimeTable = () => {
    return <div className="position-fixed start-0 top-0 bottom-0 end-0  z-index-3" style={{backgroundColor:"rgba(0,0,0,.4)"}}>
        <div className="h-100 w-100 position-relative">
            <div className="col-12 col-sm-8 col-md-10 mx-auto bg-light p-3 mt-5 border rounded">
                <div className="d-flex align-items-center">
                    <ContentPasteSearchIcon/>
                    <h5 className="mb-0 ms-2">Thời khóa biểu món ăn</h5>
                </div>
                <div className="mt-4">
                    
                </div>
            </div>
        </div>
    </div>
}

export default TimeTable;