import { useContext } from "react"
import BookCart from "../../compoent/bookdisplay/bookCart" 
import './home.css'
import { StoreContext } from "../../context/storecontextfile"
import { MutatingDots } from 'react-loader-spinner'
import { Helmet } from "react-helmet"
import HomeInfo from "../../compoent/homeInfo/homeInfo"
import MainHeader from "../../compoent/mainHeader/mainHeader"

const Home = () => {

    const { searchResult, bookList } = useContext(StoreContext)

    return (
        !(bookList.length === 0) ?
            <div className="home">
                <Helmet>
                    <title>E-Athenaeum</title>
                </Helmet>
                {searchResult ?
                    <>
                        <div className='home-books'>
                            <h1>Search Result</h1>
                            <div className='home-books-box'>
                                {bookList.map((item, index) => {
                                    if (item.title.toLowerCase().includes(searchResult.toLowerCase())) {
                                        return <BookCart key={index} item={item} />
                                    }
                                })}
                            </div>
                        </div>
                    </> :
                    <>
                        <MainHeader />
                        <div className='home-books'>
                            <h1>Latest Books</h1>
                            <div className='home-books-box'>
                                {bookList.map((item, index) => {
                                    return <BookCart key={index} item={item} />
                                })}
                            </div>
                        </div>
                        <HomeInfo />
                    </>
                }
            </div>
            : <div className='fe-loading'>
                <MutatingDots
                    visible={true}
                    height="100"
                    width="100"
                    color="#e0341d"
                    secondaryColor="#333"
                    radius="15"
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>

    )
}

export default Home
