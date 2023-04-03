import React, {useEffect ,useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

import { UserContext } from './UserContext';

import { BsHddNetworkFill } from 'react-icons/bs'
import { RiWhatsappFill } from 'react-icons/ri'
import { MdEmail, MdLocationPin } from 'react-icons/md'

function Home (){

    const user = useContext(UserContext)

    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('')
    const [professionals, setProfessionals] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("Health")
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() =>{

        if(user.user) {
            fetch(`https://kazi-skill-set-server.herokuapp.com/professionals?category=${selectedCategory}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                }
            })
            .then((response) => response.json())
            .then((data) => {
                //const randomProfessionals = data.sort(() => Math.random() - 0.5).slice(0, 12);
                setProfessionals(data);
            })
        } else {
            // navigate("/login")
        }
    },[selectedCategory, user])

    const handleSubmit = (e) => {
            e.preventDefault();
            if (searchTerm.length > 0) {
        // handle search of professionals
                let url = 'https://kazi-skill-set-server.herokuapp.com/search';
                let searchKey = searchTerm
                url += `?q=${searchKey}`;
                fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                    setSearchResults(data);
                    setProfessionals(data);
                });
            }
             else {
                alert('Input something to search');
            }
    };


    return(
        <>
            <div className="w-3/4 mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className=" my-5 mx-auto flex p-2 shadow rounded-md bg-white shadow-black">
                        <input value={searchTerm} onChange={(e)=> {
                            setSearchTerm(e.target.value.split('').map((ch, i) => i===0 ? ch.toUpperCase(): ch).join(""));
                        }} className='flex-grow outline-none p-2' type="text" placeholder="Search here..." />
                        <button className="button bg-blue-400 px-4 py-2 rounded-md">Search</button>
                    </div>
                </form>
            </div>

            <div className=" bg-blue-800 flex flex-wrap p-3 justify-center gap-3">
                    <div className="text-white">
                        <div className="text-white font-bold hover:bg-black hover:rounded-md px-2 py-2 cursor-pointer active" onClick={() => setSelectedCategory("Education")}>Education</div>
                    </div>
                    <div className="text-white">
                        <div className="text-white font-bold hover:bg-black hover:rounded-md px-2 py-2 cursor-pointer active" onClick={() => setSelectedCategory("Health")}>Health</div>
                    </div>
                    <div className="text-white">
                        <div className="text-white font-bold hover:bg-black hover:rounded-md px-2 py-2 cursor-pointer active"  onClick={() => setSelectedCategory("Building and Construction")}>Building and Construction</div>
                    </div>
                    <div className="text-white">
                        <div className="text-white font-bold hover:bg-black hover:rounded-md px-2 py-2 cursor-pointer active" onClick={() => setSelectedCategory("Software Services")}>Software Services</div>
                    </div>
                    <div className="text-white">
                        <div className="text-white font-bold hover:bg-black hover:rounded-md px-2 py-2 cursor-pointer active" onClick={() => setSelectedCategory("Social Services")}>Social Services</div>
                    </div>
    
            </div>

            {searchResults.length > 0 ? (
                <p className='p-3 '>
                    Search Results for <span className='bg-black text-white font-bold px-3 py-1 rounded-md mx-2'>{searchTerm}</span>: <span className='mx-2 bg-sky-300 font-bold p-2 rounded-md'>{professionals.length}</span>
                </p>
            ) : <p className='px-3 pt-2 font-bold'>No Search results</p>}
            <div className="professionalList grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-3 w-max gap-4 mx-auto">
                { professionals.length < 0 ? <Loading /> : professionals.map((professional) => (
                    <div className='ui card' key={professional.id} onClick={() => {
                        navigate(`/prof/${professional.id}`)
                      }}>
                        <div className="image" >
                            <img alt='professional.firstname' src="https://cdn.pixabay.com/photo/2021/04/21/02/43/plumber-6195292__340.png"/>
                        </div>
                        <div className="content">
                            <div className="header">
                        </div>
                        <div className="meta text-wrap">
                            <div className='text-black flex gap-4 bg-sky-400 items-center py-2 px-3 font-bold shadow' ><BsHddNetworkFill /> {professional.job_title}</div>
                            <div className='prof-details'>
                                <h3>{`${professional.firstname} ${professional.lastname}`}</h3>
                            </div>
                            <p style={{ marginTop: "25px" }}>{professional.description.slice(0,75)}...</p>
                        </div>
                        <div className='flex items-center gap-3 text-sky-500'>
                            <MdEmail />
                            <span>{professional.email}</span>
                        </div>
                        <div className='flex items-center gap-3 text-sky-500'>
                            <RiWhatsappFill />
                            <span>+{professional.phone}</span>
                        </div>
                    </div>
                        <div className="extra content">
                        <div className='flex items-center gap-3 text-sky-500'>
                            <MdLocationPin />
                            <span>+{professional.location}</span>
                        </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home;