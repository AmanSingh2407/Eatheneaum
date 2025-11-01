import { useContext } from 'react'
import './userList.css'
import { StoreContexts } from '../../context/contextFile'
import { MutatingDots } from 'react-loader-spinner'


const FileList = () => {

    const { listUser, homeRerender, adminUser } = useContext(StoreContexts) 

    return ( 
        listUser ?
            (adminUser.role === import.meta.env.VITE_APP_SECRET_ID) ?
                <div className='file-list'>
                    <div className='file-list-box' >
                        <h2>Frontend User List</h2>
                    </div>
                    <div className="file-list-table">
                        <div className='file-list-table-head  table-user-size'>
                            <p>S.No</p>
                            <p>Name</p>
                            <p>Email</p>
                            <p>Phone No</p>
                            <p>Address</p>
                        </div>
                        {
                            listUser.map((item, index) => {
                                return (
                                    <div key={index} className='file-list-table-body table-user-size'>
                                        <p>{index + 1}</p>
                                        <p>{item.name}</p>
                                        <p>{item.email}</p>
                                        <p>{item.phone}</p>
                                        <p>Gorakhapur</p>
                                    </div>
                                )
                            })

                        }
                    </div>
                </div>
                : homeRerender()
            :
            <div className='ad-Loading'>
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

export default FileList;
