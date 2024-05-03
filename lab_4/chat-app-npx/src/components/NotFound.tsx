import {Link} from 'react-router-dom';

const NotFound = () => {
    return(
        <div>
            <h1>The Conversation Website</h1>
            <body>Welcome to our vibrant online community! Explore and engage with a diverse array of users and conversations on our platform. 
                From thought-provoking discussions to practical advice, there's something for everyone here. 
                Click below to dive into the enriching world of our community and start sharing your insights, questions, and experiences today!</body>
                <div>
                    <body>      </body>
                    <Link to={"/users"}> View the users </Link>
                    <body>      </body>
                    <Link to={"/conversations"}> View the conversations </Link>
                </div>
        </div>
    )
}

export default NotFound;