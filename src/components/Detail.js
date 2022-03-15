import MostFavorite from "./shared/MostFavorite";
import AccessAlarmsOutlinedIcon from '@mui/icons-material/AccessAlarmsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';


const Detail = () => {
    return <div className="container py-5">
        <div className="row">
            <div className="col-md-9">
                <div>
                    <h1>Lorem Ipsum is simply dummy text of the printing and typesetting industry</h1>
                    <div className="d-flex align-items-center flex-start mt-3">
                        <AccessAlarmsOutlinedIcon style={{color:"#6c757d"}} fontSize="sm"/>
                        <div className="ms-2 text-secondary fs-6">10:35 15/03/2022</div>
                    </div>
                    <div className="mt-4 fs-4">
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                    
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.

                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                    
                        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                    </div>
                    <div className="fs-5 mt-3 fw-bold">Minh Hiếu</div>
                </div>
                <div className="mt-4">
                    <div className="mb-3">
                        <FavoriteBorderOutlinedIcon className="d-inline-block"/>
                        <div className="ms-2 d-inline-block h6 mb-0">10 Lượt thích</div>
                    </div>
                    <div className="d-flex align-items-top">
                        <TextareaAutosize aria-label="minimum height" minRows={3} placeholder="Ý kiến của bạn..." className="w-75"/>
                        <div className="ms-3">
                            <Button variant="contained" endIcon={<SendIcon />}>
                                Send
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <MostFavorite />
            </div>
        </div>
    </div>
}

export default Detail;