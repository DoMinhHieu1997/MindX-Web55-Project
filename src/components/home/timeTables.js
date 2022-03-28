import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  Chip,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  CardMedia,
  Box,
  TextField
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { http } from "../profile/config";
import moment from "moment";
import "./timeTables.css";

const TimeTables = () => {
  const [itemTimeTables, setItemTimeTables] = useState([]);
  const [openCreateTimeTables, setOpenCreateTimeTables] = useState(false);
  const [sessionEat, setSessionEat] = useState('breakfast');
  const [txtSearchDish, setTxtSearchDish] = useState('');
  const [reloadTimeTable, setReloadTimeTable] = useState(false);
  const [dataSearchDish, setDataSearchDish] = useState();
  const [dataTimetable, setDataTimetable] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    totalCalories: 0,
    dateEat: moment().format("YYYY-MM-DD")
  })

  const handleChangeSessionEat = (event) => {
    setSessionEat(event.target.value);
  };
  const handleOpenCreateTimeTables = () => {
    setOpenCreateTimeTables(true);
  };

  const handleCloseCreateTimeTables = () => {
    setOpenCreateTimeTables(false);
  };
  
  const handelChangeTxtSearchDish = async (event) => {
    setTxtSearchDish(event.target.value);
    if (event.key === 'Enter') {
      handelSearchDish();
    }
  }
  const handelSearchDish = async () => {
    try {
      const response = await http.get("posts/searchtype2?k="+ txtSearchDish);
      setDataSearchDish(response.data.data);
    } catch (err) {
        //show err
    }
  }
  const handelClickAddDish = (dataPosts) => {
    switch (sessionEat) {
      case 'breakfast':
        setDataTimetable((prev) => {
          if(prev.breakfast.findIndex(el => el.postId === dataPosts.postId) >=0) {
            return {...prev}
          }
          return {
            ...prev,
            breakfast: [...prev.breakfast, dataPosts],
            totalCalories: prev.totalCalories + dataPosts.totalCalories
          }
        })
      break;
      case 'lunch':
        setDataTimetable((prev) => {
          if(prev.lunch.findIndex(el => el.postId === dataPosts.postId) >=0) {
            return {...prev}
          }
          return {
            ...prev,
            lunch: [...prev.lunch, dataPosts],
            totalCalories: prev.totalCalories + dataPosts.totalCalories
          }
        })
      break;
      case 'dinner':
        setDataTimetable((prev) => {
          if(prev.dinner.findIndex(el => el.postId === dataPosts.postId) >=0) {
            return {...prev}
          }
          return {
            ...prev,
            dinner: [...prev.dinner, dataPosts],
            totalCalories: prev.totalCalories + dataPosts.totalCalories
          }
        })
      break;
      default:
        break;
    }
  }
  const handleDeleteDish = (postId, dish) => {
    setDataTimetable((prev) => {
      const itemRemove = prev[dish].filter(item => item.postId === postId);
      const filteredItems = prev[dish].filter(item => item.postId !== postId)
      return {
        ...prev,
        [dish]: filteredItems,
        totalCalories: prev.totalCalories - itemRemove[0].totalCalories
      }
    })
  };

  const handelChangeDateEat = (event) => {
    setDataTimetable((prev) => {
      return {
        ...prev,
        dateEat: event.target.value
      }
    })
  }

  const handelSaveTimeTables = async () => {
    try {
      const response = await http.post("timetables/create", dataTimetable);
      if(response.data.messageCode === 0) {
        setReloadTimeTable(true)
        setDataTimetable({
          breakfast: [],
          lunch: [],
          dinner: [],
          totalCalories: 0,
          dateEat: moment().format("YYYY-MM-DD")
        })
      }
    } catch (err) {
        //show err
    }
  }
  useEffect(() => {
    http.get("timetables").then((res) => {
      setReloadTimeTable(false)
      setItemTimeTables(res.data.data);
    });
  }, [reloadTimeTable]);
  return (
    <div className="timeTable mt-4">
      <Grid container alignItems="stretch" spacing={2}>
        {itemTimeTables.map((el) => {
          return (
            <Grid key={el._id} item xs={6} md={2}>
              <Card className={el.today}>
                <CardContent>
                  <Typography
                    component="div"
                    color="text.secondary"
                    textAlign="center"
                    sx={{ fontSize: 14 }}
                  >
                    {moment(el.dateEat).format('DD/MM/YYYY')}
                  </Typography>
                  <Typography variant="button" component="div">
                    Bữa sáng
                  </Typography>
                  <div>
                    {el.breakfast ? el.breakfast.map((bf) => {
                      return (
                        <Chip label={bf.title} key={bf.postId} sx={{ mx: 0.5 }} size="small" color="primary"/>
                      )
                    }): "" }
                  </div>
                  <Typography variant="button" component="div">
                    Bữa trưa
                  </Typography>
                  <div>
                  {el.lunch ? el.lunch.map((bf) => {
                      return (
                        <Chip label={bf.title} key={bf.postId} sx={{ mx: 0.5 }} size="small" color="success"/>
                      )
                    }): "" }
                    </div>
                  <Typography variant="button" component="div">
                    Bữa tối
                  </Typography>
                  <div>
                  {el.dinner ? el.dinner.map((bf) => {
                      return (
                        <Chip label={bf.title} key={bf.postId} sx={{ mx: 0.5 }} size="small" color="warning"/>
                      )
                    }): "" }
                    </div>
                    <Typography variant="button" component="div">
                    Tổng calo: {el.totalCalories}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
        <Grid item xs={6} md={2}>
          <Card sx={{ display: 'flex', height: '100%'}}>
            <CardContent sx={{ display: 'flex',  alignItems: 'center', justifyContent: 'center'}}>
              <Button
                variant="contained"
                onClick={handleOpenCreateTimeTables}
                size="small"
              >
                Tạo thời khóa biểu
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog
        open={openCreateTimeTables}
        onClose={handleCloseCreateTimeTables}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Tạo thời khóa biểu
        </DialogTitle>
        <DialogContent>
          <Grid container sx={{my: 2}}>
            <Grid item xs={12} md={4} sx={{ display:"flex", alignItems: "center", justifyContent: "center"}}>
              <TextField
                id="date"
                label="Chọn ngày"
                type="date"
                defaultValue={dataTimetable.dateEat}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handelChangeDateEat}
              />
            </Grid>
            <Grid item xs={12} md={4} sx={{ display:"flex", alignItems: "center", justifyContent: "center"}}>
              <TextField
                select
                label="Chọn bữa"
                value={sessionEat}
                onChange={handleChangeSessionEat}
              >
                <MenuItem value="breakfast">
                  Bữa sáng
                </MenuItem>
                <MenuItem value="lunch">
                  Bữa trưa
                </MenuItem>
                <MenuItem value="dinner">
                  Bữa tối
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display:"flex", alignItems: "center", justifyContent: "center"}}>
              <TextField label="Tìm kiếm món ăn" name="txtSearchDish" variant="outlined" value={txtSearchDish} onKeyPress={handelChangeTxtSearchDish} onChange={handelChangeTxtSearchDish}/>
              <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={handelSearchDish}>
                <SearchIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container alignItems="stretch" sx={{ my: 2 }} spacing={2}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div" align="center">THỰC ĐƠN</Typography>
                  <Typography variant="button" component="div">Bữa sáng:</Typography>
                  <div>
                    {dataTimetable.breakfast ? dataTimetable.breakfast.map((bf) => {
                      return (
                        <Chip onDelete={() => {handleDeleteDish(bf.postId, 'breakfast')}} label={bf.title} key={bf.postId} sx={{ mx: 0.5 }} size="small" color="primary"/>
                      )
                    }): "" }
                  </div>
                  <Typography variant="button" component="div">Bữa trưa:</Typography>
                  <div>
                    {dataTimetable.lunch ? dataTimetable.lunch.map((bf) => {
                      return (
                        <Chip onDelete={() => {handleDeleteDish(bf.postId, 'lunch')}} label={bf.title} key={bf.postId} sx={{ mx: 0.5 }} size="small" color="success"/>
                      )
                    }): "" }
                  </div>
                  <Typography variant="button" component="div">Bữa tối:</Typography>
                  <div>
                    {dataTimetable.dinner ? dataTimetable.dinner.map((bf) => {
                      return (
                        <Chip onDelete={() => {handleDeleteDish(bf.postId, 'dinner')}} label={bf.title} key={bf.postId} sx={{ mx: 0.5 }} size="small" color="warning"/>
                      )
                    }): "" }
                  </div>
                  <Typography variant="button" component="div">Tổng calo: {dataTimetable.totalCalories}</Typography>
                  <div style={{ textAlign: 'center', marginTop: "1rem"}}><Button onClick={handelSaveTimeTables} variant="contained" size="small">Lưu</Button></div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2} alignItems="stretch"> 
                {dataSearchDish ? dataSearchDish.map((el)=> {
                  return (
                    <Grid item xs={12} md={6} key={el._id} onClick={() => {handelClickAddDish({postId: el._id, title: el.title, totalCalories: el.totalCalories})}}> 
                      <Card sx={{ display: 'flex', height: '100%'}}>
                        <CardMedia
                            component="img"
                            sx={{ width: '35%' }}
                            image= {el.avatar}
                            alt={el.title}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="subtitle2">
                              {el.title}
                            </Typography>
                          </CardContent>
                        </Box>
                      </Card>
                    </Grid>
                  )
                }): "" }
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default TimeTables;
