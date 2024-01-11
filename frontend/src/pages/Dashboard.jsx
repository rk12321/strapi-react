import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { CSVLink } from 'react-csv';
import Card from "../components/Card"
import List from "../components/List"
import { Link } from 'react-router-dom'

function Dashboard() {

    const [personsData, setPersonsData] = useState([]);
    const [socialFilter, setSocialFilter] = useState('none');
    const [genreFilter, setGenreFilter] = useState('none');
    const [searchFilter, setSearchFilter] = useState('');
    const [uniqueGenres, setUniqueGenres] = useState([]);
    const [activeTab, setActiveTab] = useState('cards');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        axios.get('http://localhost:1337/api/datas')
            .then(response => {
                setPersonsData(response.data.data);
                const genres = response.data.data.map(person => person.attributes.Genre);
                const uniqueGenres = [...new Set(genres)];
                setUniqueGenres(uniqueGenres);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleSocialChange = (e) => {
        setSocialFilter(e.target.value);
    };

    const handleGenreChange = (e) => {
        setGenreFilter(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchFilter(e.target.value);
    };

    const applyFilters = () => {
        return personsData.filter(person => {
            const isSocialMatch = socialFilter === 'none' || person.attributes.instagram === socialFilter || person.attributes.facebook === socialFilter || person.attributes.twitter === socialFilter || person.attributes.youtube === socialFilter;
            const isGenreMatch = genreFilter === 'none' || person.attributes.Genre === genreFilter;
            const isSearchMatch = person.attributes.Name.toLowerCase().includes(searchFilter.toLowerCase());
            return isSocialMatch && isGenreMatch && isSearchMatch;
        });
    };

    const filteredData = applyFilters();

    const handleDownload = () => {
        const dataToDownload = applyFilters();

        const csvData = [
            ['Name', 'Contact', 'Genre'],
            ...dataToDownload.map((person) => [
                person.attributes.Name,
                `"${person.attributes.Contact.replace(/\n/g, ' ')}"`,
                person.attributes.Genre,
            ]),
        ];

        const csvContent = csvData.map((row) => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'data.csv');
    };

    return (
        <div className='container mt-5'>
            <div>
                MSLs
            </div>

            <div className='py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <select disabled onChange={handleSocialChange} name="social" id="social" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option value="none">Social Media</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter</option>
                    <option value="Youtube">Youtube</option>
                </select>

                <select onChange={handleGenreChange} name="genre" id="genre" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option value="none">Genre</option>
                    {uniqueGenres.map((genre, index) => (
                        <option key={index} value={genre}>{genre}</option>
                    ))}
                </select>

                <input onChange={handleSearchChange} type="text" placeholder='Search..' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />

                <div className="flex justify-center space-x-4">
                    <button
                        className={`px-4 py-2 rounded focus:outline-none ${activeTab === 'cards' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                        onClick={() => handleTabClick('cards')}
                    >

                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z" />
                        </svg>

                    </button>
                    <button
                        className={`px-4 py-2 rounded focus:outline-none ${activeTab === 'lists' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                        onClick={() => handleTabClick('lists')}
                    >

                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 17 14">
                            <path d="M16 2H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 0 1 0 2Z" />
                        </svg>
                    </button>
                    <Link to="/upload" className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <svg
                            style={{ rotate: '180deg' }}
                            className="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 18"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                            />
                        </svg>
                    </Link>

                    <button onClick={handleDownload} className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">

                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="dashboard mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                {activeTab === 'cards' && (
                    <>
                        {filteredData.map((person) => (
                            <Card key={person.attributes.Name} {...person.attributes} />
                        ))}
                    </>
                )}

            </div>

            <div className="mt-6 flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                            {activeTab === 'lists' && (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr className="divide-x divide-gray-200">
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                <span>Name</span>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                Contact
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                Status
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                Genre
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">

                                        {filteredData.map((person) => (
                                            <List key={person.attributes.Name} {...person.attributes} />
                                        ))}

                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
