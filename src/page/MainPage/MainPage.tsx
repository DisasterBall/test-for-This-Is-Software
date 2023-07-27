import { useEffect, useState } from "react"
import { Audio } from 'react-loader-spinner'
import styles from './mainPage.module.css'
import axios from "axios"
import MySelect from "../../components/MySelect/MySelect"
import { useNavigate } from "react-router-dom"
import { COMMENTS_ROUTE } from "../../utils/constRoutes"

export interface IUserData {
  id: string,
  username: string,
}

interface IPostData {
  id: number,
  title: string,
  body: string,
  userId: number
}


const MainPage: React.FC = () => {

  const navigate = useNavigate()

  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(true)
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(true)

  const [currentUsername, setCurrentUsername] = useState<string>('')
  const [arrayUsernames, setArrayUsernames] = useState<IUserData[]>([])

  const [arrayPosts, setArrayPosts] = useState<IPostData[]>([])
  const [arrayPostsUser, setArrayPostsUser] = useState<IPostData[]>([])

  const [randomNumbers, setRandomNumbers] = useState<number[]>([])

  const findIdByUsername = (usernameToFind: string): number | null => {
    const user = arrayUsernames.find((item) => item.username === usernameToFind);
    return user ? parseInt(user.id, 10) : null;
  }

  const generateRandomNumbers = () => {
    const numbersSet = new Set<number>()
    while (numbersSet.size < 10) {
      const randomNumber = Math.floor(Math.random() * 100)
      numbersSet.add(randomNumber)
    }
    const numbersArray = Array.from(numbersSet)
    setRandomNumbers(numbersArray)
  }

  useEffect(() => {
    generateRandomNumbers()
  }, [])

  useEffect(() => {
    if(randomNumbers.length > 0){
      axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        const posts: IPostData[] = response.data.filter((item: IPostData) => { 
          return randomNumbers.includes(item.id)
        })
        setArrayPosts(posts)
        setIsLoadingPosts(false)
      })
    }

  }, [randomNumbers])

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      const usernames: IUserData[] = response.data.map((item: IUserData) => { 
        return { id: item.id, username: item.username }
      })
      setArrayUsernames(usernames)
      setIsLoadingUsers(false)
    })
  },[])

  useEffect(() => {
    if(currentUsername){
      setIsLoadingPosts(true)
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${findIdByUsername(currentUsername)}`)
      .then((response) => {
        const posts: IPostData[] = response.data.map((item: IPostData) => { 
          return item
        })
        console.log(posts)
        setArrayPostsUser(posts)
        setIsLoadingPosts(false)
      })
    }
  },[currentUsername])

  if (isLoadingUsers && isLoadingPosts) {
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
    <div className={styles.mainPage}>
      <div className={styles.control}>
        <MySelect currentUsername={currentUsername} setCurrentUsername={setCurrentUsername} arrayUsernames={arrayUsernames}/>
      </div>
      <div className={styles.content}>
        <div>
          <h1>Posts</h1>
        </div>
        <div>
          { isLoadingPosts ? <Audio
                                height="200"
                                width="200"
                                color="green"
                                ariaLabel="loading"
                                wrapperStyle={undefined}
                                wrapperClass={undefined}
                              />
              : !currentUsername ? arrayPosts.map((post) => (
                    <div className={styles.post} key={post.id} onClick={() => navigate(
                      COMMENTS_ROUTE+`/${post.id}`,
                      {state: {post}}
                    )}>
                      <h3>{post.title}</h3>
                      <p>{post.body}</p>
                    </div>
                  ))
                :
                arrayPostsUser.map((post) => (
                  <div className={styles.post} key={post.id} onClick={() => navigate(
                    COMMENTS_ROUTE+`/${post.id}`,
                    {state: {post}}
                  )}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                  </div>
          ))}
        </div>
      </div>
    </div>
  )
}
  
export default MainPage