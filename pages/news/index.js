// our-domain.com/news

import Link from "next/link";
import { Fragment } from "react/cjs/react.production.min";

function NewsPage() {
    return (
        <Fragment>
            <h1>The News Page</h1>
            <ul>
                <li>
                    <Link href="/news/nextjs-is-better-than-react">
                        Next JS is better than React
                    </Link>
                </li>

                <li>Something Else</li>
            </ul>
        </Fragment>
    )
}

export default NewsPage;

