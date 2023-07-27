import { MAIN_ROUTE, COMMENTS_ROUTE} from "../../utils/constRoutes";
import MainPage from "../../page/MainPage/MainPage";
import CommentsPage from "../../page/CommentsPage/CommentsPage";


export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: COMMENTS_ROUTE + '/:id',
        Component: CommentsPage
    },
]