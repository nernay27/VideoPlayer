import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ReactPlayer from 'react-player';
import Button from 'react-bootstrap/Button';
import CardModal from './components/Modal';
import movieUsersData from './components/database';
import Discription from './components/discription';
import { useEffect, useState, useRef, useCallback } from 'react';
import copy from 'copy-to-clipboard';
import { useSelector, useDispatch } from "react-redux";
import { actions } from './store';
import Table from "react-bootstrap/Table";
import { Container } from '@mui/system';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';
import CommentsSec from './components/CommentsSec';
function App() {
  const playerRef = useRef();
  const { loginWithPopup, logout } = useAuth0();
  const { user } = useAuth0();
  const { isAuthenticated } = useAuth0();
  const data = useSelector((state) => state.MovieData)
  const title = useSelector((state) => state.title)
  const Uploadurl = useSelector((state) => state.uploadUrl)
  const userDataComment = useSelector((state) => state.userComment)
  const uploadThumbnail = useSelector((state) => state.uploadThumbnail)
  const uploadTitle = useSelector((state) => state.uploadtitle)
  const uploadDescription = useSelector((state) => state.uploaddescription)
  const description = useSelector((state) => state.descriptions)
  const searchResult = useSelector((state) => state.search)
  const url = useSelector((state) => state.url)
  const dispatch = useDispatch()
  const poster = useSelector((state) => state.poster)
  const userComment = useSelector((state) => state.userComment)
  const userComments = useSelector((state) => state.comment)
  const [presentUrl, setUrl] = useState()
  const [progressData, setProgressData] = useState()
  const [show1, setShow1] = useState(false)
  const [show, setShow] = useState(false);
  const [ReloadingUrl, setReloadingUrl] = useState()
  const [isReady, setIsReady] = useState(false);
  const [Ended, setEnded] = useState()
  const [sharedUrl, setSharedUrl] = useState("https://www.dailymotion.com/video/x8eodba");
  const [id, setids] = useState(1);
  const handleClose1 = () => setShow1(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true)
  const handleUpload1 = () => {
    handleShow1()

  }
  const hanndleUpload = () => {
    console.log("")
    handleShow()
  }
  const getDataFunction = async () => {
    await axios.get('http://localhost:5000/api/ReactPlayerUserData')
      .then((data) => dispatch(actions.setData(data)));
  }
  useEffect(() => {
    getDataFunction()
    console.log("title is", title)
    console.log("title", title)
    console.log("description is ", description)
  }, [])
  const handleUpload = async () => {
    const data = {

      "ItemTitle": uploadTitle,
      "ItemImagee": uploadThumbnail,
      "ItemUrl": Uploadurl,
      "ItemDescriptions": uploadDescription,
      "Likes": 0,
      "DisLikes": 0,
      "Email": user?.email
    }
    await axios.post('http://localhost:5000/api/ReactPlayerUserData', data)
      .then(() => console.log("data sent successfully"))
    axios.get('http://localhost:5000/api/ReactPlayerUserData')
      .then((data) => dispatch(actions.setData(data)))
    handleClose()

  }
  const onReady = useCallback(async () => {
    console.log("On Ready function is called")
    const duration = await axios.get(`http://localhost:5000/api/ReactPlayerUserData/duration/row/${id}`)
    console.log("the duration we get from the video", duration.data[0].Duration)

    const DurationData = duration.data[0].Duration
    if (!isReady) {
      console.log("Seek to", duration.data[0].Duration)
      const timeToStart = DurationData;
      playerRef.current.seekTo(timeToStart, "seconds")
      console.log(timeToStart)
    }

  }, [isReady])

  const handleShare = () => {
    copy(sharedUrl)
    alert(`You have copied`, sharedUrl)
    console.log("Shared url we have", sharedUrl)
  }
  const handleProgress = async (state) => {
    console.log('onProgress', state)
    console.log('played seconds', state.playedSeconds)
    await axios.put(`http://localhost:5000/api/ReactPlayerUserData/duration/${state.playedSeconds}/${id}`)
      .then(() => console.log("Data updated successfully"))
  }
  const handleEnded = state => {
    console.log("OnEnded")
    setEnded(state.loop)

  }

  const getCurrentTime = (duration) => {
    console.log("the duration of the video", duration)

  }
  const handleLogin = () => {
    loginWithPopup()
    console.log("user is logged In", user)


  }
  const handleLogout = () => {
    logout()
  }

  const handleComment = () => {
    handleUpload1()
  }
  const handleUploadComments = async () => {
    const dataComment = {
      "Id": id,
      "Email": user?.email,
      "comments": userComments
    }
    await axios.post("http://localhost:5000/api/ReactPlayerUserDataComments", dataComment).then(() => {
      console.log("Data sent successfully")
    }).catch((err) => {
      console.log(err)

    })
    await axios.get('http://localhost:5000/api/ReactPlayerUserDataComments').then((data) => {
      dispatch(actions.setUserComment(data))
    })

    handleClose1()

  }

  const handleUploadComment1 = (e) => {
    console.log("the value we have", e.target.value)
    dispatch(actions.setComment(e.target.value))
    console.log("usercomment", userComments)
  }

  const handleGetUploadData = async () => {
    await axios.get('http://localhost:5000/api/ReactPlayerUserDataComments').then((data) => {
      dispatch(actions.setUserComment(data))
    })

  }
  useEffect(() => {
    handleGetUploadData()
    console.log("user comasdments", userDataComment.data)

  }, [])

  const handleSearch = (e) => {
    dispatch(actions.setSearch(e.target.value))
    console.log("search resutl is", searchResult)
  }

  useEffect(() => {
    console.log("Search result", searchResult)

  }, [])

  return (
    <>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6'>React video player</Typography>
          <Container className="w-75 p-3">
            <div className='justify-content-center'>
              <input placeholder='Search here' onChange={handleSearch}></input>
            </div>

          </Container>

          {isAuthenticated ? (
            <>
              {user?.email}
              <Button variant="success" style={{ color: "White" }} onClick={hanndleUpload}>Upload</Button>
              <Button variant="success" onClick={handleLogout}>LogOut</Button>

            </>
          ) : (<Button variant="success" onClick={handleLogin}>Login</Button>)}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <main className='container'>
        <div className="d-flex direction-row">
          <div className='col-sm-8 postion-sticky'>
            <ReactPlayer
              ref={playerRef}
              url={Uploadurl}
              width="100%"
              height="500px"
              controls={true}
              light={poster}
              playing
              onReady={onReady}
              onProgress={handleProgress}
              getCurrentTime={getCurrentTime}
              onEnded={handleEnded}
            />
            <div>
              <h1>{title}</h1>
            </div>
            <div>
              {description}
            </div>
            <Button onClick={handleShare}>Share</Button>
            {isAuthenticated ? (<Button varient="btn btn-danger" onClick={handleComment}>Comment</Button>) : (
              ""
            )}
            <br />

            <br />
            <h3>Comments</h3>
            {(userComment.data && userComment.data.filter(function (filerData) {
              return filerData.UserId === id
            }).map(function (filerData) {
              return (
                <CommentsSec Email={filerData.UserEmail} comment={filerData.Comments} />
              )
            }))}

          </div>
          <div className='col-sm-4 pr-5' style={{ padding: '5px' }}>
            {/* {isAuthenticated ? (data && data.data.filter(function (filerData) {
              return filerData.Email === user?.email
            }).map(function (filerData) {
              return (
                <CardModal email={filerData.Email} setSharedUrl={setSharedUrl} setids={setids} description={filerData.ItemDescriptions} likes={filerData.Likes} dislikes={filerData.DisLikes} id={filerData.Id} title={filerData.ItemTitle} ItemImagee={filerData.ItemImagee} url={filerData.ItemUrl} setUrl={setUrl} />
              )
            })) : (data && data.data.map((item, index) => {
              console.log("disliked", item.DisLikes)
              return (
                <CardModal email={item.Email} setSharedUrl={setSharedUrl} setids={setids} description={item.ItemDescriptions} likes={item.Likes} dislikes={item.DisLikes} id={item.Id} title={item.ItemTitle} ItemImagee={item.ItemImagee} url={item.ItemUrl} setUrl={setUrl} />

              )
            }))} */}
            {data && data.data.filter(function (filterData) {
              //  some how get it filterout
                return filterData.ItemTitle === searchResult
            }).map(function (filerData) {
              return (
                <CardModal
                  email={filerData.Email}
                  setSharedUrl={setSharedUrl}
                  setids={setids}
                  description={filerData.ItemDescriptions}
                  likes={filerData.Likes}
                  dislikes={filerData.DisLikes}
                  id={filerData.Id}
                  title={filerData.ItemTitle}
                  ItemImagee={filerData.ItemImagee}
                  url={filerData.ItemUrl}
                  setUrl={setUrl} />
              )
            })}
            {data && data.data.map((item, index) => {
              console.log("disliked", item.DisLikes)
              return (
                <CardModal email={item.Email} setSharedUrl={setSharedUrl} setids={setids} description={item.ItemDescriptions} likes={item.Likes} dislikes={item.DisLikes} id={item.Id} title={item.ItemTitle} ItemImagee={item.ItemImagee} url={item.ItemUrl} setUrl={setUrl} />

              )

            })}
          </div>
        </div>
      </main>
      <div className="margin-top: px">
        <Modal
          className='mt-5'
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <h3>Enter the Url and thumbnail for the video</h3>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter Title</Form.Label>
                <Form.Control onChange={(e) => dispatch(actions.setUploadTitle(e.target.value))} type="text" placeholder="Enter Title" />
                <Form.Label>Enter Description</Form.Label>
                <Form.Control onChange={(e) => dispatch(actions.setUploadDesc(e.target.value))} type="text" placeholder="Enter Description" />
                <Form.Label >Enter url</Form.Label>
                <Form.Control onChange={(e) => dispatch(actions.setUrl(e.target.value))} type="text" placeholder="Enter Url" />
                <Form.Label>Enter Thumbnail Link</Form.Label>
                <Form.Control onChange={(e) => dispatch(actions.setThumbnail(e.target.value))} type="text" placeholder="Enter Thumbnail Link" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className='justify-content-center'>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpload}>Upload</Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="margin-top: px">
        <Modal
          className='mt-5'
          show={show1}
          onHide={handleClose1}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <h3>Enter the comment</h3>
          </Modal.Header>
          <Modal.Body>
            <input type="text" onChange={handleUploadComment1} placeholder="Enter text here we have"></input>
          </Modal.Body>
          <Modal.Footer className='justify-content-center'>
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUploadComments}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      </div>

    </>
  );
}

export default App;
