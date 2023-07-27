import { useLocation, useNavigate } from 'react-router-dom'
import styles from './header.module.css'
import { COMMENTS_ROUTE } from '../../utils/constRoutes'
import { useEffect, useState } from 'react'


const Header: React.FC = () => {

    const location = useLocation()
    const [postID, setPostID] = useState<number>()

    const comments: boolean = location.pathname === COMMENTS_ROUTE + `/${postID}`

    const navigate = useNavigate()


    useEffect(() => {
        if(location.state !== null){
            setPostID(location.state.post.id)
        }
        
    }, [location.state])
    
    if(comments){
        return (
            <div className={styles.header}>
                <button className={styles.button} onClick={() => navigate(-1)}>Back</button>
                Comments for post #{postID}
            </div>
        )
    }

    return (
      <div className={styles.header}>
          This is Software
      </div>
    )
}
  
export default Header