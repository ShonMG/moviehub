import {Client, Databases, ID, Query} from 'appwrite';


const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;


const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject("69ddf6a4001f73fca00a")

const database = new Databases(client);

export const updateSearchCount = async(searchTerm, movie) => {
    
    // use appwrite SDK to check if a document already exists in db
    //if it does update count
    //if not create document with the search term and set count as 1
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm),
        
        ]);
        if(result.documents.length > 0){
            const doc = result.documents[0];
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
            });

        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,

            });
        }

    } catch (error) {

    }

} 

export const getTrendingMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc("count")])

        return result.documents;
    } catch (error) {
        console.log(error);
    }
}