// our-domain.com/news/something-important

import { useRouter } from 'next/router';

function DetailPage() {
    const router = useRouter();

    const newsId =  router.query.newsId;

    // send a request to the backend API
    // to fetch the news item with newsId
    return (
        <h1>
            DetailPage
        </h1>
    )
}

export default DetailPage;