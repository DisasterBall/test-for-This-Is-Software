import axios from "axios"
import { useEffect, useState } from "react"
import { Audio } from 'react-loader-spinner'
import styles from '../MainPage/mainPage.module.css'
import style from './commentsPage.module.css'
import { useLocation } from "react-router-dom"

interface ICommentsData {
  postID: number,
  id: number,
  name: string,
  email: string,
  body: string
}

const CommentsPage: React.FC = () => {

  const location = useLocation()
  const postID = location.state.post.id

  const [comments, setComments] = useState<ICommentsData[]>([])

  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(true)

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postID}`)
      .then((response) => {
        setComments(response.data)
        setIsLoadingComments(false)
      })
  },[])

  if (isLoadingComments) {
    return (
      <div className={styles.loader}>
        <Audio
          height="200"
          width="200"
          color="green"
          ariaLabel="loading"
          wrapperStyle={undefined}
          wrapperClass={undefined}
        />
      </div>
    )
  }

  return (
    <div className={style.container}>
      {comments.map((comment) => (
        <div key={comment.id} className={style.comments}>
          <h3>{comment.name}</h3>
          <span><strong>{comment.email}</strong></span>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  )
}
  
export default CommentsPage