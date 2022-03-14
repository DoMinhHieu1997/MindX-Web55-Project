import LoupeIcon from '@mui/icons-material/Loupe';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoardOutlined';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { Tooltip } from '@mui/material';

const FloatingAction = () => {
    return <div className="position-fixed end-0 top-50 translate-middle-y me-3">
        <div>
            <Tooltip title="Thêm bài viết / công thức">
                <LoupeIcon fontSize="large" style={{color:"#6c757d"}}/> 
            </Tooltip>
        </div>
        <div className='mt-3'>
            <Tooltip title="Thời khóa biểu">
                <DeveloperBoardIcon fontSize="large" style={{color:"#6c757d"}}/>
            </Tooltip>
        </div>
        <div className='mt-3'>
            <Tooltip title="Gợi ý món ăn">
                <ContentPasteSearchIcon fontSize="large" style={{color:"#6c757d"}}/>
            </Tooltip>
        </div>
    </div>
}

export default FloatingAction;